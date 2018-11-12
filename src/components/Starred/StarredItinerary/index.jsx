// @flow
import * as React from "react";
import styled, { css } from "styled-components";
import Star from "@kiwicom/orbit-components/lib/icons/StarFull";
import Share from "@kiwicom/orbit-components/lib/icons/Share";

import TimeInWords from "../../DistanceInWords";
import Price from "../../Price";
import Time from "../../Time";
import Translate from "../../Translate";
import TranslateNode from "../../TranslateNode";
import StarredSegment from "../StarredTripSegment";
import mq from "../../../styles/mq";
import { getTransKey, getBestPrice } from "../helpers";
import type { ThemeProps } from "../../../records/Theme";
import type { Journey } from "../../../records/Journey";
import type { PassengersCount } from "../../../records/Starred";
import { themeDefault } from "../../../records/Theme";
import { PASSENGERS_COUNT } from "../consts";

type Props = {|
  updated: Date,
  journey: Journey,
  passengerCount: number,
  passengers: PassengersCount,
  passengerMulty: boolean,
  price: number,
  onRemove: () => void,
  priceUpdatedAt: Date,
  isValid: boolean,
  created: string,
|};

const Added = styled.div`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLight};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
`;

Added.defaultProps = {
  theme: themeDefault,
};

const Info = styled.div`
  display: flex;
  min-width: 80px;
  width: 80px;
  margin-right: 5px;
  flex-direction: column;
  ${mq.ltBigMobile(css`
    margin-top: 10px;
  `)};
`;

const FlightPrice = styled.div`
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightBold};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextLarge};
`;

FlightPrice.defaultProps = {
  theme: themeDefault,
};

const PriceInfo = styled.div`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLight};
  text-transform: lowercase;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  line-height: 22px;
  max-width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

PriceInfo.defaultProps = {
  theme: themeDefault,
};

const Wrapper = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: rgb(232, 237, 241) 0px -1px inset;
  background: ${({ theme }) => theme.orbit.paletteWhite};
  &:hover {
    background: ${({ theme }) => theme.orbit.paletteWhiteHover};
  }
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

const Flights = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const WrapperInner = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
  ${mq.ltBigMobile(css`
    flex-direction: column-reverse;
    align-items: flex-start;
  `)};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 55px;
  margin-top: 5px;
`;

const RemoveButton = styled.div``;

const ShareIcon = styled(Share)`
  &:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLight};
  }
`;

ShareIcon.defaultProps = {
  theme: themeDefault,
};

const StarredItinerary = ({
  updated,
  journey,
  price,
  onRemove,
  isValid,
  created,
  passengers,
  priceUpdatedAt,
  passengerCount,
  passengerMulty,
}: Props) => {
  const lastUpdate = <Time time={updated} />;
  const getPriceUpdated = () => {
    if (!isValid) {
      return (
        <div>
          <Translate t={__("starred.flight_not_available")} />
          <RemoveButton onClick={onRemove}>
            <Translate t={__("starred.remove_starred")} />
          </RemoveButton>
        </div>
      );
    }
    if (price !== getBestPrice(journey)) {
      return (
        <Translate
          t={__("starred.price_update_changed")}
          values={{
            priceUpdatedAt,
            origPrice: price,
          }}
        />
      );
    }
    return priceUpdatedAt ? (
      <TranslateNode t={__("starred.price-update")} values={{ lastUpdate }} />
    ) : (
      <TranslateNode
        t={__("starred.created_at")}
        values={{ createdAt: <TimeInWords time={created} /> }}
      />
    );
  };

  return (
    <Wrapper>
      <Added>{getPriceUpdated()}</Added>
      <WrapperInner>
        <Info>
          <FlightPrice>
            <Price value={getBestPrice(journey)} />
          </FlightPrice>
          <PriceInfo>
            {passengerCount > 1 &&
              (passengerMulty ? (
                <Translate t={__("result.total_price")} />
              ) : (
                <TranslateNode
                  t={PASSENGERS_COUNT[getTransKey(passengers)]}
                  values={{ count: passengerCount }}
                />
              ))}
          </PriceInfo>
          <ActionButtons>
            <RemoveButton onClick={onRemove}>
              <Star color="warning" />
            </RemoveButton>
            <ShareIcon color="tertiary" />
          </ActionButtons>
        </Info>
        <Flights>
          {journey.trips.map(trip => {
            const { flights } = trip;
            const getDeparture = flights[0].departure;
            const getArrival = flights[flights.length - 1].arrival;
            return (
              <StarredSegment
                key={trip.flights[0].id}
                departure={getDeparture}
                arrival={getArrival}
              />
            );
          })}
        </Flights>
      </WrapperInner>
    </Wrapper>
  );
};

export default StarredItinerary;
