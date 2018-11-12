// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import { createFragmentContainer, graphql } from "react-relay";

import ItemWrapper from "../../primitives/ItemWrapper";
import Translate from "../../../../../Translate";
import { Consumer as IntlConsumer } from "../../../../../../services/intl/context";
import ButtonLink from "../../../../primitives/ButtonLink";
import mq from "../../../../../../styles/mq";
import BottomTripItem from "../BottomTripItem";
import type { TripListBottom_list } from "./__generated__/TripListBottom_list.graphql";

type Props = {|
  list: TripListBottom_list,
|};

const TripsBottomWrapper = styled.div`
  display: flex;
  width: 180px;
  ${mq.ltMiddleMobile(css`
    width: 120px;
  `)};
`;

const ListWrapper = styled.div`
  width: 100%;
`;

const TripListBottom = ({ list }: Props) => {
  const trips = list.edges && list.edges.map(edge => edge && edge.node).filter(Boolean);
  const upcoming = trips && trips.filter(trip => trip && !trip.isPastBooking);
  const futureTrips = upcoming && upcoming.slice(2, 6);
  return (
    <IntlConsumer>
      {intl => (
        <ListWrapper>
          <ItemWrapper>
            <TripsBottomWrapper>
              {futureTrips &&
                futureTrips.map(item => (
                  <BottomTripItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.destinationImageUrl || ""}
                    lang={intl.language.id}
                  />
                ))}
            </TripsBottomWrapper>
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
        </ListWrapper>
      )}
    </IntlConsumer>
  );
};

export const TripListBottomUnwrapped = TripListBottom;

export default createFragmentContainer(
  TripListBottom,
  graphql`
    fragment TripListBottom_list on BookingInterfaceConnection {
      edges {
        node {
          __typename
          isPastBooking
          id
          destinationImageUrl
        }
      }
    }
  `,
);
