import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import useKeyboard from '~/core/hooks/useKeyboard';
import { MenuItem } from '~/core/components/Menu';
import ConditionalRender from '~/core/components/ConditionalRender';
import { MenuList, Placeholder } from './styles';

const DefaultRenderer = (item) => <span>{item}</span>;

const Suggestions = ({ items, onPick = () => {}, append, children, maxHeight = '200px' }) => {
  const list = useRef(null);

  const [active, setActive] = useState(-1);
  const [render = DefaultRenderer] = [].concat(children);

  const onMouseEnter = (key) => () => setActive(key);

  const onMouseLeave = () => setActive(-1);

  const onClick = (key) => () => onPick(key);

  const prev = () => {
    const value = active > 0 ? active - 1 : items.length - 1;

    const { scrollTop, clientHeight: parentHeight } = list.current;
    const selected = list.current.childNodes[value];

    const { offsetTop: childTop, clientHeight: childHeight } = selected;

    if (childTop < scrollTop || childTop + childHeight > scrollTop + parentHeight) {
      list.current.scrollTo(0, childTop);
    }

    setActive(value);
  };

  const next = () => {
    const value = active < items.length - 1 ? active + 1 : 0;

    const { scrollTop, clientHeight: parentHeight } = list.current;
    const selected = list.current.childNodes[value];

    const { offsetTop: childTop, clientHeight: childHeight } = selected;

    if (childTop < scrollTop || childTop + childHeight > scrollTop + parentHeight) {
      list.current.scrollTo(0, childTop + childHeight - parentHeight);
    }

    setActive(value);
  };

  useKeyboard({
    ArrowUp: prev,
    ArrowDown: next,
    Escape: () => setActive(-1),
    Enter: () => onPick(active),
  });

  return (
    <ConditionalRender condition={!!items.length}>
      <MenuList ref={list} maxHeight={maxHeight} onMouseLeave={onMouseLeave}>
        {items.map((item, index) => (
          <MenuItem
            key={`#${index}`}
            hover={index === active}
            onClick={onClick(index)}
            onMouseEnter={onMouseEnter(index)}
          >
            {render(item)}
          </MenuItem>
        ))}
        {append && <MenuItem>{append}</MenuItem>}
      </MenuList>
      <Placeholder>
        <FormattedMessage id="placeholder.noResults" />
      </Placeholder>
    </ConditionalRender>
  );
};

Suggestions.propTypes = {
  items: PropTypes.array.isRequired,
  append: PropTypes.node,
  maxHeight: PropTypes.string,
  children: PropTypes.func,
  onPick: PropTypes.func,
};

Suggestions.defaultProps = {
  onPick: () => {},
};

export default Suggestions;
