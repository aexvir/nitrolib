// @flow strict
import React from "react";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import { logo } from "../../styles";
import type { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import SvgLogo from "./SvgLogo";
import mq from "../../styles/mq";

const PoweredByKiwi = styled.span`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  position: relative;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  margin-${left}: 10px;
  padding-${left}: 10px;
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  &:before {
    content: "";
    top: 0;
    bottom: 0;
    ${left}: 0;
    margin: auto;
    position: absolute;
    width: 2px;
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLighter};
    height: 30px;
  }

  ${mq.ltTablet(css`
    font-size: 10px;
    font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightNormal};;
    margin-${left}: 7px;
    padding-${left}: 7px;
  `)};
`;

PoweredByKiwi.defaultProps = {
  theme: themeDefault,
};

const LogoLinkStyled = styled.a`
  display: flex;
`;

const LogoStyled = styled.img`
  max-height: 35px;
  max-width: 140px;
  align-self: center;
  ${mq.ltTablet(css`
    display: none;
  `)};
`;

const LogoStyledMobile = styled.img`
  display: none;
  max-height: 40px;
  max-width: 40px;
  align-self: center;

  ${mq.ltTablet(css`
    display: block;
  `)};
`;

const Link = styled.a`
  display: flex;
`;

const logoBaseUrl = "https://images.kiwi.com/whitelabels";

type Props = {|
  id: string,
  languageId: string,
  redirectUrl: string,
  title: string,
  poweredByKiwi: boolean,
  inverted?: boolean,
  onClick: (ev: SyntheticMouseEvent<HTMLAnchorElement>) => void,
|};

export const Logo = ({
  id,
  redirectUrl,
  title,
  poweredByKiwi,
  languageId,
  inverted,
  onClick,
}: Props) =>
  id === "kiwicom" ? (
    <Link href={`${redirectUrl}${languageId}/`} onClick={onClick} data-test="NavbarLogoLink">
      <SvgLogo height={logo.height} width={logo.width} title={title} inverted={inverted} />
    </Link>
  ) : (
    <>
      <LogoLinkStyled
        href={`${redirectUrl}${languageId}/`}
        onClick={onClick}
        data-test="NavbarLogoLink"
      >
        <LogoStyled
          title={title}
          alt={title}
          srcSet={`${logoBaseUrl}/0x80/${id}.png?v=1 2x`}
          src={`${logoBaseUrl}/0x40/${id}.png?v=1`}
        />
        <LogoStyledMobile
          title={title}
          alt={title}
          srcSet={`${logoBaseUrl}/0x80/${id}-mobile.png?v=1 2x`}
          src={`${logoBaseUrl}/0x40/${id}-mobile.png?v=1`}
        />
      </LogoLinkStyled>
      {poweredByKiwi && (
        <PoweredByKiwi>
          Powered by <br /> Kiwi.com
        </PoweredByKiwi>
      )}
    </>
  );

export default Logo;
