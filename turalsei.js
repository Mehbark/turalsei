/**
 *
 * @param {String} text Text to be put in the url
 * @param {String} baseUrl Base url to use, `$$$$` will be replaced by supplied text
 * @returns A demirramon url with the text you put
 */
export function genUrl(
  text,
  baseUrl = "https://www.demirramon.com/gen/undertale_text_box.png?text=$$$$"
) {
  return baseUrl.replace("$$$$", encodeURI(text));
}

export class brain {
  constructor(code = "", input = false, options = {}) {
    this.code = code;
    this.input = input;
    this.inputPointer = 0;

    let defaultOptions = {
      delay: 1000,
      pointerChar: "^^",
      dataSize: 256,
      maxNumber: 255,
      numberWrap: true,
      dataPointerWrap: true,
      maxCharsPerLine: 25,
      customUrl:
        "https://www.demirramon.com/gen/undertale_text_box.png?text=$$$$&box=deltarune&character=deltarune-ralsei&expression=angry&mode=darkworld",
      instant: false,
      outputOnly: false,
    };
    this.parseOptions(defaultOptions, options);

    this.delay = this.delay > 1000 ? this.delay : 1000;

    this.dataPointer = 0;
    this.data = "0".repeat(this.dataSize).split("");
    this.data = this.data.map((x) => parseInt(x));

    this.instructionPointer = 0;

    this.output = "";
  }

  memoryLine() {
    return this.data
      .map((x) => {
        let hex = x.toString(16);
        return hex.length > 1 ? hex : "0" + hex;
      })
      .join("");
  }

  pointerLine() {
    return " ".repeat(this.dataPointer * 2) + this.pointerChar.slice(0, 2);
  }

  finalText() {
    if (this.outputOnly) {
      return this.output;
    }
    return [
      this.memoryLine().slice(0, this.maxCharsPerLine),
      this.pointerLine().slice(0, this.maxCharsPerLine),
      this.output.slice(0, this.maxCharsPerLine),
    ].join("\n");
  }

  url() {
    return genUrl(this.finalText(), this.customUrl);
  }

  parseOptions(defaultOptions, options) {
    Object.keys(defaultOptions).forEach((opt) => {
      if (options[opt] !== undefined) {
        this[opt] = options[opt];
      } else {
        this[opt] = defaultOptions[opt];
      }
    });
  }

  // BRAINF SECTION //
  step() {
    let currentCommand = this.code[this.instructionPointer];
    let currentData = this.data[this.dataPointer];

    switch (currentCommand) {
      case ">":
        this.dataPointer++;
        if (this.dataPointer >= this.dataSize) {
          if (this.dataPointerWrap) {
            this.dataPointer = 0;
          } else {
            this.dataPointer--;
          }
        }
        break;
      case "<":
        this.dataPointer--;
        if (this.dataPointer <= 0) {
          if (this.dataPointerWrap) {
            this.dataPointer = this.dataSize - 1;
          } else {
            this.dataPointer++;
          }
        }
        break;

      case "+":
        this.data[this.dataPointer]++;
        if (this.data[this.dataPointer] > this.maxNumber) {
          if (this.numberWrap) {
            this.data[this.dataPointer] = 0;
          } else {
            this.data[this.dataPointer]--;
          }
        }
        break;
      case "-":
        this.data[this.dataPointer]--;
        if (this.data[this.dataPointer] < 0) {
          if (this.numberWrap) {
            this.data[this.dataPointer] = this.maxNumber;
          } else {
            this.data[this.dataPointer]++;
          }
        }
        break;

      case ".":
        this.output += String.fromCharCode(currentData);
        break;
      case ",":
        this.data[this.dataPointer] =
          this.input[this.inputPointer].charCodeAt();
    }
    this.instructionPointer++;
    return this.instructionPointer < this.code.length;
  }
}
