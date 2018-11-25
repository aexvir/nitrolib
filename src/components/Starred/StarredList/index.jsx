// @flow
import * as React from "react";
import styled from "styled-components";

import { getSum, isMulti, itemIsValid } from "../helpers";
import StarredItinerary from "../StarredItinerary";
import type { StarredItem } from "../../../records/Starred";
import Text from "../../Translate";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type Props = {|
  trips: Array<StarredItem>,
  onRemove: (arg: number) => void,
  tripsCount: number,
  onSelectStarred: (item: StarredItem) => void,
|};

const NoFlights = styled.div`
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
`;

NoFlights.defaultProps = {
  theme: themeDefault,
};

const StarredList = ({ trips, onRemove, tripsCount, onSelectStarred }: Props) => {
  const tripList: React$Node =
    trips &&
    trips.map((trip, index) => {
      const { id, updatedAt, lastPrice, journey, priceUpdatedAt, form, createdAt } = trip;
      const { passengers } = form;
      return (
        <StarredItinerary
          key={id}
          passengerCount={getSum(passengers)}
          passengerMulty={isMulti(passengers)}
          isValid={itemIsValid(trip)}
          passengers={passengers}
          price={lastPrice}
          onSelectStarred={() => onSelectStarred(trip)}
          journey={journey}
          onRemove={() => onRemove(index)}
          created={createdAt}
          updated={updatedAt}
          priceUpdatedAt={priceUpdatedAt}
        />
      );
    });

  return tripsCount >= 1 ? (
    tripList
  ) : (
    <NoFlights>
      <Text t={__("starred.no_flights")} />
    </NoFlights>
  );
};

export default StarredList;
