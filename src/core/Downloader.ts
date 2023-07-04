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

export async function DownloadFile(url: string, filepath: string, filename: string, concurrency: number) {
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
        if(url.startsWith('http://'))
          http.get(url, { headers: { Range: \`bytes=\${start}-\${end - 1}\`, "Content-Type": "application/octet-stream" } }, (res) => {
            const stream = fs.createWriteStream(path.join(tempPath, \`chunk-${i}.tmp\`));
            res.pipe(stream);
            res.on('end', () => {
              stream.close();
            });
          });
        else
          https.get(url, { headers: { Range: \`bytes=\${start}-\${end - 1}\`, "Content-Type": "application/octet-stream" } }, (res) => {
            const stream = fs.createWriteStream(path.join(tempPath, \`chunk-${i}.tmp\`));
            res.pipe(stream);
            res.on('end', () => {
              stream.close();
            });
          });
      `, { eval: true, workerData: { url, start, end, tempPath } });
        workers.push(worker)
    }

    await Promise.all(workers.map((worker) => new Promise((resolve) => {
      worker.on('message', (value) => { console.log(value); resolve(value) });
    })));
    await combineChunks(filepath, filename, concurrency);
    console.log('Download complete!');
    return 0;
}

const home = app.getPath('home')
const appData = app.getPath('appData')
const userData = app.getPath('userData')
const temp = app.getPath('temp')
const exe = app.getPath('exe')
const module = app.getPath('module')
const desktop = app.getPath('desktop')
const documents = app.getPath('documents')
const downloads = app.getPath('downloads')
const music = app.getPath('music')
const pictures = app.getPath('pictures')
const videos = app.getPath('videos')
const recent = app.getPath('recent')
const logs = app.getPath('logs')
const crashDumps = app.getPath('crashDumps')

async function getPath(name: string) {
  switch(name) {
    case 'home':
      return home
    case 'appData':
      return appData
    case 'userData':
      return userData
    case 'temp':
      return temp
    case 'exe':
      return exe
    case 'module':
      return module
    case 'desktop':
      return desktop
    case 'documents':
      return documents
    case 'downloads':
      return downloads
    case 'music':
      return music
    case 'pictures':
      return pictures
    case 'videos':
      return videos
    case 'recent':
      return recent
    case 'logs':
      return logs
    case 'crashDumps':
      return crashDumps
    default:
      throw new Error('Invalid path name')
  }
}
ipcMain.handle('getpath', async(_event, Pathname: string) => getPath(Pathname))
ipcMain.handle('downloadfile', async (_event, url: string, filepath: string, filename: string, concurrency: number) => DownloadFile(url, filepath, filename, concurrency))