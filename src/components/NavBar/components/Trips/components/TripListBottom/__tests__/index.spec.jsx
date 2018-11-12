// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { TripListBottomUnwrapped as TripListBottom } from "..";

const list: any = {
  edges: [
    {
      node: {
        __id: "id",
        __typename: "typename",
        destinationImageUrl: "url",
      },
    },
  ],
};

describe("#TripListBottom", () => {
  test("render", () => {
    const wrapper = shallow(<TripListBottom list={list} />);

    expect(wrapper).toMatchSnapshot();
  });
});
