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

import useKeyboard from '~/core/hooks/useKeyboard';
import useActiveElement from '~/core/hooks/useActiveElement';
import Close from '~/icons/Close';
import { InputAutocompleteTabs } from './styles';

const Container = styled.div`
  max-height: 99vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SearchDiv = styled.div`
  flex: none;
  padding: 0.5rem;
`;

const SuggestionDiv = styled.div`
  flex: 1;
  overflow: auto;
  padding: 0.5rem;
`;

const SuggestionsMenu = styled(Menu)`
  width: 100%;
  color: ${({ theme }) => theme.palette.base.main};
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputTextStyled = styled(InputText)`
  flex: 1;
`;

const CloseButton = styled.div`
  margin-left: 0.5rem;
  cursor: pointer;
  background-color: #eee;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ddd;
  }
`;

const SuggestionsMenuStyled = styled(SuggestionsMenu)`
  max-height: -webkit-fill-available;
  overflow: auto;
`;

const defaultRender = (item, value) => <Highlight key={item} text={item} query={value} />;
const defaultFilter = (items, value) => items.filter((item) => item.includes(value));

const InputAutocomplete = ({
  value,
  setValue,
  placeholder,
  items,
  filter,
  getPagination,
  prepend,
  append,
  invalid,
  disabled,
  children,
  onClear,
  onChange,
  onPick,
  onClose,
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(Object.keys(items)[0]);
  const [containerRef, isActiveElement] = useActiveElement(open);

  const close = () => setOpen(false);

  const currentItems = useMemo(() => (!value ? [] : items[activeTab]), [activeTab, items, value]);

  const filtered = useMemo(
    () => (filter ? filter(currentItems, value) : currentItems),
    [value, currentItems, filter],
  );

  useEffect(() => {
    if (disabled) return;

    if (value.length > 0) {
      setOpen(true);
    }
  }, [value, filtered, disabled]);

  // handling close on click outside
  useEffect(() => {
    !isActiveElement && close();
  }, [isActiveElement]);

  useKeyboard({
    Escape: close,
  });

  const onPickSuggestion = (index) => {
    onPick(filtered[index], activeTab);

    // we need to pass this to nextTick to avoid reopening
    // the menu due to code in useEffect
    setTimeout(() => {
      setOpen(false);
      // reset value
      setValue('');
    }, 0);
  };

  const loadMore = getPagination(activeTab);

  const LoadMoreButton = loadMore && (
    <Button fullWidth onClick={loadMore}>
      <FormattedMessage id="loadMore" />
    </Button>
  );

  const [render = defaultRender] = [].concat(children);

  return (
    <Container ref={containerRef}>
      <SearchDiv>
        <FlexRow>
          <InputTextStyled
            value={value}
            invalid={invalid}
            disabled={disabled}
            prepend={prepend}
            append={append}
            placeholder={placeholder}
            onClear={onClear}
            onChange={onChange}
          />
          <CloseButton onClick={onClose}>
            <Close />
          </CloseButton>
        </FlexRow>
      </SearchDiv>
      <SuggestionDiv>
        <SuggestionsMenuStyled>
          <ConditionalRender condition={Object.keys(items).length > 1}>
            <InputAutocompleteTabs
              tabs={Object.keys(items).map((key) => ({
                value: key,
                label: key,
              }))}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </ConditionalRender>
          <Suggestions
            items={filtered}
            append={LoadMoreButton}
            maxHeight="inherit"
            onPick={onPickSuggestion}
          >
            {(item) => render(item, value, activeTab)}
          </Suggestions>
        </SuggestionsMenuStyled>
      </SuggestionDiv>
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
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  items: PropTypes.object,
  filter: PropTypes.func,
  getPagination: PropTypes.func,
  prepend: PropTypes.node,
  append: PropTypes.node,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.func,
  onClear: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onPick: PropTypes.func,
  onClose: PropTypes.func,
};

export default InputAutocomplete;
