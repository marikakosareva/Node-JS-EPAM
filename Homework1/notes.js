// Создание папки
const fs = require('fs');
fs.mkdirSync('./new_dir'); // относительно корневой папки проекта

// проверка доступа
fs.accessSync(file, fs.constants.R_OK)

// проверка существования файла
const stats = fs.statSync('./index.js')

// Промисификация
const fs = require('fs');
const fsPromises = fs.promises;
fsPromises.readFile('./data.txt', 'utf8')
    .then(file => console.log(file));
console.log('Reading file...');    

// Buffer
Buffer.from();
Buffer.alloc();
const buf = Buffer.from('hello');
 