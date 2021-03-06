// @flow strict
import * as React from "react";
import styled from "styled-components";

import { padding } from "../../../../styles";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import { Consumer as AuthConsumer } from "../../../../services/auth/context";
import * as MODALS from "../../../../consts/modals";
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
  open: "myBooking" | "signIn" | "register",
  onOpenMyBooking: () => void,
  onOpenRegister: () => void,
  onCloseSuccess: () => void,
  onOpenSignIn: () => void,
  onOpenForgotPassword: () => void,
|};

const Login = ({
  open,
  onOpenMyBooking,
  onCloseSuccess,
  onOpenRegister,
  onOpenSignIn,
  onOpenForgotPassword,
}: Props) => (
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
          {open === MODALS.MY_BOOKING && (
            <MyBooking
              loading={auth.loading}
              onMyBooking={auth.onMyBooking}
              onCloseSuccess={onCloseSuccess}
            />
          )}
          {open === MODALS.REGISTER && (
            <Register
              loading={auth.loading}
              onRegister={auth.onRegister}
              onCloseSuccess={onCloseSuccess}
            />
          )}
          {open === MODALS.SIGN_IN && (
            <SignIn
              loading={auth.loading}
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

export default Login;
