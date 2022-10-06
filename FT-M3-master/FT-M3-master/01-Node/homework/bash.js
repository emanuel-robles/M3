const commands = require('./commands');


const done = function(output){
    process.stdout.write(output);
    process.stdout.write("prompt > ");
}

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var [cmd, ...otraData] = data.toString().trim().split(' '); // remueve la nueva línea
  if(commands[cmd]){
    commands[cmd](otraData, done)
  }else{
    process.stdout.write('command not found');  
  }
  process.stdout.write('\nprompt > ');
});

//'echo hola'.split(' ') ---> ['echo', 'hola']
//cmd = 'echo', otraData = 'hola'

//var [cmd, ...otraData] = ['echo', 'hola', 'mundo', 'como', 'estas']

//echo otraCosa
//cat bash.js