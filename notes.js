const fs = require('fs');
const chalk = require('chalk');




const getNotes = function(){
   console.log('Your notes...')
};



const addNote = function (title, body) {
   const notes = loadNotes();
   // Ensure the title has not been previously used
   const duplicateNotes = notes.filter(function(note){
      // Filter all that meet the following condition:
      return note.title === title;
   });
   // If there are no duplicate notes run script
   if(duplicateNotes.length === 0){
      notes.push({
         title: title,
         body: body
      });
      saveNotes(notes);
      console.log('A new note was added.');
   // If there are duplicate notes, state the following:
   } else {
      console.log('Note title already exists.')
   }
};



const removeNote = function (title) {
   console.log('REMOVE THIS NOTE!')
}


const saveNotes = function(notes){
   const dataJSON = JSON.stringify(notes);
   fs.writeFileSync('notes.json', dataJSON);
}



const loadNotes = function(){
   try {
      const dataBuffer = fs.readFileSync('notes.json');
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
   } catch (e) {
      return[];
   }
};



module.exports = {
   getNotes: getNotes,
   addNote: addNote,
   removeNote: removeNote
};