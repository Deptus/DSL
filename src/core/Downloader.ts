import * as path from 'path';
import { Worker } from 'worker_threads';
import * as fs from 'fs';
import { ipcMain, app } from 'electron';

async function combineChunks(filepath: string, filename: string, numChunks: number) {
  const outputStream = fs.createWriteStream(path.join(filepath, filename));
  for (let i = 0; i < numChunks; i++) {
    const chunkPath = path.join(app.getPath('temp'), `chunk-${i}.tmp`);
    const inputStream = fs.createReadStream(chunkPath);
    await new Promise((resolve) => {
      inputStream.pipe(outputStream, { end: false });
      inputStream.on('end', resolve);
    });
    fs.unlinkSync(chunkPath);
  }
  outputStream.end();
}

function formatMatch(url: string) {
  for(let i = url.length - 1; i >= 0; i--) {
    if(url[i] == '.')
      return url.substring(i, url.endsWith('/') ? url.length - 1 : url.length)
  }
  return -1
}

async function DownloadFile(url: string, filepath: string, filename: string, concurrently: number) {
    const response = await fetch(url)
    const formatMatched = formatMatch(url)
    const format = formatMatched != -1 ? formatMatched : ""
    filename += format
    const filelength = response.headers.get('Content-Length') ? response.headers.get('Content-Length')! : "1000000000"
    console.log(`File is ${filelength} bytes long`)
    const chunks = parseInt(filelength)
    if(fs.existsSync(path.join(filepath, filename)))
        fs.rmSync(path.join(filepath, filename))
    const workers = []
    if(!response.headers.get('Content-Length'))
      concurrently = 1;
    for(let i = 0; i < concurrently; i++) {
        const start = i * chunks / concurrently
        let end = (i + 1) * chunks / concurrently
        if(i == concurrently - 1)
          end = chunks
        console.log(`Downloading chunk ${i} of ${concurrently}, from ${start} to ${end}`)
        const tempPath = app.getPath('temp')
        const worker = new Worker(`
        const { parentPort, workerData } = require('worker_threads');
        const http = require('http');
        const https = require('https');
        const fs = require('fs');
        const path = require('path');
  
        const { url, start, end, tempPath } = workerData;
        if(url.startsWith('http://'))
          http.get(url, { headers: { Range: \`bytes=\${start}-\${end - 1}\`, "Content-Type": "application/octet-stream" } }, (res) => {
            const stream = fs.createWriteStream(path.join(tempPath, \`chunk-${i}.tmp\`));
            res.pipe(stream);
            res.on('end', () => {
              stream.close();
              parentPort.postMessage(\`Downloaded chunk \${start}-\${end}\`);
            });
          });
        else
          https.get(url, { headers: { Range: \`bytes=\${start}-\${end - 1}\`, "Content-Type": "application/octet-stream" } }, (res) => {
            const stream = fs.createWriteStream(path.join(tempPath, \`chunk-${i}.tmp\`));
            res.pipe(stream);
            res.on('end', () => {
              stream.close();
              parentPort.postMessage(\`Downloaded chunk \${start}-\${end}\`);
            });
          });
      `, { eval: true, workerData: { url, start, end, tempPath } });
        workers.push(worker)
    }

    await Promise.all(workers.map((worker) => new Promise((resolve) => {
      worker.on('message', resolve);
    })));
    await combineChunks(filepath, filename, concurrently);
    console.log('Download complete!');
    return 0;
}
ipcMain.handle('downloadfile', (_event, url: string, filepath: string, filename: string, concurrently: number) => DownloadFile(url, filepath, filename, concurrently))