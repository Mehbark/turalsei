import { genUrl, brain } from "./turalsei.js";
//console.log(genUrl("test1\ntest2") + "\n");

//let testBrain = new brain("+".repeat(65) + ".", "" /*, { outputOnly: true }*/);
let testBrain  = new brain(",.", "h");

while (testBrain.step());

console.log(testBrain.output);
console.log(testBrain.url());
