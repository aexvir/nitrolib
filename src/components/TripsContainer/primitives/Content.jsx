// @flow
import styled from "styled-components";

type Padding = {|
  padding?: boolean,
|};

const Content = styled.div`
  max-height: calc(100vh - 140px);
  padding: ${({ padding }: Padding) => (padding ? `12px` : `0`)};
  overflow-y: auto;
  overflow-x: hidden;
`;

export default Content;
