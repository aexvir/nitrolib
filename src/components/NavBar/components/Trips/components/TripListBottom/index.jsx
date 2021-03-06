// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import ItemWrapper from "../../primitives/ItemWrapper";
import Translate from "../../../../../Translate";
import { Consumer as IntlConsumer } from "../../../../../../services/intl/context";
import ButtonLink from "../../../../primitives/ButtonLink";
import mq from "../../../../../../styles/mq";

type Props = {|
  children: React.Node,
|};

const TripsBottomWrapper = styled.div`
  display: flex;
  width: 180px;
  ${mq.ltMiddleMobile(css`
    width: 120px;
  `)};
`;

const TripListBottom = ({ children }: Props) => (
  <IntlConsumer>
    {intl => (
      <>
        <ItemWrapper>
          <TripsBottomWrapper>{children}</TripsBottomWrapper>
          <ButtonLink
            color="primary"
            marginLeft={25}
            y="center"
            bold
            href={`/${intl.language.id}/account#future`}
          >
            <Translate t={__("account.all_trips")} />
          </ButtonLink>
        </ItemWrapper>
      </>
    )}
  </IntlConsumer>
);

export default TripListBottom;
