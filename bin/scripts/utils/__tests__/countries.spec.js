// @flow
import * as fns from "../countries";

const input = {
  sk: {
    id: "sk",
    currency: "eur",
    continent: "euro",
    AR: "سلوفاكيا",
    BG: "Словакия",
    BR: "Eslováquia",
    CA: "Eslovàquia",
    CN: "斯洛伐克",
    CS: "Slovensko",
    DA: "Slovakiet",
    DE: "Slowakei",
    EL: "Σλοβακία",
    EN: "Slovakia",
    ES: "Eslovaquia",
    FI: "Slovakia",
    FR: "Slovaquie",
    HR: "Slovačka",
    HU: "Szlovákia",
    ID: "Slovakia",
    IE: "Slovakia",
    IS: "Slóvakía",
    IT: "Slovacchia",
    JA: "スロバキア",
    KO: "슬로바키아",
    LT: "Slovakija",
    MX: "Eslovaquia",
    NL: "Slowakije",
    NO: "Slovakia",
    NZ: "Slovakia",
    PL: "Słowacja",
    PT: "Eslováquia",
    RO: "Slovacia",
    RU: "Словакия",
    SK: "Slovenská republika",
    SR: "Slovačka",
    SV: "Slovakien",
    TH: "สโลวะเกีย",
    TR: "Slovakya",
    TW: "斯洛伐克",
    UK: "Словаччина",
    VN: "Xlô-va-ki-a",
    HE: "סלובקיה",
  },
  gb: {
    id: "gb",
    currency: "lib",
    continent: "euro",
    AR: "المملكة المتحدة",
    BG: "Обединено кралство",
    BR: "Reino Unido",
    CA: "Regne Unit",
    CN: "英国",
    CS: "Velká Británie",
    DA: "Storbritannien",
    DE: "Vereinigtes Königreich",
    EL: "Ηνωμένο Βασίλειο",
    EN: "United Kingdom",
    ES: "Reino Unido",
    FI: "Britannia",
    FR: "Royaume-Uni",
    HR: "Velika Britanija",
    HU: "Egyesült Királyság",
    ID: "Inggris Raya",
    IE: "United Kingdom",
    IS: "Bretland",
    IT: "Regno Unito",
    JA: "イギリス",
    KO: "영국",
    LT: "Didžioji Britanija",
    MX: "Reino Unido",
    NL: "Verenigd Koninkrijk",
    NO: "Storbritannia",
    NZ: "United Kingdom",
    PL: "Wielka Brytania",
    PT: "Reino Unido",
    RO: "Marea Britanie",
    RU: "Великобритания",
    SK: "Spojené kráľovstvo",
    SR: "Velika Britanija",
    SV: "Storbritannien",
    TH: "สหราชอาณาจักร",
    TR: "Birleşik Krallık",
    TW: "英国",
    UK: "Великобританія",
    VN: "Vương quốc Anh",
    HE: "בריטניה",
  },
  th: {
    id: "th",
    currency: "thb",
    continent: "asia",
    AR: "تايلند",
    BG: "Тайланд",
    BR: "Tailândia",
    CA: "Tailàndia",
    CN: "泰国",
    CS: "Thajsko",
    DA: "Thailand",
    DE: "Thailand",
    EL: "Ταϊλάνδη",
    EN: "Thailand",
    ES: "Tailandia",
    FI: "Thaimaa",
    FR: "Thaïlande",
    HR: "Tajland",
    HU: "Thaiföld",
    ID: "Thailand",
    IE: "Thailand",
    IS: "Taíland",
    IT: "Tailandia",
    JA: "タイ",
    KO: "태국",
    LT: "Tailandas",
    MX: "Tailandia",
    NL: "Thailand",
    NO: "Thailand",
    NZ: "Thailand",
    PL: "Tajlandia",
    PT: "Tailândia",
    RO: "Thailanda",
    RU: "Таиланд",
    SK: "Thajsko",
    SR: "Tajland",
    SV: "Thailand",
    TH: "ไทย",
    TR: "Tayland",
    TW: "泰国",
    UK: "Таїланд",
    VN: "Thái Lan",
    HE: "תאילנד",
  },
  ru: {
    id: "ru",
    currency: "rub",
    continent: ["euro", "asia"],
    AR: "روسيا",
    BG: "Руска федерация",
    BR: "Rússia",
    CA: "Rússia",
    CN: "俄罗斯",
    CS: "Rusko",
    DA: "Rusland",
    DE: "Russische Föderation",
    EL: "Ρωσία",
    EN: "Russia",
    ES: "Rusia",
    FI: "Venäjä",
    FR: "Russie",
    HR: "Rusija",
    HU: "Oroszország",
    ID: "Rusia",
    IE: "Russia",
    IS: "Rússland",
    IT: "Federazione Russa",
    JA: "ロシア",
    KO: "러시아",
    LT: "Rusijos Federacija",
    MX: "Rusia",
    NL: "Rusland",
    NO: "Russland",
    NZ: "Russia",
    PL: "Rosja",
    PT: "Rússia",
    RO: "Rusia",
    RU: "Россия",
    SK: "Ruská federácia",
    SR: "Rusija",
    SV: "Ryssland",
    TH: "รัสเซีย",
    TR: "Rusya Federasyonu",
    TW: "俄罗斯",
    UK: "Росія",
    VN: "Nga",
    HE: "רוסיה",
  },
};

describe("#countries", () => {
  test("get continents", () => {
    const res = fns.getContinents(input);

    expect(res).toEqual({
      euro: ["gb", "ru", "sk"],
      asia: ["ru", "th"],
    });
  });
});
