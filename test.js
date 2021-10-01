import { genUrl, Brain } from "./turalsei.js";
import pkg from 'open';
const { open } = pkg;
//console.log(genUrl("test1\ntest2") + "\n");

// let testBrain = new Brain(">" + "+".repeat(65) + ".", "" /*, { outputOnly: true }*/);
// let testBrain  = new Brain(",.", "h");
let testBrain = new Brain(
  "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.",
  "Hello, world!"
);

setTimeout(() => exampleTimeOut(testBrain), 3000);

function exampleTimeOut(brain) {
  pkg(brain.url());
  if (brain.step()) {
    setTimeout(() => exampleTimeOut(brain), 3000);
  }
}