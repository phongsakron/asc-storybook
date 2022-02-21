import styled from 'styled-components';
import { PrimaryButton } from '~/core/components/Button';
import UrlPreview from '../../../../core/components/UrlPreview';

export const PostEditorContainer = styled.div`
  width: 520px;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.system.background};
  border-radius: 4px;
`;

export const ContentContainer = styled.div`
  padding: 16px;
`;

export const Footer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.base.shade4};
  padding: 12px 16px;
`;

export const PostButton = styled(PrimaryButton)`
  padding: 10px 16px;
  margin-left: auto;
`;

export const UrlPreviewContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
export const UrlPreviewStyled = styled(UrlPreview)``;
