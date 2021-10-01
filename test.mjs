import { genUrl, Brain } from "./turalsei.js";
import * as fs from  "fs";
import fetch from "node-fetch";

async function download(url, path) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFile(path, buffer, () =>
    console.log(`Downloaded to ${path}`));
}


//console.log(genUrl("test1\ntest2") + "\n");

// let testBrain = new Brain(">" + "+".repeat(65) + ".", "" /*, { outputOnly: true }*/);
// let testBrain  = new Brain(",.", "h");
let testBrain = new Brain(
  "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.",
  "Hello, world!"
);

testBrain.count = 0;
setTimeout(() => exampleTimeOut(testBrain), 750);

function exampleTimeOut(brain) {
  download(brain.url(), `example/${brain.count}.png`);
  brain.count++;
  if (brain.step()) {
    setTimeout(() => exampleTimeOut(brain), 750 + Math.random() * 100);
  }
}