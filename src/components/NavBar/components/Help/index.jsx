// @flow strict
import * as React from "react";
import querystring from "query-string";

import SideBar from "../SideBar";
import Text from "../../../Text";
import ClientOnly from "../../../ClientOnly";
import Button from "../../primitives/Button";

type Props = {|
  faq: React.Node,
|};

type State = {|
  shown: boolean,
|};

class Help extends React.Component<Props, State> {
  state = {
    shown: false,
  };

  handleToggle = () => {
    const { shown } = this.state;
    if (shown) {
      return;
    }

    const { pathname, search, hash } = window.location;
    const query = querystring.parse(search);

    if (!query.help) {
      window.location.assign(
        `${pathname}?${querystring.stringify({ ...query, help: "/" })}${hash}`,
      );
    }

    this.setState(state => ({ shown: !state.shown }));
  };

  handleClose = () => {
    this.setState({ shown: false });
  };

  render() {
    const { faq } = this.props;
    const { shown } = this.state;

    return (
      <>
        <Button onClick={this.handleToggle}>
          <Text t={__("common.help")} />
        </Button>
        <ClientOnly>
          <SideBar onClick={this.handleClose} shown={shown}>
            {faq}
          </SideBar>
        </ClientOnly>
      </>
    );
  }
}

export default Help;
