#!/usr/bin/env node
// @noflow
/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable no-console */
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const yargs = require("yargs");
const R = require("ramda");

const collectKeys = require("./scripts/collectKeys");
const fetchBrandConfig = require("./scripts/fetchBrandConfig");
const fetchSpreadsheet = require("./scripts/fetchSpreadsheet");
const getTranslations = require("./scripts/getTranslations");
const mapLanguages = require("./scripts/mapLanguages");

const command = process.argv[2];

const OUT = path.join(process.cwd(), "data");
const TKEYS = path.join(OUT, "tkeys.json");

function log(what) {
  console.log(`${chalk.bold.green(">")} ${what}`);
}

function error(what) {
  console.log(`${chalk.bold.red(">")} ${what}`);
}

const resolve = glob => path.join(process.cwd(), glob);

const commands = {
  keys: "keys",
  fetch: "fetch",
};

log(chalk.bold.green("NITRO"));
if (!commands[command]) {
  log("Available commands:");
  log(`  ${chalk.underline.bold("keys")} [...globs]      - collects translation keys`);
  log(`    ${chalk.underline("globs")} - where to collect keys from`);
  log("");
  log(`  ${chalk.underline.bold("fetch")} [translations] - fetches production data`);
  log(`    ${chalk.underline("translations")} (optional) - path to translations`);
  log("");
  log("See CLI docs for details at https://github.com/kiwicom/nitrolib");
}

function keys(globs) {
  const ours = JSON.parse(fs.readFileSync(path.join(__dirname, "../tkeys.json")));

  const collected = collectKeys(globs.map(resolve));

  const data = R.merge(ours, collected);
  fs.outputJsonSync(path.join(process.cwd(), "data/tkeys.json"), data, {
    spaces: 2,
  });

  log(
    `DONE! Collected ${Object.keys(data).length} keys, out of which ${
      Object.keys(collected).length
    } are your own.`,
  );
}

function fetch(translations /* : ?string */) {
  const TRANSLATIONS = path.join(
    translations || process.cwd(),
    "node_modules/@kiwicom/translations/lib",
  );
  if (!fs.existsSync(TRANSLATIONS)) {
    error("'fetch' requires the '@kiwicom/translations' module to be installed.");
    return;
  }

  if (!fs.existsSync(TKEYS)) {
    error(
      "'fetch' requires collecting translation keys to a 'data/tkeys.json' file! This can be done using the 'nitro keys <globs>' command.",
    );
    return;
  }

  Promise.all([fetchSpreadsheet(), fetchBrandConfig()])
    .then(() => getTranslations(TKEYS, TRANSLATIONS))
    .then(mapLanguages)
    .then(() => {
      log("DONE!");
    })
    .catch(err => {
      log(chalk.bold.red("ERROR"));
      error(err);
    });
}

if (command === commands.keys) {
  keys(process.argv.slice(3));
}

if (command === commands.fetch) {
  fetch(yargs.argv.translations);
}
