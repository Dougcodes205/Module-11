const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'db', 'db.json');

const readNotes = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeNotes = (notes) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dataFilePath, JSON.stringify(notes), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = { readNotes, writeNotes };