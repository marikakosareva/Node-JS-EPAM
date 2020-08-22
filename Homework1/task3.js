const fs = require('fs');
const stream = require('stream');
const csv = require('csvtojson');
const inputFile = './csv/data.csv';
const outputFile = 'output.txt';
const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

const Transform = stream.Transform;

class myTransform extends Transform {
    constructor(){
        super()
        this.currentLine = '';
    }

    _transform(chunk, enc, done) {
        const lines = chunk.toString('utf8').split('\n');
        let firstLine = null;
        console.log(lines)
        lines.forEach(line => {
            if (!firstLine) {
                firstLine = line;
            } else {
                csv()
                .fromString(firstLine + '\n' + line)
                .then((json)=>{ 
                    this.push(JSON.stringify(json) + '\n');
                })
            }
        });
       
        done();
    }
}

readStream.pipe(new myTransform()).pipe(writeStream);

//Ex 1 (notes)
// const fileContent = fs.readFileSync('./csv/data.csv', 'utf8');
// console.log(fileContent);
// fs.writeFileSync('./output.txt', fileContent, 'utf8')

//Ex 2 (notes)
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

// const readline = require('readline');
// const csv = require('csvtojson');
// const inputFile = './csv/data.csv';
// const outputFile = 'output.txt';
// let firstLine = null;
// let writeableStream = fs.createWriteStream(outputFile);

// writeableStream.on('error', err => {
//     console.log("Error: " + err)
// })

// const rl = readline.createInterface({
//     input: fs.createReadStream(inputFile)
// });

// rl.on('line', (input) => {
//     if (!firstLine) firstLine = input;
//     else {
//         csv()
//         .fromString(firstLine + '\n' + input)
//         .then((json)=>{ 
//             writeableStream.write(JSON.stringify(json) + '\n');
//         })
//         .catch(err => {
//             console.log("Error: " + err);
//         }) 
//     }
// });

// rl.on('close', () => {
//     console.log('End!')
// })
