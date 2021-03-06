// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { TripListUnwrapped as TripList } from "..";

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

describe("#TripList", () => {
  test("render", () => {
    const wrapper = shallow(<TripList list={list} onSelect={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });
});
