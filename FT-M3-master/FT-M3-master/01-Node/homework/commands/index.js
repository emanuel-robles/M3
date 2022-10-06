var fs = require('fs');

var request = require('request');


module.exports = {
    date: (otraData, done) => done(Date()),
    pwd: (otraData,done) => done(process.cwd()),
    ls: (otraData, done) => fs.readdir('.', function(err, files) {
        if (err) throw err;
        var output = '';
        files.forEach(function(file) {
          output = output + file + '\n';
        })
        done(output);
    }),
    echo: (otraData, done) => done(otraData.join(' ')),
    cat: (otraData, done) => fs.readFile(otraData[0], 'utf-8', (err, data) => {
        if(err) throw err;
        done(data);
    }),
    head: (otraData, done) => fs.readFile(otraData[0], 'utf-8', (err, data) => {
        if(err) throw err;
        done(data.split('\n').slice(0,10).join('\n'));  
    }),
    tail: (otraData, done) => fs.readFile(otraData[0], 'utf-8', (err, data) => {
        if(err) throw err;
        done(data.split('\n').slice(-10).join('\n'));  
    }),
    curl: (otraData,done) => request(otraData[0], (err, response, body) => {
        if(err) throw err;
        done(body);
    })
}