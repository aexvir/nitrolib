// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Language from "../index";

describe("#Language", () => {
  test("render", () => {
    const wrapper = shallow(<Language onChange={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render - native", () => {
    const wrapper = shallow(<Language onChange={jest.fn()} native />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render - flat", () => {
    const wrapper = shallow(<Language onChange={jest.fn()} flat />);

    expect(wrapper).toMatchSnapshot();
  });
});
