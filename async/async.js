const async = require('async');
events = [
    callback => {
        setTimeout(() => {
            console.log('first');
            console.log(callback.toString());
            callback(); // necessary
        }, 1000)
    },
    callback => {
        setTimeout(() => {
            console.log('second');
            console.log(callback);
            callback();
        }, 2000)
    }
];

async.series(events);
