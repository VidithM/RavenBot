require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

var data= [];

client.on('message', eval => {
  if(eval.content == 'hi'){
    eval.channel.send('Hello there, ' + eval.author.username);
  }
  if(eval.content == 'bot-info'){
    eval.channel.send('I am Raven, a bot currently in development. I can perform simple, mischievious tasks, like spamming (!spam <message, repetitions>) or kicking people out (!kick <username>)');
  }
  if(eval.content.indexOf('!spam') == 0){
    if(processParams(eval, 2)){
      var reps;
      try{
        reps = parseInt(data[1]);
      } catch(error){
        console.log('passed');
        eval.channel.send('Invalid input, ' + eval.author.username + ' type \'bot-info\' for more info');
      }
      for(var rep = 0; rep < reps; rep++){
        eval.channel.send(data[0]);
      }
    }
  }
  if(eval.content.indexOf('!kick') == 0){
    if(processParams(eval, 1)){

    }
  }
});

function processParams(eval, args){
  data = [];
  var lbrackIdx = eval.content.indexOf('<');
  var rbrackIdx = eval.content.indexOf('>');
  if(lbrackIdx == -1 || rbrackIdx == -1){
    eval.channel.send('Invalid input, ' + eval.author.username + ' type \'bot-info\' for more info');
    return false;
  }
  if(args > 1){
    var param = eval.content.substring(lbrackIdx + 1, rbrackIdx);

    var argsIn = param.split(",");

    if(argsIn.length != args){
      eval.channel.send('Invalid input, ' + eval.author.username + ' type \'bot-info\' for more info');
      return false;
    }
    var cnt = 0;
    for(idx in argsIn){
      console.log(idx);
      data[cnt] = argsIn[idx];
      cnt++;
    }
  }
  console.log(data);
  return true;
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);
