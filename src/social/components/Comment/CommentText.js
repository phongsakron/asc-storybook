import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Truncate from 'react-truncate-markup';
import { findChunks } from '~/helpers/utils';
import Linkify from '~/core/components/Linkify';
import { CommentContent, ReadMoreButton, Highlighted } from './styles';

const COMMENT_MAX_LINES = 8;

const CommentText = ({ text, className, mentionees, maxLines = COMMENT_MAX_LINES }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expand = () => setIsExpanded(true);
  const createTextWithHighlightMention = () => {
    const view = [];
    if (!mentionees || mentionees.length === 0) {
      return text;
    }
    const splitTextIndex = findChunks(mentionees);

    for (let i = 0; i < splitTextIndex.length; i += 1) {
      const { start, end } = splitTextIndex[i];
      if (i === 0 && start !== 0) {
        view.push(text.slice(0, start));
      }
      if (i > 0) {
        const prevEnd = splitTextIndex[i - 1].end;
        view.push(text.slice(prevEnd, start));
      }
      // add mention here
      view.push(<Highlighted>{text.slice(start, end)}</Highlighted>);
      if (i === splitTextIndex.length - 1) {
        view.push(text.slice(end, text.length));
      }
    }
    return view;
  };

  const textContent = text && (
    <CommentContent className={className}>
      <Truncate.Atom>{createTextWithHighlightMention()}</Truncate.Atom>
    </CommentContent>
  );

  return (
    <Linkify>
      {isExpanded
        ? { textContent }
        : text && (
            <Truncate
              lines={maxLines}
              ellipsis={
                <ReadMoreButton onClick={expand}>
                  <FormattedMessage id="comment.readmore" />
                </ReadMoreButton>
              }
            >
              {textContent}
            </Truncate>
          )}
    </Linkify>
  );
};

export default CommentText;
