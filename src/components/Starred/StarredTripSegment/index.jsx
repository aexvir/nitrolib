// @flow
import * as React from "react";
import styled from "styled-components";
import FlightDirect from "@kiwicom/orbit-components/lib/icons/FlightDirect";

import type { DepartureArrival } from "../../../records/Flight";
import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";
import Flex from "../../../primitives/Flex";
import Day from "../../Day";
import Duration from "../../Duration";

type Props = {|
  departure: DepartureArrival,
  arrival: DepartureArrival,
|};

const Wrapper = styled.div`
  margin: 5px 0 5px 0;
  position: relative;
`;

const TripDate = styled.div`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLight};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  padding-top: 5px;
`;

TripDate.defaultProps = {
  theme: themeDefault,
};

const DurationWrapper = styled.div`
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
`;

DurationWrapper.defaultProps = {
  theme: themeDefault,
};

const Destination = styled.div`
  display: flex;
  align-items: center;
  height: 16px;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
`;

Destination.defaultProps = {
  theme: themeDefault,
};

const Flight = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-right: 10px;
  white-space: nowrap;
`;

const FlightandCode = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const FlightTime = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLight};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  white-space: nowrap;
  padding-top: 5px;
`;

const LongText = styled.div`
  position: absolute;
  top: -16px;
  left: 0;
  right: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WrapperTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 80px;
`;

FlightTime.defaultProps = {
  theme: themeDefault,
};

const StarredTripSegment = ({ departure, arrival }: Props) => (
  <Wrapper>
    <Flex x="space-between" y="center">
      <Flight>
        <LongText>
          <Destination>
            <FlightandCode>
              {departure.where.name} ({departure.where.code})
            </FlightandCode>
            <FlightDirect />
            <FlightandCode>
              {arrival.where.name} ({arrival.where.code})
            </FlightandCode>
          </Destination>
          <TripDate>
            <Day date={departure.when.local} />
          </TripDate>
        </LongText>
      </Flight>
      <WrapperTime>
        <DurationWrapper>
          <Duration timeFrom={departure.when.local} timeTo={arrival.when.local} format="HH:mm" />
        </DurationWrapper>
        <FlightTime>
          <Day date={departure.when.local} format="HH:mm" />
          {" - "}
          <Day date={arrival.when.local} format="HH:mm" />
        </FlightTime>
      </WrapperTime>
    </Flex>
  </Wrapper>
);

export default StarredTripSegment;
