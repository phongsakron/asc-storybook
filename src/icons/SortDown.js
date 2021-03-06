import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/pro-solid-svg-icons';

export default styled(FontAwesomeIcon).attrs({ icon: faSortDown })`
  font-size: ${({ height = 'inherit' }) => height};
`;
