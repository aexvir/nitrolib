// @flow strict
import fs from "fs-extra";
import path from "path";

import "./globals"; // Must be 1st
import markup from "./markup";
import { routes } from "./config";
import { brands, intls } from "./data";

const OUT = path.join(__dirname, "../static/pages");

const brandIds = Object.keys(brands);
const intlIds = Object.keys(intls);

function render() {
  brandIds.forEach(brandId => {
    intlIds.forEach(intlId => {
      routes.forEach(route => {
        const fileDir = path.join(OUT, brandId, intlId, route.filepath);
        fs.ensureDirSync(fileDir);

        const htmlStream = markup(route.url, brandId, intlId);
        const fileStream = fs.createWriteStream(path.join(fileDir, "index.html"));

        htmlStream.pipe(fileStream);

        fileStream.on("error", err => {
          console.error("[render] Error!", err); // eslint-disable-line no-console
        });
      });
    });
  });
}

render();
