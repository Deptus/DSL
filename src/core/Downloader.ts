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

export function nameMatch(url: string, match: boolean) {
  let ret = "";
  for(let i = url.length - 1; i >= 0; i--) {
    if(url[i] === '.' && !match)
      return ret = url.substring(i, url.endsWith('/') ? url.length - 1 : url.length)
    if(url[i] === '/' && i !== url.length - 1) 
      return ret = url.substring(i, url.endsWith('/') ? url.length - 1 : url.length)
  }
  return -1;
}

export async function DownloadFile(url: string, filepath: string, concurrency: number, order?: number, format?: string, filename?: string) {
    const response = await fetch(url)
    let nameRequired = !filename
    const nameMatched = nameMatch(url, nameRequired)
    let formatM = nameMatched != -1 ? nameMatched : ""
    if(!nameRequired)
      formatM += filename
    if(format)
      formatM += format
    const filelength = response.headers.get('Content-Length') ? response.headers.get('Content-Length')! : "1000000000"
    console.log(`File is ${filelength} bytes long`)
    const chunks = parseInt(filelength)
    if(fs.existsSync(path.join(filepath, formatM)))
        fs.rmSync(path.join(filepath, formatM))
    const workers = []
    const worker_size = []
    if(!response.headers.get('Content-Length'))
      concurrency = 1;
    let downloaded = 0 
    for(let i = 0; i < concurrency; i++) {
        const start = downloaded
        let end = Math.floor((i + 1) * chunks / concurrency)
        worker_size.push(end - start)
        downloaded = end;
        if(i == concurrency - 1)
          end = chunks
        console.log(`Downloading chunk ${i} of ${concurrency}, from ${start} to ${end}`)
        const tempPath = app.getPath('temp')
        const worker = new Worker(`
        const { parentPort, workerData } = require('worker_threads');
        const http = require('http');
        const https = require('https');
        const fs = require('fs');
        const path = require('path');
        
        const { url, start, end, tempPath } = workerData;
        const order = Number(\`${i}\`)
        if(url.startsWith('http://'))
            http.get(url, { headers: { Range: \`bytes=\${start}-\${end - 1}\`, "Content-Type": "application/octet-stream" } }, (res) => {
                const stream = fs.createWriteStream(path.join(tempPath, \`chunk-${i}.tmp\`));
                res.pipe(stream);
                res.on('end', () => {
                    stream.close();
                    parentPort.postMessage("Finished downloading chunk " + order + " of " + ${concurrency});
                });
            })
        else
            https.get(url, { headers: { Range: \`bytes=\${start}-\${end - 1}\`, "Content-Type": "application/octet-stream" } }, (res) => {
                const stream = fs.createWriteStream(path.join(tempPath, \`chunk-${i}.tmp\`));
                res.pipe(stream);
                res.on('end', () => {
                    stream.close();
                    parentPort.postMessage("Finished downloading chunk " + order + " of " + ${concurrency});
                });
            })
      `, { eval: true, workerData: { url, start, end, tempPath } });
        workers.push(worker)
    }

    await Promise.all(workers.map((worker, index) => new Promise((resolve) => {
      worker.on('message', (value) => { console.log(value); resolve(value) });
    })));
    await combineChunks(filepath, formatM, concurrency);
    console.log('Download complete!');
    return 0;
}

export async function ParallelDownload(urls: string[], filepath: string[], concurrency: number, format?: string[], filename?: string[]) {
  const downloads = urls.map(async (url, index) => new Promise((resolve) => {
    if(filename) {
      if(format)
        DownloadFile(url, filepath[index], concurrency, index, format[index], filename[index]).then(() => resolve(0))
      else
        DownloadFile(url, filepath[index], concurrency, index, "", filename[index]).then(() => resolve(0))
    }
    else {
      if(format)
        DownloadFile(url, filepath[index], concurrency, index, format[index]).then(() => resolve(0))
      else
        DownloadFile(url, filepath[index], concurrency, index, "").then(() => resolve(0))
    }
  }))
  await Promise.all(downloads)
}
