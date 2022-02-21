import React from 'react';
import PropTypes from 'prop-types';
import { PostDataType } from '@amityco/js-sdk';

import TextContent from '~/social/components/post/TextContent';
import ImageContent from '~/social/components/post/ImageContent';
import VideoContent from '~/social/components/post/VideoContent';
import FileContent from '~/social/components/post/FileContent';
import LivestreamContent from '~/social/components/post/LivestreamContent';

const RENDERERS = {
  [PostDataType.TextPost]: TextContent,
  [PostDataType.ImagePost]: ImageContent,
  [PostDataType.VideoPost]: VideoContent,
  [PostDataType.FilePost]: FileContent,
  [PostDataType.LivestreamPost]: LivestreamContent,
};

const PostContent = ({ data, dataType, postMaxLines, mentionees, urlPreview }) => {
  const Renderer = RENDERERS[dataType];
  if (!data || !Renderer) return null;

  return (
    <Renderer
      {...data}
      postMaxLines={postMaxLines}
      mentionees={mentionees}
      urlPreview={urlPreview}
    />
  );
};

PostContent.propTypes = {
  data: PropTypes.object,
  dataType: PropTypes.oneOf(Object.values(PostDataType)),
  postMaxLines: PropTypes.number,
  mentionees: PropTypes.array,
  urlPreview: PropTypes.object,
};

export default PostContent;
