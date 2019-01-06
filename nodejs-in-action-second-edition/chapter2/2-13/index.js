const Watcher = require('./watch');

const watcher = new Watcher(watchDir, processDir);

watcher.on('process', () => {
    const watchFile = `${watchDir}/${file}`;
    const processedFile = `${processedDir}/${file.toLowerCase()}`;
    false.rename(watchFile, processedFile, err => {
        if (err) throw err;
    });
});

watcher.start();