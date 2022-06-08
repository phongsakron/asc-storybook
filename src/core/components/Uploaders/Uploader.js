import { cloneElement } from 'react';
import { useShallowCompareEffect } from 'react-use';
import PropTypes from 'prop-types';

import useFileUpload from '~/core/hooks/useFileUpload';

const FileUploader = ({ files, onChange, onError, onLoadingChange, children }) => {
  const { uploading, uploaded, progress, addFiles, removeFile, reset, rejected, retry } =
    useFileUpload(onChange, onLoadingChange, onError);

  useShallowCompareEffect(() => {
    files && addFiles(files);
    !files.length && reset();
  }, [files]);

  if (!files?.length || (!uploading.length && !uploaded.length)) return null;

  return cloneElement(children, {
    uploading,
    uploaded,
    progress,
    removeFile,
    rejected,
    retry,
  });
};

FileUploader.propTypes = {
  files: PropTypes.array,
  children: PropTypes.node,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onLoadingChange: PropTypes.func,
};

FileUploader.defaultProps = {
  files: [],
  onChange: () => {},
  onError: () => {},
  onLoadingChange: () => {},
  children: null,
};

export default FileUploader;
