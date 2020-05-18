const fs = require('fs')
events = require('events')

class FilesWatch extends events.EventEmitter {
    constructor(Dir, targetDir) {
        super();
        this.Dir = Dir;
        this.targetDir = targetDir;
    }

    watch() {
        fs.readdir(this.Dir, (err, files) => {
            if (err) throw err;
            console.log(files);
            for (const file of files) {
                this.emit('process', file);
            }
        })
    }

    start() {
        fs.watchFile(this.Dir, () => {
            this.watch();
        })
    }
}

const watcher = new FilesWatch('./files', './target');

watcher.on('process', (file) => {
    const watchFile = `${watcher.Dir}/${file}`,
    targetFile = `${watcher.targetDir}/${file.toLowerCase()}`;
    console.log(watchFile);
    console.log(targetFile);
    fs.rename(watchFile, targetFile, err => {
        if(err) throw err;
    })
})

watcher.start();
