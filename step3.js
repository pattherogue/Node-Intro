const fs = require('fs');
const axios = require('axios');

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', err => {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    }
    handleOutput(data, out);
  });
}

async function webCat(url, out) {
  try {
    const response = await axios.get(url);
    handleOutput(response.data, out);
  } catch (error) {
    console.error(`Error fetching ${url}: ${error}`);
    process.exit(1);
  }
}

let path;
let out;

const argv = process.argv.slice(2);
const outIndex = argv.indexOf('--out');

if (outIndex !== -1) {
  out = argv[outIndex + 1];
  path = argv[outIndex + 2];
} else {
  path = argv[0];
}

if (path.startsWith('http')) {
  webCat(path, out);
} else {
  cat(path, out);
}
