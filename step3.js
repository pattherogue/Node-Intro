const fs = require('fs');
const axios = require('axios');
const { exit } = require('process');

// Function to read file contents
function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err);
      exit(1);
    }
    console.log(data);
  });
}

// Function to write file contents
function catWrite(path, filename) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err);
      exit(1);
    }
    fs.writeFile(filename, data, (err) => {
      if (err) {
        console.error(`Couldn't write ${filename}:`);
        console.error(err);
        exit(1);
      }
    });
  });
}

// Function to read URL contents
async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching ${url}:`);
    console.error(error);
    exit(1);
  }
}

// Function to write URL contents
async function webCatWrite(url, filename) {
  try {
    const response = await axios.get(url);
    fs.writeFile(filename, response.data, (err) => {
      if (err) {
        console.error(`Couldn't write ${filename}:`);
        console.error(err);
        exit(1);
      }
    });
  } catch (error) {
    console.error(`Error fetching ${url}:`);
    console.error(error);
    exit(1);
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const outIndex = args.indexOf('--out');
  
  if (outIndex === -1) {
    if (args.length !== 1) {
      console.error('Usage: node step3.js [--out filename.txt] <filename or URL>');
      exit(1);
    }
    const arg = args[0];
    if (arg.startsWith('http')) {
      webCat(arg);
    } else {
      cat(arg);
    }
  } else {
    if (outIndex === 0 || outIndex === args.length - 1) {
      console.error('Usage: node step3.js [--out filename.txt] <filename or URL>');
      exit(1);
    }
    const filename = args[outIndex + 1];
    const paths = outIndex === 0 ? args.slice(2) : args.slice(0, outIndex);

    paths.forEach(path => {
      if (path.startsWith('http')) {
        webCatWrite(path, filename);
      } else {
        catWrite(path, filename);
      }
    });
  }
}

main();
