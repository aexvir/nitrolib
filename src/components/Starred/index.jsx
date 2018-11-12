// @flow strict
import * as React from "react";
import StarIcon from "@kiwicom/orbit-components/lib/icons/StarFull";

import type { StarredItem } from "../../records/Starred";
import Button from "../NavBar/primitives/Button";
import Toggle from "../Toggle";
import ClickOutside from "../ClickOutside";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import Translate from "../Translate";
import TripsContainer from "../TripsContainer";
import { getItem } from "../../services/storage/storage";
import StarredHeader from "./StarredHeader";
import StarredList from "./StarredList";
import StarredFooter from "./StarredFooter";
// import data from "./data";
import { MAX_TRIPS } from "./consts";

type Props = {|
  onSaveTrip: () => void,
  onRemoveTrip: number => void,
  positionMenuDesktop?: number,
  positionMenuTablet?: number,
|};

type State = {|
  starred: Array<StarredItem>,
|};

class Starred extends React.Component<Props, State> {
  state = {
    starred: [],
  };

  componentDidMount() {
    // TODO: remove after implementation
    // localStorage.setItem("starred", JSON.stringify(data));
    const store = getItem("starred");
    if (store) {
      const Items = JSON.parse(store);
      this.setState({
        starred: Items,
      });
    }
  }

  clearStore = () => {
    localStorage.removeItem("starred");
    this.setState({
      starred: [],
    });
  };

  removeTrip = (index: number) => {
    const { starred } = this.state;
    const store = getItem("starred");

    this.setState({
      starred: starred.filter((_, i) => i !== index),
    });

    const removeItem = store.slice(0, index - 1).concat(store.slice(index, store.length));
    localStorage.setItem("starred", JSON.stringify(removeItem));
  };

  render() {
    const { onSaveTrip, positionMenuDesktop, positionMenuTablet } = this.props;
    const { starred } = this.state;
    const starredList = starred.slice(0, MAX_TRIPS);
    const starredCount = starredList.length;
    const starredFooter = starredCount >= 1 && <StarredFooter tripsCount={starredCount} />;
    return (
      <Toggle>
        {({ open, onToggle }) => (
          <>
            {open && (
              <ClickOutside onClickOutside={onToggle}>
                <TripsContainer
                  header={
                    <StarredHeader onClearStorage={this.clearStore} tripsCount={starredCount} />
                  }
                  footer={starredFooter}
                  positionMenuTablet={positionMenuTablet}
                  positionMenuDesktop={positionMenuDesktop}
                >
                  <StarredList
                    onRemove={this.removeTrip}
                    trips={starredList}
                    tripsCount={starredCount}
                    onSave={onSaveTrip}
                  />
                </TripsContainer>
              </ClickOutside>
            )}
            <Desktop>
              <Button onClick={onToggle} color="secondary">
                <Translate t={__("starred.starred")} />
              </Button>
            </Desktop>
            <Mobile>
              <Button onClick={onToggle} color="secondary">
                <StarIcon color="primary" />
              </Button>
            </Mobile>
          </>
        )}
      </Toggle>
    );
  }
}

export default Starred;
