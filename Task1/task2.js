const fs = require('fs');

// const fileContent = fs.readFileSync('./csv/data.csv', 'utf8');
// console.log(fileContent);
// fs.writeFileSync('./output.txt', fileContent, 'utf8')

// const fileContent = fs.readFile('./csv/data.csv', 'utf8', (err, file) => {
//     if (!err) {
//         fs.writeFile('./output.txt', fileContent, 'utf8',err => {
//             if (!err){
//                 console.log('Success!')
//             } else {
//                 console.log('File writting failed')
//             }
//         })
//     } else {
//         console.log('File reading failed')
//     }
// });

const readline = require('readline');
const csv = require('csvtojson');
const inputFile = './csv/data.csv';
const outputFile = 'output.txt';
let firstLine = null;
let writeableStream = fs.createWriteStream(outputFile);

writeableStream.on('error', err => {
    console.log("Error: " + err)
})

const rl = readline.createInterface({
    input: fs.createReadStream(inputFile)
});

rl.on('line', (input) => {
    if (!firstLine) firstLine = input;
    else {
        csv()
        .fromString(firstLine + '\n' + input)
        .then((json)=>{ 
            writeableStream.write(JSON.stringify(json) + '\n');
        })
        .catch(err => {
            console.log("Error: " + err);
        }) 
    }
});

rl.on('close', () => {
    console.log('End!')
})

// const file = './csv/data.csv';
// const rStream = fs.createReadStream(file);
// rStream.on('data', chunk => {
//     const data = chunk.toString();

//     console.log(chunk.toString());
// });
// rStream.on('close', () => {

// });
// rStream.on(err => {
//     console.error(err.message);
// })


