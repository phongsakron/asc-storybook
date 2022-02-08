import React from 'react';
import styled from 'styled-components';

import { ChevronLeft, ChevronRight, Remove } from '~/icons';

export const Container = styled.div`
  z-index: 9999;
  position: fixed;
  overflow: hidden;

  align-items: center;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 3rem 5px;

  background: rgba(0, 0, 0, 0.75);
  color: ${({ theme }) => theme.palette.system.background};

  user-select: none;

  animation-duration: 0.3s;
  animation-name: appear;

  @keyframes appear {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media screen and (min-width: 769px){
    display: grid;
    grid-gap: 1rem 3rem;
    grid-template-columns: 2rem auto 2rem;
    grid-template-rows: min-content auto;
    grid-template-areas:
      'none counter close'
      'left image right';
    padding: 3rem;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const ImageRenderer = (url) => <Image key={url} src={url} />;

export const Frame = styled.div`
  grid-area: image;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Counter = styled.div`
  grid-area: counter;
  ${({ theme }) => theme.typography.headline}
  text-align: center;
`;

const InvisibleButton = styled.button`
  grid-area: ${({ rel }) => rel};
  appearance: none;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: inherit;

  &:hover {
    color: ${({ theme }) => theme.palette.neutral.shade4};
  }
`;

export const LeftButton = styled((props) => (
  <InvisibleButton rel="left" {...props}>
    <ChevronLeft height="24px" />
  </InvisibleButton>
))`
@media screen and (max-width: 768px){
    background: rgba(0, 0, 0, 0.2);
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50vh - 15px);
    left: 1rem;
    svg{
      font-size: 14px !important;
    }
  }
`;

export const RightButton = styled((props) => (
  <InvisibleButton rel="right" {...props}>
    <ChevronRight height="24px" />
  </InvisibleButton>
))`
  @media screen and (max-width: 768px){
    background: rgba(0, 0, 0, 0.2);
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50vh - 15px);
    right: 1rem;
    svg{
      font-size: 14px !important;
    }
  }
`;

export const CloseButton = styled((props) => (
  <InvisibleButton rel="close" {...props}>
    <Remove height="20px" />
  </InvisibleButton>
))`
  background: rgba(0, 0, 0, 0.3);
  height: 43px;
  width: 43px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px){
    position: absolute;
    top: 1rem;
    right: 5px;
  }
`;
