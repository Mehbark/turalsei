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

    if (delay < 1000) {
      delay = 1000;
    }
    this.delay = delay;

    let defaultOptions = {
      delay: 1000,
      pointerChar: "^",
      dataSize: 256,
      dataPointerWrap: true,
      customUrl:
        "https://www.demirramon.com/gen/undertale_text_box.png?text=$$$$&box=deltarune&boxcolor=ffffff&character=deltarune-ralsei&expression=angry&charcolor=colored&font=determination&asterisk=ffffff&mode=darkworld",
      instant: false,
    };
    this.parseOptions(defaultOptions, options);

    this.input = input;

    this.dataPointer = 0;
  }

  parseOptions(defaultOptions, options) {
    for (let opt in defaultOptions.keys) {
      if (options[opt] !== undefined) {
        this[opt] = options[opt];
      } else {
        this[opt] = defaultOptions[opt];
      }
    }
  }
}
