
const readline = require('readline');

console.log('Enter:')

const rl = readline.createInterface({
    input: process.stdin
});

rl.on('line', (input) => {
     console.log(input.split("").reverse().join(""));
});

rl.on('close', () => {
    console.log('End!')
})
