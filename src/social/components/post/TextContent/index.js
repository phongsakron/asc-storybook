import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Truncate from 'react-truncate-markup';

import customizableComponent from '~/core/hocs/customization';
import Linkify from '~/core/components/Linkify';
import Button from '~/core/components/Button';
import UrlPreview from '~/core/components/UrlPreview';
import { findChunks } from '~/helpers/utils';

export const PostContent = styled.div`
  overflow-wrap: break-word;
  color: ${({ theme }) => theme.palette.neutral.main};
  white-space: pre-wrap;
  ${({ theme }) => theme.typography.body}
`;

export const ReadMoreButton = styled(Button).attrs({ variant: 'secondary' })`
  color: ${({ theme }) => theme.palette.primary.main};
  padding: 4px;
  display: inline-block;
`;

export const Highlighted = styled.span`
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const UrlPreviewContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
export const UrlPreviewStyled = styled(UrlPreview)``;

const TextContent = ({ text, postMaxLines, mentionees, urlPreview }) => {
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
    <PostContent>
      <Truncate.Atom>{createTextWithHighlightMention()}</Truncate.Atom>
    </PostContent>
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const onExpand = () => setIsExpanded(true);

  const showUrlPreview = !!urlPreview && urlPreview.hostname;

  return (
    textContent && (
      <div>
        <Linkify>
          {isExpanded ? (
            textContent
          ) : (
            <Truncate.Atom
              lines={postMaxLines}
              ellipsis={
                <ReadMoreButton onClick={onExpand}>
                  <FormattedMessage id="post.readMore" />
                </ReadMoreButton>
              }
            >
              {textContent}
            </Truncate.Atom>
          )}
        </Linkify>
        {showUrlPreview && (
          <UrlPreviewContainer>
            <UrlPreviewStyled
              title={urlPreview.title}
              description={urlPreview.description}
              descriptionLength={urlPreview.descriptionLength}
              siteName={urlPreview.siteName}
              hostname={urlPreview.hostname}
              imgUrl={urlPreview.imgUrl}
            />
          </UrlPreviewContainer>
        )}
      </div>
    )
  );
};

TextContent.propTypes = {
  text: PropTypes.node,
  postMaxLines: PropTypes.number,
  urlPreview: PropTypes.object,
  mentionees: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      length: PropTypes.number,
    }),
  ),
};

TextContent.defaultProps = {
  text: '',
  postMaxLines: 8,
  mentionees: undefined,
};

export default customizableComponent('UITextContent', TextContent);
