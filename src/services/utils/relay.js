// @flow strict
import { Environment, Network, RecordSource, Store } from "relay-runtime";

export type Input = {
  query: string,
  variables: { [key: string]: string },
};

export type Call = (input: Input) => Promise<any>;

const makeFetchQuery = (call: Call) => (operation, variables) =>
  call({
    query: operation.text,
    variables,
  });

const store = new Store(new RecordSource());

export const makeCall = (token: string) => (input: Input) =>
  fetch("https://graphql.kiwi.com", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify(input),
  }).then(res => res.json());

export const makeEnvironment = (call: Call) =>
  new Environment({
    network: Network.create(makeFetchQuery(call)),
    store,
  });
