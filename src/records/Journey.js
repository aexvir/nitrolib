// @flow
import type { Transfer } from "./Transfers";
import type { Trip } from "./Trip";
import type { Flight } from "./Flight";

type SupportedJourneyHiddenTypes = "ONE_WAY_DIRECT" | "ONE_WAY_INDIRECT" | "RETURN_DIRECT" | null;

type JourneyProvider = {
  bookingUrl: null,
  code: string,
  name: string,
  price: number,
  source: string,
};

export type Journey = {
  bookingToken: ?string,
  hasHoldBagsAllowed: boolean,
  sources: string[],
  trips: Trip[],
  transfers: Transfer[],
  flights: Flight[],
  id: ?number,
  prices: { default: number },
  quality: ?string,
  debugColor: string,
  debugString: string,
  _original: ?Object,
  type: string,
  providers: JourneyProvider[],
  disabledBagsInMmb: boolean,
  hiddenFlightsType: SupportedJourneyHiddenTypes,
  getBestPrice: () => Array<Object>,
};
