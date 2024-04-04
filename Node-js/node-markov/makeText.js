/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");


/** Make Markov machine from text and generate text from it. */

function generateText(text) {
  let res = new markov.MarkovMachine(text);
  console.log(res.makeText());
}


/** read file and generate text from it. */

function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}

makeText(process.argv[2])