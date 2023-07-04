const { parentPort, workerData } = require('worker_threads');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const { url, start, end, tempPath } = workerData;
const order = Number(`${i}`)
if(url.startsWith('http://'))
    http.get(url, { headers: { Range: `bytes=${start}-${end - 1}`, "Content-Type": "application/octet-stream" } }, (res) => {
        const stream = fs.createWriteStream(path.join(tempPath, `chunk-${i}.tmp`));
        res.pipe(stream);
        res.on('end', () => {
            stream.close();
        });
    }).on("downloadProgress", ({ percent }) => {
        const percentage = Math.floor(percent * 100);
        parentPort.postMessage({ order, percentage });
    });
else
    https.get(url, { headers: { Range: `bytes=${start}-${end - 1}`, "Content-Type": "application/octet-stream" } }, (res) => {
        const stream = fs.createWriteStream(path.join(tempPath, `chunk-${i}.tmp`));
        res.pipe(stream);
        res.on('end', () => {
            stream.close();
        });
    }).on("downloadProgress", ({ percent }) => {
        const percentage = Math.floor(percent * 100);
        parentPort.postMessage({ order, percentage });
    });