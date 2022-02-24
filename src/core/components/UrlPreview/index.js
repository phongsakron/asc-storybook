import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Close from '~/icons/Close';

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
  text-decoration: none;
  &:hover {
    background-color: rgb(250, 250, 250) !important;
    cursor: pointer;
  }
`;

const CloseContainer = styled.div`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ddd;
  }
`;

const LowerContainer = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
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
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
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
  height: 220px;
`;

const SiteDetails = styled.div`
  color: #abaeba;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Link = styled.a`
  text-decoration: none;
`;

const UrlPreview = ({
  title,
  description,
  descriptionLength = 200,
  siteName,
  hostname,
  imgUrl,
  isShowCloseButton = false,
  onClose,
}) => {
  const renderDescription = () => {
    if (descriptionLength > 0 && description.length > descriptionLength) {
      return `${description.slice(0, descriptionLength)}...`;
    }
    return description;
  };

  return (
    <Container>
      {isShowCloseButton && (
        <CloseContainer onClick={onClose}>
          <Close />
        </CloseContainer>
      )}
      <Link href={hostname} target="_blank" rel="noreferrer">
        {imgUrl && (
          <Image
            style={{
              backgroundImage: `url(${imgUrl}), url(${imgUrl})`,
            }}
          />
        )}
        <LowerContainer>
          <Title>{title}</Title>
          <SiteDetails>
            {siteName && <span>{siteName} • </span>}
            <span>{hostname}</span>
          </SiteDetails>
          {description && <Description>{renderDescription()}</Description>}
        </LowerContainer>
      </Link>
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
  isShowCloseButton: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default UrlPreview;
