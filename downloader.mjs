import { parentPort, workerData } from 'worker_threads';
import got from 'got'

let { url, start, end, chunksize } = workerData

if(url && start && end && chunksize) 
    got.get(url, {
        headers: { 
            Range: `bytes=${start * chunksize}-${end * chunksize - 1}`,
            "Content-Type": "application/octet-stream"
        }
    }).then((res) => {
        console.log(res)
        if(typeof res === 'string') {
            parentPort.postMessage(res);
            return;
        }
        const buffer = Buffer.alloc(end - start + 1);
        let offset = 0;
        res.on('data', (chunk) => {
            chunk.copy(buffer, offset);
            offset += chunk.length;
        })
        res.on('end', () => {
            parentPort.postMessage(data)
        })
    }).catch((e) => { console.log(e) })