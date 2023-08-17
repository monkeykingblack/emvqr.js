const path = require("path")
const fs = require( "fs");
const Mustache = require("mustache")

const TEMPLATE = `
export default class VNBank {
  // eslint-disable-next-line no-use-before-define
  static ALL_VALUE: Map<string[], VNBank> = new Map();
  {{#banks}}

  static readonly {{shortName}} = new VNBank("{{name}}", "{{code}}", "{{shortName}}", "{{bin}}");
  {{/banks}}

  private constructor(
    public readonly name: string, 
    public readonly code: string, 
    public readonly shortName: string,
    public readonly bin: string
  ) {
    VNBank.ALL_VALUE.set([name, code, shortName, bin], this);
  }

  toString() {
    return this.name;
  }

  public static entryOf(str: string): VNBank | undefined {
    for (const entry of this.ALL_VALUE) {
      if(entry[0].includes(str)) {
        return entry[1]
      }
    }
    return undefined
  }

  public static exists(str: string): boolean {
    return !!this.entryOf(str)
  }
}
`

const FILE_PATH = path.resolve(__dirname, "../src/vietqr/bank.ts")

const request = async () => {
  const banks = await fetch("https://api.vietqr.io/v2/banks").then(res => res.json()).then(res => res.data)
  
  const content = Mustache.render(TEMPLATE, {banks})

  fs.writeFileSync(FILE_PATH, content)
}

request()