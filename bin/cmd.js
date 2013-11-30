#!/usr/bin/env node

var fs = require('fs'),
    wrench = require('wrench');

var coolNames = [
  ['the', 'a', 'my', 'our', 'le', 'ma'],
  ['super', 'mega', 'awesome', 'crazy', 'monster', 'brilliant', 'best', 'incredible'],
  ['website', 'place', 'site', 'httpblob', 'nodewebapp', 'landingpage', 'castle', 'home']
];

function r (length) {
  return Math.round(Math.floor(Math.random()*(length*10))/10);
}

if (process.argv.slice(2).length === 0) {
  var nameProposal = coolNames[0][r(coolNames[0].length-1)] +
  coolNames[1][r(coolNames[1].length-1)] +
  coolNames[2][r(coolNames[2].length-1)];
  var lines = Array(nameProposal.length+1).join('-');
  console.info('You have to give your website a cool name! How about:\n' + lines + '\n' + nameProposal + '\n' + lines);
  process.exit(0);
}

var appName = process.argv.slice(2)[0];

var dir = process.cwd() + '/' + appName;
fs.exists(dir, function (exists) {
  if (exists) {
    console.error('Sorry! The folder does exists, please use another name, or remove it!');
    process.exit(0);
  } else {
    fs.mkdirSync(dir);
    wrench.copyDirSyncRecursive((__dirname+'/../example/'), (dir), { forceDelete: true });
    var packageJson = {
      "name": String(appName),
      "version": "0.0.0",
      "description": "",
      "main": "gtsd.server.js",
      "scripts": {
        "start": "node gtsd.server.js"
      },
      "dependencies": {
        "gettheshitdone": "*"
      }
    };
    fs.writeFileSync(dir+'/package.json', JSON.stringify(packageJson), 'utf8');
  }
});