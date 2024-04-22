const fs = require('fs');
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

// Main function
function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node step1.js <filename>');
    exit(1);
  }
  cat(args[0]);
}

main();
