import { genUrl, brain } from "./turalsei.js";
console.log(genUrl("test1\ntest2") + "\n");

let testBrain = new brain("", "");

console.log(testBrain.pointerLine());
testBrain.dataPointer++;
console.log(testBrain.pointerLine());

console.log(testBrain.finalUrl());