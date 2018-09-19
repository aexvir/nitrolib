// @flow
import * as React from "react";

import Popup from "./primitives/Popup";
import Header from "./primitives/Header";
import Content from "./primitives/Content";

type Props = {|
  header?: React.Node,
  children: React.Node,
  padding?: boolean,
  width?: string,
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
|};

const TripContainer = ({
  header,
  children,
  padding,
  width,
  positionMenuTablet,
  positionMenuDesktop,
}: Props) => (
  <Popup
    positionMenuTablet={positionMenuTablet}
    positionMenuDesktop={positionMenuDesktop}
    width={width}
  >
    {header && <Header>{header}</Header>}
    <Content padding={padding}>{children}</Content>
  </Popup>
);

export default TripContainer;
