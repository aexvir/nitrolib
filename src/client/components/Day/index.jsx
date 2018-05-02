// @flow strict
import * as React from "react";
import format from "date-fns/format"; /* flowlint-line nonstrict-import:off */

import { Consumer } from "client/services/intl/context";

type Props = {
  date: Date,
  format: string,
};

const Day = (props: Props) => (
  <Consumer>{intl => format(props.date, props.format || intl.language.dateFormat)}</Consumer>
);

Day.defaultProps = {
  format: "",
};

export default Day;
