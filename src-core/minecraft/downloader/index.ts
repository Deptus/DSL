import got from "got";
import { Worker } from "worker_threads";
import fs from "fs";

export interface DownloadFile {
    url: string, path: string 
}

export class Downloader {
    private smallFiles: DownloadFile[];
    private hugeFiles: DownloadFile[];
    private concurrency;

    constructor(smallFiles: DownloadFile[], hugeFiles: DownloadFile[], total_threads: number = 15) {
        this.smallFiles = smallFiles;
        this.hugeFiles = hugeFiles;
        this.concurrency = total_threads;
    }

    private async chunkDownload(file: DownloadFile) {
        const fileSize = Number((await got.head(file.url)).headers["content-length"]);
        if(fileSize) {
            const workers = new Array<Worker>(this.concurrency);;
            const buffer: Buffer[] = new Array<Buffer>(this.concurrency);;
            let start = 0;
            let end: number = Math.floor(fileSize / this.concurrency);
            for(let i = 0; i < this.concurrency; i++) {
                start = end + 1;
                end = start + Math.floor(fileSize / 10);
                if(i == this.concurrency - 1)
                    end = fileSize - 1;
                workers.push(new Worker(`
                    import got from "got";
                    import { parentPort } from "worker_threads";
                    const url = ${file.url};
                    const buffer = await got.get(url, {
                        headers: {
                            "Range": "bytes=${start}-${end}",
                            "Content-type": "application/octet-stream"
                        }
                    }).buffer()
                    
                    parentPort.postMessage(buffer);
                `))
            }

            await Promise.all(workers.map((v, i) => {
                v.once("message", (stream) => {
                    buffer[i] = stream as Buffer;
                })
            }))

            let fileBuffer: Buffer;
            fileBuffer = Buffer.concat(buffer);
            fs.writeFileSync(file.path, fileBuffer);
            return;
        }
        const buffer = await got.get(file.url, {
            headers: {
                "Content-type": "application/octet-stream"
            }
        }).buffer();
        fs.writeFileSync(file.path, buffer);
        return;
    }

    private async mutipleDownload(files: DownloadFile[]) {
        const workers: Worker[] = new Array<Worker>(this.concurrency);
        files.forEach((v) => {
            workers.push(new Worker(`
                import got from "got";
                import { parentPort } from "worker_threads";
                const url = ${v.url};
                const buffer = await got.get(url, {
                    headers: {
                        "Content-type": "application/octet-stream"
                    }
                }).buffer()
                parentPort.postMessage(buffer);
            `))
        })

        await Promise.all(workers.map((v, i) => {
            v.once("message", (stream) => {
                fs.writeFileSync(files[i].path, stream as Buffer);
            })
        }))

        return;
    }

    public async start() {
        const hugeFilesLen = this.hugeFiles.length;
        const smallFilesLen = this.smallFiles.length;
        for(let i = 0; i < hugeFilesLen; i++) 
           await this.chunkDownload(this.hugeFiles.at(i)!);
        let array: DownloadFile[] = []
        for(let i = 0; i < smallFilesLen; i++) {
            array.push(this.smallFiles[i]);
            if((i + 1) % this.concurrency === 0 || i === smallFilesLen - 1) {
                await this.mutipleDownload(array);
                array = [];
            }
        }
        return;
    }
}