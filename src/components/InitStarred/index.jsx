// @flow
import * as React from "react";

import { getItem } from "../../services/utils/store";
import type { StarredItem } from "../../records/Starred";
import data from "../Starred/data";

type State = {|
  starredList: Array<StarredItem>,
|};

type Args = {|
  starredList: Array<StarredItem>,
  onRemoveStarred: (arg: number) => void,
  onAddStarred: (arg: StarredItem) => void,
  onClearStarred: () => void,
|};

type Props = {|
  children: (args: Args) => React.Node,
|};

class StarredProvider extends React.Component<Props, State> {
  state = {
    starredList: [],
  };

  store = getItem("starred");

  componentDidMount() {
    // TODO: remove before implementation
    localStorage.setItem("starred", JSON.stringify(data));
    if (this.store) {
      this.setState({
        starredList: JSON.parse(this.store),
      });
    }
  }

  onAddStarred = (trip: StarredItem) => {
    const update = JSON.parse(this.store).concat(trip);
    this.setState({
      starredList: update,
    });
  };

  onClearStarred = () => {
    localStorage.removeItem("starred");
    this.setState({
      starredList: [],
    });
  };

  onRemoveStarred = (index: number) => {
    const { starredList } = this.state;
    const { store } = this;

    this.setState({
      starredList: starredList.filter((_, i) => i !== index),
    });

    const removeItem = store.slice(0, index - 1).concat(store.slice(index, store.length));
    localStorage.setItem("starred", JSON.stringify(removeItem));
  };

  render() {
    const { children } = this.props;
    const { starredList } = this.state;

    return children({
      starredList,
      onRemoveStarred: this.onRemoveStarred,
      onAddStarred: this.onAddStarred,
      onClearStarred: this.onClearStarred,
    });
  }
}

export default StarredProvider;
