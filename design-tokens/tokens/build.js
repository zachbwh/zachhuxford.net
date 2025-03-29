import StyleDictionary from "style-dictionary";
import { formats, transformGroups } from "style-dictionary/enums";
import {
  fileHeader,
  minifyDictionary,
  stripMeta as stripMetaUtil,
} from "style-dictionary/utils";

const { javascriptEsm } = formats;
const { js } = transformGroups;

const mapDtcgKeyForPanda = (obj) => {
  const keyMap = [
    ["$value", "value"],
    ["$type", "type"],
  ];
  Object.keys(obj).forEach((key) => {
    keyMap.forEach(([oldKey, newKey]) => {
      if (key === oldKey) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
    });

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      mapDtcgKeyForPanda(obj[key]);
    }
  });

  return obj;
};

const stripMetaProps = (tokens, options) => {
  const sdMetaProps = [
    "attributes",
    "filePath",
    "name",
    "path",
    "comment",
    "isSource",
    "original",
  ];
  const { stripMeta, usesDtcg } = options;
  let opts = /** @type {StripMetaOptions} */ ({ usesDtcg });

  // if (stripMeta) {
  // if (stripMeta === true) {
  opts.strip = sdMetaProps;
  // } else {
  //   opts = {
  //     usesDtcg: usesDtcg ?? false,
  //     ...stripMeta,
  //   };
  // }
  tokens = stripMetaUtil(tokens, opts);
  // }
  return tokens;
};

const pandaCssEsm = "pandacss/esm";
const customFormats = {
  [pandaCssEsm]: async ({ dictionary, file, options }) => {
    const { formatting, minify = false } = options;
    let { tokens } = dictionary;
    tokens = stripMetaProps(
      tokens,
      /** @type {LocalOptions & Config & { stripMeta: boolean | StripMetaOptions}} */ (
        options
      )
    );
    tokens = mapDtcgKeyForPanda(tokens);

    const header = await fileHeader({
      file,
      options,
    });

    const dictionaryString = JSON.stringify(
      minify ? minifyDictionary(tokens, options.usesDtcg) : tokens,
      null,
      2
    );

    const content = `${header}export default ${dictionaryString};\n`;
    return content;
  },
};

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(theme) {
  return {
    hooks: {
      formats: customFormats,
    },
    source: [
      `tokens/semantic-tokens/${theme}.json`,
      "tokens/globals/**/*.json",
    ],
    platforms: {
      web: {
        transformGroup: js,
        buildPath: `build/js/${theme}/`,
        files: [
          {
            destination: "tokens.js",
            format: javascriptEsm,
          },
          {
            destination: "tokens-panda.js",
            format: pandaCssEsm,
          },
          // {
          //   format: typescriptModuleDeclarations,
          //   destination: "tokens.d.ts",
          // },
        ],
      },
    },
  };
}

console.log("Build started...");

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT THEMES
["dark", "purple"].map((theme) => {
  console.log("\n==============================================");
  console.log(`\nProcessing: [${theme}]`);

  const sd = new StyleDictionary(getStyleDictionaryConfig(theme));
  sd.buildAllPlatforms();
});

console.log("\n==============================================");
console.log("\nBuild completed!");
