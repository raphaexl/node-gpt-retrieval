import run from './langprocess.js'
import * as dotenv from 'dotenv'

import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
//dotenv
dotenv.config();

rl.on('line', async(line) => {
    const res = await run(line)
    console.log(res.text)
});

rl.once('close', () => {
     // end of input
 });