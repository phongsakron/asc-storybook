// import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll } from '@fortawesome/pro-light-svg-icons';

export default styled(FontAwesomeIcon).attrs({ icon: faPoll })`
  font-size: ${({ height = 'inherit' }) => height};
`;
