// @flow strict
import getLink from "../holidaysLink";
import { langInfoDefault } from "../../../../records/LangInfo";

const language = langInfoDefault;

const currency = {
  enabledOnAffilId: "",
  fallback: "",
  format: "__price__ €",
  id: "eur",
  name: "Euro",
  rate: 1,
  round: "2",
  uncertainFormat: false,
};

const currencySE = {
  enabledOnAffilId: "",
  fallback: "",
  format: "__price__ SEK",
  id: "sek",
  name: "SEK",
  rate: 10,
  round: "2",
  uncertainFormat: false,
};

describe("#HeaderLinks/service/holidaysLink", () => {
  test("getLink holidays", () => {
    expect(getLink("holidays", language, currency)).toEqual("//holidays.kiwi.com/gb/?utm_id=24897");
  });

  test("getLink lastminute", () => {
    expect(getLink("lastminute", language, currencySE)).toEqual(
      "https://kiwicom.lastminute.com/flight-hotel/?utm_source=kiwicom_header_link",
    );
  });

  test("getLink none", () => {
    expect(getLink("none", language, currencySE)).toBeNull();
  });
});