// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import FaBarcode from "react-icons/lib/fa/barcode";
import KwEmail from "@kiwicom/orbit-components/lib/icons/Email";

import InputText from "client/components/InputText";
import IconText from "client/components/IconText";
import Text from "client/components/Text";
import { Consumer as IntlConsumer } from "client/services/intl/context";
import IataPicker from "../../../../../../components/IataPicker";
import * as validators from "./services/validators";
import * as normalizers from "./services/normalizers";

const FieldWrap = styled.div`
  position: relative;
  margin: 15px 0;
`;

type Props = {||};

type Field<T> = {|
  value: T,
  error: string,
  validate: (value: T) => string,
  normalize: (value: T) => T,
|};

type State = {|
  fields: {|
    bid: Field<string>,
    email: Field<string>,
    iata: Field<string>,
    departure: Field<Date>,
  |},
|};

export default class MyBooking extends React.PureComponent<Props, State> {
  state = {
    fields: {
      bid: {
        value: "",
        error: __("forms.this_field_must_be_filled"),
        validate: validators.required,
        normalize: normalizers.numbers,
      },
      email: {
        value: "",
        error: __("forms.this_field_must_be_filled"),
        validate: validators.email,
        normalize: R.identity,
      },
      iata: {
        value: "",
        error: __("forms.enter_iata_code"),
        validate: validators.iata,
        normalize: R.identity,
      },
      departure: {
        value: new Date(),
        error: __("forms.enter_iata_code"),
        validate: validators.departure,
        normalize: R.identity,
      },
    },
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { id, value } = ev.target;
    const { fields } = this.state;

    const field = fields[id];
    if (!field) {
      return;
    }

    const val = field.normalize(value);
    this.setState(state => ({
      fields: R.assoc(
        id,
        R.merge(field, {
          value: val,
          error: field.validate(val),
        }),
        state.fields,
      ),
    }));
  };

  handleSelectIata = (value: string) => {
    const field = this.state.fields.iata;

    this.setState(state => ({
      fields: R.assoc(
        "iata",
        R.merge(field, {
          value,
          error: field.validate(value),
        }),
        state.fields,
      ),
    }));
  };

  render() {
    const { fields } = this.state;

    return (
      <IntlConsumer>
        {intl => (
          <>
            <FieldWrap>
              <InputText
                id="bid"
                value={fields.bid.value}
                onChange={this.handleChange}
                placeholder={intl.translate(__("common.booking_number_placeholder"))}
                label={
                  <IconText Icon={FaBarcode}>
                    <Text t={__("common.booking_number_colon")} />
                  </IconText>
                }
                error={intl.translate(fields.bid.error)}
              />
            </FieldWrap>
            <FieldWrap>
              <InputText
                id="email"
                value={fields.email.value}
                onChange={this.handleChange}
                placeholder={intl.translate(__("price_alert.web.email_placeholder"))}
                label={
                  <IconText Icon={KwEmail}>
                    <Text t={__("common.email_colon")} />
                  </IconText>
                }
                error={intl.translate(fields.email.error)}
                autoComplete="email"
              />
            </FieldWrap>
            <FieldWrap>
              <IataPicker
                id="iata"
                value={fields.iata.value}
                onSelect={this.handleSelectIata}
                error={intl.translate(fields.iata.error)}
              />
            </FieldWrap>
          </>
        )}
      </IntlConsumer>
    );
  }
}
