import React from 'react';

import Post from '~/social/components/post/Post';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  max-width: 550px;
  margin: 0 auto;
  padding: 28px 0;
  overflow-y: auto;
`;

const PostDetail = ({ postId }) => {
  return (
    <Wrapper>
      <Post key={postId} postId={postId} />
    </Wrapper>
  );
};

export default PostDetail;
