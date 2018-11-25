// @flow strict
import * as React from "react";

export type Context = {|
  starredList: Array<any>,
  onAddStarred: () => void,
  onRemoveStarred: () => void,
  onClearStarred: () => void,
|};

const contextDefault: Context = {
  starredList: [],
  onAddStarred: () => {},
  onRemoveStarred: () => {},
  onClearStarred: () => {},
};

const context: React.Context<Context> = React.createContext(contextDefault);

export const { Consumer, Provider } = context;
