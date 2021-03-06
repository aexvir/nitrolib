// @flow strict
import * as React from "react";
import styled from "styled-components";

import { getCode, getSymbol } from "../../../records/Currency";
import type { Currency } from "../../../records/Currency";
import Code from "./Code";
import Sign from "./Sign";
import type { ThemeProps } from "../../../records/Theme";
import { Consumer as InvertedConsumer } from "../../../services/inverted/context";

type InvertedProps = ThemeProps & {|
  inverted: boolean,
|};

const Separator = styled.span`
  margin: 0 3px;
`;

const Wrapper = styled.div`
  color: ${({ theme, inverted }: InvertedProps) =>
    inverted ? theme.orbit.paletteWhite : theme.orbit.paletteInkNormal};
  &:hover {
    color: ${({ theme, inverted }: InvertedProps) =>
      inverted ? theme.orbit.paletteWhiteHover : theme.orbit.paletteProductNormalHover};
  }
`;

type Props = {|
  current: Currency,
|};

const Current = ({ current }: Props) => (
  <InvertedConsumer>
    {({ inverted }) => (
      <Wrapper inverted={inverted}>
        <Code>{getCode(current.id)}</Code>
        <Separator>-</Separator>
        <Sign>{getSymbol(current.format)}</Sign>
      </Wrapper>
    )}
  </InvertedConsumer>
);

export default Current;
