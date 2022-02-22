import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  text-align: left;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  border: 1px solid #ccc;
  color: $primary;
  transition: 0.3s all ease;
  height: fit-content;

  &:hover {
    background-color: rgb(250, 250, 250) !important;
    cursor: pointer;
  }
`;

// const CloseContainer = styled.div`
//   width: 25px;
//   height: 25px;
//   background-color: red;
//   position: absolute;
//   top: 0;
//   right: 0;
//   margin-right: 0.5rem;
//   margin-top: 0.5rem;
//   border-radius: 50%;
// `;

const LowerContainer = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;

  overflow: hidden;
  text-overflow: ellipsis;
  @supports (-webkit-line-clamp: 2) {
    overflow-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const Description = styled.div`
  color: $secondary;
  overflow: hidden;
  text-overflow: ellipsis;
  @supports (-webkit-line-clamp: 3) {
    overflow-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const Image = styled.div`
  width: 100%;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 30vh;
`;

const SiteDetails = styled.div`
  color: $secondary;
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const UrlPreview = ({
  title,
  description,
  descriptionLength = 200,
  siteName,
  hostname,
  imgUrl,
}) => {
  const renderDescription = () => {
    if (descriptionLength > 0 && description.length > descriptionLength) {
      return `${description.slice(0, descriptionLength)}...`;
    }
    return description;
  };

  return (
    <Container>
      {/* <CloseContainer /> */}
      <a href={hostname} target="_blank" rel="noreferrer">
        {imgUrl && (
          <Image
            style={{
              backgroundImage: `url(${imgUrl}), url(${imgUrl})`,
            }}
          />
        )}
        <LowerContainer>
          <Title>{title}</Title>
          {description && <Description>{renderDescription()}</Description>}
          <SiteDetails>
            {siteName && <span>{siteName} • </span>}
            <span>{hostname}</span>
          </SiteDetails>
        </LowerContainer>
      </a>
    </Container>
  );
};

UrlPreview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  descriptionLength: PropTypes.number,
  siteName: PropTypes.string,
  hostname: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
};

export default UrlPreview;
