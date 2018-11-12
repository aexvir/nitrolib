// @flow
import type { Journey } from "./Journey";

export type CabinClass = "economy" | "business" | "first" | "premium";

export type PassengersCount = {|
  adults: number,
  children: number,
  infants: number,
|};

export type StarredFormData = {|
  origin: string,
  destination: string,
  outboundDate: string,
  inboundDate: string,
  multicity: string,
  salesman: string,
  passengers: PassengersCount,
  cabinClass: CabinClass,
  filters: any,
  lang: string,
  places: Array<{ id: string, slug: string }>,
  returnUrl: string,
  starType: string,
|};

export type StarredItem = {|
  id: string,
  form: StarredFormData,
  lastPrice: number,
  journey: Journey,
  priceUpdatedAt: ?Date,
  createdAt: Date,
  updatedAt: Date,
|};
