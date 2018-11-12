// @flow
import isAfter from "date-fns/isAfter"; // keys
import * as R from "ramda";

import type { StarredItem, PassengersCount } from "../../records/Starred";
import type { Journey } from "../../records/Journey";
import { TRANS_KEY_SINGLE, TRANS_KEY_MULTI } from "./consts";

export const getSum = (object: PassengersCount) =>
  Object.keys(object).reduce((previous, key) => previous + object[key], 0);

export const isMulti = (object: PassengersCount) =>
  Object.keys(object).filter(key => object[key] > 0).length > 1;

export const getTransKey = (object: PassengersCount) => {
  if (isMulti(object)) {
    return TRANS_KEY_MULTI;
  }

  const keyWithValue = Object.keys(object).find(key => object[key] > 0) || "adults";
  const source = TRANS_KEY_SINGLE[keyWithValue];

  return Object.keys(object).length > 1 ? source.many : source.one;
};

export const getPrice = (journey: Journey) => R.prop("default", journey.prices);

export const getBestPrice = (journey: Journey) => {
  const { providers } = journey;
  const prices = providers.map(trip => trip.price);

  if (R.isEmpty(providers)) {
    return getPrice(journey);
  }

  return prices.length > 1 ? Math.min(...prices) : prices[0];
};

export const itemIsValid = (item: StarredItem) =>
  isAfter(R.prop("utc", item.journey.trips[0].flights[0].departure.when), Date.now());
