import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PostDataType, PostRepository } from '@amityco/js-sdk';
import { FormattedMessage } from 'react-intl';
import debounce from 'lodash/debounce';

import usePost from '~/social/hooks/usePost';
import useSocialMention from '~/social/hooks/useSocialMention';
import { useConfig } from '~/social/providers/ConfigProvider';
import Content from './Content';
import {
  PostEditorContainer,
  Footer,
  ContentContainer,
  PostButton,
  UrlPreviewContainer,
  UrlPreviewStyled,
} from './styles';

const PostEditor = ({ postId, onSave, className, placeholder }) => {
  const { post, handleUpdatePost, childrenPosts = [] } = usePost(postId);
  const { data, dataType, targetId, targetType, metadata } = post;
  const { text, markup, mentions, clearAll, onChange, queryMentionees } = useSocialMention({
    targetId,
    targetType,
    remoteText: data?.text ?? '',
    remoteMarkup: metadata?.markupText ?? data?.text ?? '',
  });

  // Url preview
  const { apiUrlPreview } = useConfig();
  const [urlPreview, setUrlPreview] = useState({
    title: metadata?.urlPreview?.title ?? '',
    description: metadata?.urlPreview?.description ?? '',
    siteName: metadata?.urlPreview?.siteName ?? '',
    hostname: metadata?.urlPreview?.hostname ?? '',
    imgUrl: metadata?.urlPreview?.imgUrl ?? '',
  });
  const [currentUrl, setCurrentUrl] = useState('');

  // Children posts of the post being rendered with postId.
  const [localChildrenPosts, setLocalChildrenPosts] = useState(childrenPosts);
  useEffect(() => setLocalChildrenPosts(childrenPosts), [childrenPosts]);

  // List of the children posts removed - these will be deleted on save.
  const [localRemovedChildren, setLocalRemovedChildren] = useState([]);

  const handleRemoveChild = (childPostId) => {
    const updatedChildren = localChildrenPosts.filter((child) => child.postId !== childPostId);
    setLocalChildrenPosts(updatedChildren);
    setLocalRemovedChildren((prevRemovedChildren) => [...prevRemovedChildren, childPostId]);
  };

  // Update parent post text and delete removed children posts.
  // TO REFACTOR: Extract this logic as a hook for Create Post too
  const handleSave = () => {
    let mentionees = [];
    const postMetadata = {};
    postMetadata.type = metadata.type;

    if (metadata.type && metadata.type === 'text' && apiUrlPreview && currentUrl) {
      postMetadata.urlPreview = urlPreview;
    }

    if (mentions?.length > 0) {
      mentionees = [{}];
      mentionees[0].type = 'user';
      mentionees[0].userIds = mentions.map(({ id }) => id);

      postMetadata.mentioned = mentions.map(({ plainTextIndex, id }) => ({
        index: plainTextIndex,
        length: id.length,
        type: 'user',
        userId: id,
      }));

      postMetadata.markupText = markup;
    }

    localRemovedChildren.forEach((childPostId) => {
      PostRepository.deletePost(childPostId);
    });

    handleUpdatePost({ text }, { mentionees, metadata: postMetadata });
    clearAll();
    onSave();
  };

  const isEmpty = useMemo(
    () => text?.trim() === '' && !localChildrenPosts.length,
    [text, localChildrenPosts],
  );

  const childFilePosts = useMemo(
    () => localChildrenPosts.filter((childPost) => childPost.dataType === PostDataType.FilePost),
    [localChildrenPosts],
  );

  const childImagePosts = useMemo(
    () => localChildrenPosts.filter((childPost) => childPost.dataType === PostDataType.ImagePost),
    [localChildrenPosts],
  );

  const childVideoPosts = useMemo(
    () => localChildrenPosts.filter((childPost) => childPost.dataType === PostDataType.VideoPost),
    [localChildrenPosts],
  );

  useEffect(() => {
    setCurrentUrl(metadata?.urlPreview?.hostname);
  }, [metadata]);

  useEffect(() => {
    const getUrlPreviewDetail = (url) => {
      return fetch(`${apiUrlPreview}?url=${url}`);
    };
    const doGetDetail = (url) => {
      getUrlPreviewDetail(url)
        .then((respond) => respond.json())
        .then((respond) => {
          if (!respond) {
            setCurrentUrl('');
          } else {
            setUrlPreview({
              title: respond.title ?? '',
              description: respond.description ?? '',
              siteName: respond.siteName ?? '',
              hostname: respond.url ?? '',
              imgUrl: respond.images[0] ?? '',
            });
          }
        });
    };

    if (apiUrlPreview && currentUrl) {
      doGetDetail(currentUrl);
    } else {
      setUrlPreview({
        title: '',
        description: '',
        siteName: '',
        hostname: '',
        imgUrl: '',
      });
    }
    return () => {};
  }, [currentUrl, apiUrlPreview]);

  const setUrl = useCallback((arg) => {
    setCurrentUrl(arg);
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setUrlDebounce = useCallback(debounce(setUrl, 1000), [setUrl]);
  return (
    <PostEditorContainer className={className}>
      <ContentContainer>
        <Content
          data={{ text: markup }}
          dataType={dataType}
          placeholder={placeholder}
          queryMentionees={queryMentionees}
          onChange={(newMarkup) => {
            const regex = /(https?:\/\/[^\s]+|www\.[^\s]+\.[^\s]+)/g;
            if (newMarkup.plainText && newMarkup.plainText.match(regex)) {
              const url = newMarkup.plainText.match(regex)[0];
              setUrlDebounce(url);
            } else {
              setUrlDebounce('');
            }
            onChange(newMarkup);
          }}
        />
        {metadata?.type === 'text' && currentUrl && (
          <UrlPreviewContainer>
            <UrlPreviewStyled
              title={urlPreview.title}
              description={urlPreview.description}
              descriptionLength={urlPreview.descriptionLength}
              siteName={urlPreview.siteName}
              hostname={urlPreview.hostname}
              imgUrl={urlPreview.imgUrl}
              isShowCloseButton
              onClose={() => setUrl('')}
            />
          </UrlPreviewContainer>
        )}
        {childImagePosts.length > 0 && (
          <Content
            data={childImagePosts}
            dataType={PostDataType.ImagePost}
            onRemoveChild={handleRemoveChild}
          />
        )}
        {childVideoPosts.length > 0 && (
          <Content
            data={childVideoPosts}
            dataType={PostDataType.VideoPost}
            onRemoveChild={handleRemoveChild}
          />
        )}
        {childFilePosts.length > 0 && (
          <Content
            data={childFilePosts}
            dataType={PostDataType.FilePost}
            onRemoveChild={handleRemoveChild}
          />
        )}
      </ContentContainer>
      <Footer>
        <PostButton disabled={isEmpty} onClick={handleSave}>
          <FormattedMessage id="save" />
        </PostButton>
      </Footer>
    </PostEditorContainer>
  );
};

PostEditor.propTypes = {
  postId: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onSave: PropTypes.func,
};

PostEditor.defaultProps = {
  className: null,
  placeholder: "What's going on...",
  onSave: () => {},
};

export default memo(PostEditor);
