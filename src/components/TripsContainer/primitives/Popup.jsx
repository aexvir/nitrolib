// @flow
import styled, { css } from "styled-components";
import { right } from "@kiwicom/orbit-components/lib/utils/rtl";

import mq from "../../../styles/mq";
import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

type Width = {|
  width: string,
  positionMenuTablet: number,
  positionMenuDesktop: number,
|};

const Popup = styled.div`
  position: absolute;
  top: 50px;
  min-width: ${({ width }: Width) => width || `550px`};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudLight};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  cursor: default;
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowElevatedLevel1};

  ${mq.gtDesktop(css`
    ${right}: ${({ positionMenuDesktop }) => `${positionMenuDesktop}px`};
  `)};

  ${mq.tablet(css`
    ${right}: ${({ positionMenuTablet }) => `${positionMenuTablet}px`};
  `)};

  ${mq.mobile(css`
    ${right}: 0;
    left: 0;
    font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
    min-width: 100%;
  `)};
`;

Popup.defaultProps = {
  theme: themeDefault,
};

export default Popup;
