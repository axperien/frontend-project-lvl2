// import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getDataFromFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8', (err, fd) => {
  if (err) throw err;
  return fd;
});

const makeString = (key, value, symbol = ' ') => `  ${symbol} ${key}: ${value}\n`;

export default (pathToFile1, pathToFile2) => {
  const fileData1 = getDataFromFile(pathToFile1);
  const fileData2 = getDataFromFile(pathToFile2);
  const json1 = JSON.parse(fileData1);
  const json2 = JSON.parse(fileData2);

  const arr1 = Object.entries(json1);
  const arr2 = Object.entries(json2);

  const compare = arr1.reduce((acc, [key, value]) => {
    let string = acc;
    if (Object.prototype.hasOwnProperty.call(json2, key)) {
      if (value === json2[key]) {
        string += makeString(key, value);
      } else {
        string += makeString(key, value, '+');
        string += makeString(key, value, '-');
      }
    } else {
      string += makeString(key, value, '-');
    }

    return string;
  }, '');

  const result = arr2.reduce((acc, [key, value]) => {
    let string = acc;
    if (!Object.prototype.hasOwnProperty.call(json1, key)) {
      string += makeString(key, value, '+');
    }

    return string;
  }, compare);

  console.log(`{\n${result}}`);
};
