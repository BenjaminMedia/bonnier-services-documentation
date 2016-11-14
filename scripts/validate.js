#!/usr/bin/env node
var util = require('util');
var exec = require('child_process').exec;
var path = require('path');
var exit = require('process').exit;

var swaggerFile = path.dirname(__dirname) + '/web_deploy/swagger.json';

var command = "curl -X POST -sd @" + swaggerFile + " -H 'Content-Type:application/json' http://online.swagger.io/validator/debug"

exec(command, function(error, stdout, stderr){

  var response = JSON.parse(stdout);

  if(response.hasOwnProperty('messages') && response.messages.length > 0) {
    response.messages.map(function(message){
      console.log('Validation Error: ' + message);
    });
    exit(1);
  }

  if(error !== null)
  {
      console.log('unexpected error: ' + error);
      exit(1);
  }

  console.log('Validation Ok')

  exit(0);

});
