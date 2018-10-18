// @flow strict
import * as React from "react";
import styled from "styled-components";

import { padding } from "../../../../../../styles";
import { themeDefault } from "../../../../../../records/Theme";
import type { ThemeProps } from "../../../../../../records/Theme";
import { Consumer as BrandConsumer } from "../../../../../../services/brand/context";
import { Consumer as AuthConsumer } from "../../../../../../services/auth/context";
import SocialLogin from "./SocialLogin";
import Switch from "./Switch";
import MyBooking from "../MyBooking";
import Register from "../Register";
import SignIn from "../SignIn";

const Container = styled.div`
  padding: ${padding.page}px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
`;

Container.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  open: "myBooking" | "register" | "signIn",
  onOpenMyBooking: () => void,
  onOpenRegister: () => void,
  onCloseSuccess: () => void,
  onOpenSignIn: () => void,
  onOpenForgotPassword: () => void,
|};

class Login extends React.Component<Props> {
  componentDidMount() {
    this.handleCSS();
  }

  componentWillUnmount() {
    this.handleCSS();
  }

  handleCSS = () => {
    const mainview = document.querySelector(".MainView");
    return mainview && mainview.classList.toggle("MainView_nitro-modal");
  };

  render() {
    const {
      open,
      onOpenMyBooking,
      onCloseSuccess,
      onOpenRegister,
      onOpenSignIn,
      onOpenForgotPassword,
    } = this.props;
    return (
      <Container>
        <AuthConsumer>
          {auth => (
            <>
              <BrandConsumer>
                {brand =>
                  (brand.auth.social_facebook.enabled || brand.auth.social_google.enabled) && (
                    <SocialLogin
                      facebook={brand.auth.social_facebook.enabled}
                      google={brand.auth.social_google.enabled}
                      onSocialAuth={auth.onSocialAuth}
                    />
                  )
                }
              </BrandConsumer>
              <Switch
                open={open}
                onOpenMyBooking={onOpenMyBooking}
                onOpenRegister={onOpenRegister}
                onOpenSignIn={onOpenSignIn}
              />
              {open === "myBooking" && (
                <MyBooking
                  loading={auth.loading}
                  error={auth.error}
                  onMyBooking={auth.onMyBooking}
                  onCloseSuccess={onCloseSuccess}
                />
              )}
              {open === "register" && (
                <Register
                  loading={auth.loading}
                  error={auth.error}
                  onRegister={auth.onRegister}
                  onCloseSuccess={onCloseSuccess}
                />
              )}
              {open === "signIn" && (
                <SignIn
                  loading={auth.loading}
                  error={auth.error}
                  onSignIn={auth.onSignIn}
                  onCloseSuccess={onCloseSuccess}
                  onOpenForgotPassword={onOpenForgotPassword}
                />
              )}
            </>
          )}
        </AuthConsumer>
      </Container>
    );
  }
}

export default Login;
