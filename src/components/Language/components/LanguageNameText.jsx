// @flow strict
import styled from "styled-components";

import * as rtl from "../../../styles/rtl";
import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

const LanguageNameText = styled.span`
  margin-${rtl.left}: 10px;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

LanguageNameText.defaultProps = {
  theme: themeDefault,
};

export default LanguageNameText;
