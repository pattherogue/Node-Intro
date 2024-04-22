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

// Main function
function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node step2.js <filename or URL>');
    exit(1);
  }
  const arg = args[0];
  if (arg.startsWith('http')) {
    webCat(arg);
  } else {
    cat(arg);
  }
}

main();
