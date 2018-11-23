// @flow
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import type { Environment } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import styled from "styled-components";

import Translate from "../../../../../Translate";
import TripHeader from "../TripHeader";
import TripList from "../TripList";
import TripContainer from "../../../../../TripsContainer";
import TripListBottom from "../TripListBottom";

type Props = {|
  onSelect: (bid: string) => void,
  // DI
  env: Environment,
|};

const StateContainer = styled.div`
  padding: 10px;
`;

const TripDataList = ({ env, onSelect }: Props) => (
  <QueryRenderer
    environment={env}
    query={graphql`
      query TripDataListQuery {
        customerBookings {
          ...TripHeader_list
          ...TripList_list
          ...TripListBottom_list
        }
      }
    `}
    variables={{}}
    render={res => {
      if (res.error) {
        return (
          <TripContainer positionMenuTablet={0} positionMenuDesktop={50}>
            <StateContainer>
              <Alert type="critical">{String(res.error)}</Alert>
            </StateContainer>
          </TripContainer>
        );
      }

      if (!res.props) {
        return (
          <TripContainer positionMenuTablet={0} positionMenuDesktop={50}>
            <StateContainer>
              <Translate t={__("common.loading")} />
            </StateContainer>
          </TripContainer>
        );
      }

      const { customerBookings } = res.props;
      if (!customerBookings) {
        return (
          <TripContainer positionMenuTablet={0} positionMenuDesktop={50}>
            <StateContainer>
              <Alert>
                <Translate t={__("account.no_trips")} />
              </Alert>
            </StateContainer>
          </TripContainer>
        );
      }

      return (
        <TripContainer
          header={<TripHeader list={customerBookings} />}
          footer={<TripListBottom list={customerBookings} />}
          positionMenuTablet={0}
          positionMenuDesktop={50}
        >
          <TripList list={customerBookings} onSelect={onSelect} />
        </TripContainer>
      );
    }}
  />
);

export default TripDataList;
