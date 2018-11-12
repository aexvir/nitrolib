// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import addHours from "date-fns/addHours";

import DistanceInWords from "..";

describe("#DistanceInWords", () => {
  test("#formatDistance", () => {
    const time = addHours(Date.now(), 10);
    const wrapper = shallow(<DistanceInWords time={time} />);

    expect(wrapper).toMatchSnapshot();
  });
});
