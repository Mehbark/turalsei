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
  constructor(code, input = false, options = {}) {
    this.code = code;
    this.input = input;

    let defaultOptions = {
      delay: 1000,
      pointerChar: "^^",
      dataSize: 256,
      maxNumber: 256,
      numberWrap: true,
      dataPointerWrap: true,
      maxCharsPerLine: 25,
      customUrl:
        "https://www.demirramon.com/gen/undertale_text_box.png?text=$$$$&box=deltarune&boxcolor=ffffff&character=deltarune-ralsei&expression=angry&charcolor=colored&font=determination&asterisk=ffffff&mode=darkworld",
      instant: false,
      outputOnly: false,
    };
    this.parseOptions(defaultOptions, options);

    this.delay = this.delay > 1000 ? this.delay : 1000;

    this.dataPointer = 0;
    this.data = "1".repeat(this.dataSize).split("");
    this.data = this.data.map((x) => parseInt(x));

    this.intructionPointer = 0;

    this.output = "";
  }

  memoryLine() {
    return this.data
      .map((x) => {
        let p = parseInt(x.toString(16), 16).toString();
        return p.length > 1 ? "" : "0" + p;
      })
      .join("");
  }

  pointerLine() {
    return " ".repeat(this.dataPointer * 2) + this.pointerChar.slice(0, 2);
  }

  finalText() {
    return [
      this.memoryLine().slice(0, this.maxCharsPerLine),
      this.pointerLine().slice(0, this.maxCharsPerLine),
      this.output.slice(0, this.maxCharsPerLine),
    ].join("\n");
  }

  finalUrl() {
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
}
