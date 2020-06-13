const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Customer yargs version
yargs.version('1.2.3');

// Add notes
// Remove Notes
// Read individual notes
// List notes
// Help options for all above

// 1. Add Notes

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.addNote(argv.title, argv.body);
    }

})


// Create Remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    handler: function(){
        console.log(chalk.bold('Removing a note!'));
    }
})

// List command
yargs.command({
    command: 'list',
    describe: 'List all notes.',
    handler: function(){
        console.log(chalk.bold('List all of the notes!'));
    }
})

// Read command
yargs.command({
    command: 'read',
    describe: 'Read a note.',
    handler: function(){
        console.log(chalk.bold('Read this note!'));
    }
})

yargs.parse();