//Importing neccesary packages
var express = require('express');
const _ = require('underscore');
var Promise = require('bluebird');
//To return promises instead of callbacks
var fs = Promise.promisifyAll(require('fs'));

//Global variables that will store each entities once loaded from txt file (you can add more here)
var stops = [];
var agency=[];
var calendar=[];

//Initializing application
var app= express();

//Load all the Files from the txt files
getAllFiles().then(function(fileArray) {

  //Process each file to get an array of objects
  agency = processFile(fileArray[0])
  calendar = processFile(fileArray[1])
  stops = processFile(fileArray[2])

  //After loading all the files, start listening to upcoming connections
  app.listen(3001,()=>{
      console.log('Started on port 3001');
    });
}, function(err) {
   // an error occurred
});

//Function to load all the files
function getAllFiles() {
  //Array of promises
  var promises = [];
  //File names (if you want to load more, just add to this array)
  var fileNames=['data/agency.txt','data/calendar.txt','data/stops.txt']
  //Add promises to the array of promises for each file
  for (let f = 0; f<fileNames.length; f++) {
      promises.push(fs.readFileAsync(fileNames[f], 'utf8'));
  }
   //Return promise that is resolved when all files are done loading
   return Promise.all(promises);
}

//Function to convert a txt file into an array of objects (each row is an object)
function processFile(data){
    //Variable to return
    let objectArray=[];
    //Variable to store file header
    let header=[];
    //Split each line of the file
	let lines = data.split("\n");
	//When you upload the data to github (or when you download it), it looks like it eliminates the \r.
	//If you load the data locally, there is a \r before the \n so you can use this statement
	//let lines = data.split("\r\n");

    //Going through all the lines of the file
    for (let i = 0; i<lines.length; i++) {
        //If the line is empty, continue
        if(lines[i]==""){
            continue
        }
        //Get each field value of the line
        let fieldValues= lines[i].split(",");
          //Create an object
          var object={}
          //Go through all the fields
          for (let h = 0; h<fieldValues.length; h++) {
              //If it is the first line, we are in the header.
              if (i==0){
                //Store header values.
                header.push(fieldValues[h])}
              else{
                //Else, the line is an object.
                //Take field names from header
                let field = header[h];
                //Add field to the object
                object[field] = fieldValues[h];
              }
          }
          //If the object is not empty, add it to the array of objects
          if(_.isEmpty(object)){}else{
              objectArray.push(object);
          }
    }
    return objectArray;
}

//Set route to get the subway stops
app.get('/stops',(req,res)=>{
    res.contentType('application/json');
    res.send(JSON.stringify(stops));
});
