import { genUrl, Brain } from "./turalsei.js";
//console.log(genUrl("test1\ntest2") + "\n");

// let testBrain = new Brain(">" + "+".repeat(65) + ".", "" /*, { outputOnly: true }*/);
// let testBrain  = new Brain(",.", "h");
let testBrain = new Brain(
  "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.",
  "Hello, world!"
);

let i = 0;
while (testBrain.step()) {
  console.log(testBrain.text());
}

console.log(testBrain.output);
console.log(testBrain.url());
