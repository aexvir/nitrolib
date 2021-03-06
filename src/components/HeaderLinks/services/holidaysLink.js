// @flow strict
import type { Currency } from "../../../records/Currency";
import type { LangInfo } from "../../../records/LangInfo";

// holidays.kiwi.com are powered by Logitravel
const getLogitravelDeeplink = (isoShort: string) => {
  const supportedLanguages = [
    "pt",
    "es",
    "it",
    // "gb", -> gb is a fallback, and also the only non-ISO code in this list of supported langs
  ];
  const logitravelDeeplinkLang = supportedLanguages.indexOf(isoShort) > -1 ? isoShort : "gb";
  return `//holidays.kiwi.com/${logitravelDeeplinkLang}/?utm_id=24897`;
};

// formatting of the
const getLastminuteDeeplink = (lang: string) => {
  const utmSource = "?acntb=DP&bf_subsource=-----TL0S10RR01&utm_medium=whitelabel&utm_source=kiwi";

  switch (lang) {
    case "ie":
      return `https://kiwicom-ie.lastminute.com/flight-hotel/${utmSource}`;
    case "es":
      return `https://kiwicom-es.lastminute.com/vuelo-hotel/${utmSource}`;
    case "fr":
      return `https://kiwicom-fr.lastminute.com/vol-hotel/${utmSource}`;
    case "it":
      return `https://kiwicom-it.lastminute.com/volo-hotel/${utmSource}`;
    case "de":
      return `https://kiwicom.lastminute.de/flug-hotel/${utmSource}`;
    case "en":
    default:
      return `https://kiwicom.lastminute.com/flight-hotel/${utmSource}`;
  }
};

// Supported currenceis on Logitravel
const HOLIDAYS_CURRENCIES = ["eur", "gbp"];
const PACKAGES = {
  none: {
    getLink: (lang: string) => lang,
  },
  holidays: {
    getLink: (lang: string) => getLogitravelDeeplink(lang),
  },
  lastminute: {
    getLink: (lang: string) => getLastminuteDeeplink(lang),
  },
};

export type Provider = "none" | "lastminute" | "holidays";

export default function getLink(
  provider: Provider,
  lastminuteSupported: boolean,
  language: LangInfo,
  currency: Currency,
): string {
  const packageProviderSet = provider !== "none";

  // Intersection of Logitravel & Lastminute
  // Let AB test decide (packageProvider)
  const showPackagesIntersection = packageProviderSet && HOLIDAYS_CURRENCIES.includes(currency.id);
  const packages = showPackagesIntersection && PACKAGES[provider];

  // Lastminute extra
  const packagesLastMinute =
    !showPackagesIntersection && lastminuteSupported && PACKAGES.lastminute;

  if (packages) {
    const lang = provider === "holidays" ? language.iso.substring(0, 2) : language.id;
    return PACKAGES[provider].getLink(lang);
  }
  if (packagesLastMinute) {
    return PACKAGES.lastminute.getLink(language.id);
  }
  return "";
}
