const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
   console.log('Your notes...');
};

const addNote = (title, body) => {
   const notes = loadNotes();
   // Ensure the title has not been previously used
   const duplicateNote = notes.find((note) => note.title === title)
   // If there are no duplicate notes run script
   if(!duplicateNote){
      notes.push({
         title: title,
         body: body
      });
      saveNotes(notes);
      console.log(chalk.green.inverse('A new note was added.'));
   // If there are duplicate notes, state the following:
   } else {
      console.log(chalk.yellowBright.inverse('Note title already exists.'))
   }
};

const removeNote = title => {
   console.log(`The note titled "${title}" will be removed.`);
   const notes = loadNotes();
   // Use array filter method to remove the matching note if any
   const filteredNotes = notes.filter(function(note){
      return note.title != title;
   })
   if(filteredNotes.length === notes.length){
      console.log(chalk.red.inverse(`There is no note by that name...`))
   } else {
      console.log(chalk.green.inverse('The note was deleted.'))
      saveNotes(filteredNotes);
   }
}

const saveNotes = notes => {
   const dataJSON = JSON.stringify(notes);
   fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
   try {
      const dataBuffer = fs.readFileSync('notes.json');
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
   } catch (e) {
      return[];
   }
};

const listNotes = () => {
   const notes = loadNotes();
   if (notes.length > 0){
      console.log(chalk.inverse('These are your notes...'))
      notes.forEach((note) => {
         console.log(note.title);
      })
   } else {
      console.log(chalk.red.inverse('You have no notes.'))
   }
}

// 
const readNote = (title) => {
   const notes = loadNotes();
   // Search for note by title
   const desiredNote = notes.find((note) => note.title === title);
   if(desiredNote){
      console.log(chalk.inverse('Here is the note you requested:'));
      console.log(chalk.bold(`Title: ${desiredNote.title}`));
      console.log(desiredNote.body);
   // If there are duplicate notes, state the following:
   } else {
      console.log(chalk.yellowBright.inverse('Note title not found.'));
   }
   // Find note and print title (styled in chalk) and body (plain)
   // If no note is found, print error
}

module.exports = {
   getNotes: getNotes,
   addNote: addNote,
   removeNote: removeNote,
   listNotes: listNotes,
   readNote: readNote
};