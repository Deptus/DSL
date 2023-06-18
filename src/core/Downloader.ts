import * as path from 'path';
import { Worker } from 'worker_threads';
import * as fs from 'fs';
import { ipcMain } from 'electron';
async function DownloadFile(url: string, filepath: string, filename: string, concurrently: number) {
    const response = await fetch(url)
    const filelength = response.headers.get('Content-Length') ? response.headers.get('Content-Length')! : "1000000000"
    console.log(`File is ${filelength} bytes long`)
    const chunks = Math.ceil(parseInt(filelength) / (1024 * 1024))
    if(fs.existsSync(path.join(filepath, filename)))
        fs.rmSync(path.join(filepath, filename))
    const fileStream = fs.createWriteStream(path.join(filepath, filename))
    for(let i = 0; i < concurrently; i++) {
        const start = i * chunks / concurrently
        const end = (i + 1) * chunks / concurrently
        const chunksize = 1024 * 1024
        console.log(`Downloading chunk ${i} of ${concurrently}, from ${start} to ${end}`)
        const worker = new Worker(path.join(__dirname, 'downloader.mjs'), {
            workerData: { url, start, end, chunksize }
        })
        worker.on('message', (chunk: Buffer | string) => {
            fileStream.write(chunk);
          });
          worker.on('error', (err: Error) => {
            console.error(err);
          });
          worker.on('exit', (code: number) => {
            if (code !== 0) {
              console.error(`Worker stopped with exit code ${code}`);
            }
          });
    }
}
ipcMain.handle('downloadfile', (_event, url: string, filepath: string, filename: string, concurrently: number) => DownloadFile(url, filepath, filename, concurrently))