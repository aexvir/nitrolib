// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import { navbar } from "../../styles";
import mq from "../../styles/mq";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import type { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import Flex from "../../primitives/Flex";
import Language from "../Language";
import { Consumer as BrandConsumer } from "../../services/brand/context";
import { Provider as InvertedProvider } from "../../services/inverted/context";
import Help from "./components/Help";
import Menu from "./components/Menu";
import Logo from "./components/Logo";
import Currency from "../Currency";
import type { Modal } from "../../consts/modals";
import marginMixin from "./styles/marginMixin";
import Starred from "../Starred";

// TODO: replace z-index with Orbit token after refactoring all front-end indexes

type Inverted = ThemeProps & {|
  ...ThemeProps,
  inverted: boolean,
|};

const Container = styled(Flex)`
  width: 100%;
  position: relative;
  height: ${navbar.height}px;
  background-color: ${({ theme, inverted }: Inverted) =>
    inverted ? theme.orbit.paletteProductNormal : theme.orbit.paletteWhite};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  padding: 0 10px;
  box-sizing: border-box;
  z-index: 824;

  ${mq.gtTablet(css`
    position: fixed;
    top: 0;
    ${left}: 0;
  `)};
`;

Container.defaultProps = {
  theme: themeDefault,
};

const WrapperChild = styled.div`
  display: flex;
  align-items: center;
  ${marginMixin};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  chat: React.Node,
  subscription: React.Node,
  debug: React.Node,
  portal: string,
  onOpenFaq: ?() => void,
  onSetModal: (modal: Modal) => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
  onLogoClick: (ev: SyntheticMouseEvent<HTMLAnchorElement>) => void,
  // defaulted
  headerLinks: React.Node,
  debug: React.Node,
  inverted: boolean,
|};

const NavBar = ({
  headerLinks,
  chat,
  subscription,
  debug,
  portal,
  inverted,
  onOpenFaq,
  onSetModal,
  onSaveLanguage,
  onSelectTrip,
  onLogoClick,
}: Props) => (
  // $FlowExpected: TODO describe
  <React.StrictMode>
    <InvertedProvider value={{ inverted }}>
      <Container x="space-between" y="center" dataTest="Navbar" inverted={inverted}>
        <Flex y="center" x="flex-start">
          <Logo inverted={inverted} onClick={onLogoClick} />
          {headerLinks && (
            <BrandConsumer>{brand => brand.id === "kiwicom" && headerLinks}</BrandConsumer>
          )}
        </Flex>
        <Flex y="center">
          <Wrapper>
            <Desktop display="flex">
              <WrapperChild>
                <ButtonWrapper>
                  <WrapperChild>
                    <Language
                      positionMenuDesktop={270}
                      positionMenuTablet={5}
                      onChange={onSaveLanguage}
                      onSetModal={onSetModal}
                    />
                  </WrapperChild>
                  <WrapperChild>
                    <Currency
                      positionMenuDesktop={270}
                      positionMenuTablet={5}
                      onSetModal={onSetModal}
                    />
                  </WrapperChild>
                  <WrapperChild>
                    <Help onOpen={onOpenFaq} inverted={inverted} />
                  </WrapperChild>
                </ButtonWrapper>
              </WrapperChild>
            </Desktop>
            <WrapperChild>
              <Starred positionMenuDesktop={150} positionMenuTablet={0} />
            </WrapperChild>
            <Mobile>
              <WrapperChild>
                <Help onOpen={onOpenFaq} inverted={inverted} />
              </WrapperChild>
            </Mobile>
            <Menu
              chat={chat}
              subscription={subscription}
              debug={debug}
              onSetModal={onSetModal}
              onSaveLanguage={onSaveLanguage}
              onSelectTrip={onSelectTrip}
              inverted={inverted}
              portal={portal}
            />
          </Wrapper>
        </Flex>
      </Container>
    </InvertedProvider>
  </React.StrictMode>
);

NavBar.defaultProps = {
  headerLinks: null,
  debug: null,
  inverted: false,
};

export default NavBar;
