const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store  {
    read() {
        //console.log(readFileAsync("./db.json", "utf8"))
        return readFileAsync("db/db.json", "utf8")
    }
    write(notes) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes))
            } catch(error) {
                parsedNotes = []
            }
            return parsedNotes;
        })
    }
    addNotes(notes){
        const { title, text } = notes
        if(!title || !text) {
            throw new Error("Title and Text cannot be blank")
        }
        const newNote = { title, text, id: uuidv4()}

        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }
    removeNotes() {

    }
}
const a = new Store().getNotes().then((notes) => console.log(notes))

module.exports = new Store();
