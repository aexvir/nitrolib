// @flow
import styled, { css } from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import mq from "../../../styles/mq";

type ActiveProps = {|
  ...ThemeProps,
  active: boolean,
  inverted?: boolean,
  act: boolean,
|};

const IconWrapper = styled.i`
  color: ${({ theme, inverted, act }: ActiveProps) =>
    inverted && (!act ? theme.orbit.paletteWhite : theme.orbit.paletteInkNormal)};
  display: none;
  cursor: pointer;
  ${({ act }) =>
    act &&
    css`
      color: ${({ theme, inverted }: ActiveProps) =>
        inverted ? theme.orbit.paletteWhite : theme.orbit.paletteProductNormal};
      svg:nth-child(2) {
        transform: rotate(180deg);
      }
    `};
  ${mq.mobile(css`
    display: block;
  `)};
`;

IconWrapper.defaultProps = {
  theme: themeDefault,
};

export default IconWrapper;
