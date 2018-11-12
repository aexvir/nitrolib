// @flow

export type LocationNearby = {|
  id: string,
  duration: number,
  distance: number,
|};

export type City = { id: string, name: string };
export type Place = {|
  id: string,
  value: string,
  slug: string,
  lat: ?number,
  lng: ?number,
  type: number,
  flagParentId: ?string,
  parentIds: Array<string>,
  population: number,
  rank: number,
  city: ?City,
  code: string,
  name: ?string,
  numberOfAirports: number,
  countryName: ?string,
  continent: ?string,
  locationsNearby: ?Array<LocationNearby>,
  tags: ?Array<{ tag: string }>,
  neighbours: ?Array<string>,
|};
