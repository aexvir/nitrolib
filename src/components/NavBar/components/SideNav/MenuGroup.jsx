// @flow strict
import * as React from "react";
import styled from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

type Props = {
  text?: React.Node,
  children: React.Node,
};

const Menu = styled.div`
  padding-${left}: 35px;
`;

Menu.defaultProps = {
  theme: themeDefault,
};

const Title = styled.span`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  text-transform: uppercase;
  line-height: 16px;
`;

Title.defaultProps = {
  theme: themeDefault,
};

const MenuGroup = ({ text, children }: Props) => (
  <Menu itemScope itemType="http://www.schema.org/SiteNavigationElement">
    {text && <Title>{text}</Title>}
    {children}
  </Menu>
);

export default MenuGroup;
