import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import ConditionalRender from '~/core/components/ConditionalRender';
import InputText from '~/core/components/InputText';
import Menu from '~/core/components/Menu';
import Suggestions from '~/core/components/Suggestions';
import Highlight from '~/core/components/Highlight';
import Button from '~/core/components/Button';

import { InputAutocompleteTabs } from './styles';
import useKeyboard from '~/core/hooks/useKeyboard';
import useActiveElement from '~/core/hooks/useActiveElement';

const Container = styled.div`
  position: relative;
`;

const SuggestionsMenu = styled(Menu)`
  z-index: 10;
  position: absolute;
  top: calc(100% + 0.25rem);
  width: 100%;
  color: ${({ theme }) => theme.palette.base.main};
`;

const defaultRender = (item, value) => <Highlight key={item} text={item} query={value} />;
const defaultFilter = (items, value) => items.filter(item => item.includes(value));

const InputAutocomplete = ({
  value,
  placeholder,
  items,
  filter,
  loadMore,
  prepend,
  append,
  invalid,
  disabled,
  children,
  onClear,
  onChange,
  onPick,
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(Object.keys(items)[0]);
  const [containerRef, isActiveElement] = useActiveElement(open);

  const close = () => setOpen(false);

  const currentItems = useMemo(() => (!value ? [] : items[activeTab]), [activeTab, items, value]);

  const filtered = useMemo(() => (filter ? filter(currentItems, value) : currentItems), [
    value,
    currentItems,
    filter,
  ]);

  useEffect(() => {
    if (disabled) return;

    if (value.length > 0) {
      setOpen(true);
    }
  }, [value, filtered]);

  // handling close on click outside
  useEffect(() => {
    !isActiveElement && close();
  }, [isActiveElement]);

  useKeyboard({
    Escape: close,
  });

  const onPickSuggestion = index => {
    onPick(filtered[index], activeTab);

    // we need to pass this to nextTick to avoid reopening
    // the menu due to code in useEffect
    setTimeout(() => setOpen(false), 0);
  };

  const LoadMoreButton = loadMore && (
    <Button fullWidth onClick={loadMore}>
      <FormattedMessage id="loadMore" />
    </Button>
  );

  const [render = defaultRender] = [].concat(children);

  return (
    <Container ref={containerRef}>
      <InputText
        value={value}
        invalid={invalid}
        disabled={disabled}
        prepend={prepend}
        append={append}
        onClear={onClear}
        onChange={onChange}
        placeholder={placeholder}
        onClick={() => setOpen(true)}
      />
      {open && (
        <SuggestionsMenu>
          <ConditionalRender condition={Object.keys(items).length > 1}>
            <InputAutocompleteTabs
              tabs={Object.keys(items)}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </ConditionalRender>
          <Suggestions items={filtered} append={LoadMoreButton} onPick={onPickSuggestion}>
            {item => render(item, value, activeTab)}
          </Suggestions>
        </SuggestionsMenu>
      )}
    </Container>
  );
};

InputAutocomplete.defaultProps = {
  items: [],
  filter: defaultFilter,
  invalid: false,
  disabled: false,
  onPick: () => {},
  placeholder: '',
};

InputAutocomplete.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  items: PropTypes.object,
  filter: PropTypes.func,
  loadMore: PropTypes.func,
  prepend: PropTypes.node,
  append: PropTypes.node,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.func,
  onClear: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onPick: PropTypes.func,
};

export default InputAutocomplete;
