import React from 'react';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import UploadIcon from 'react-icons/lib/fa/cloud-upload';

import styles from './image-uploader.scss';

export default function ImageUploader(props) {

  const uploaderProps = {
    server: 'https://creator.transportvr.com',
    s3Url: 'https://ps.wevr.com',
  }

  const handleFinishedUpload = (data) => {
    const imageUrl = `https://ps.wevr.com/${data.filename}`;
    return props.updateImageSource(props.editingIndex, imageUrl, props.imageIndex);
  }

  return (
    <DropzoneS3Uploader
      id="image-uploader"
      className={styles['image-uploader']}
      data-index={props.editingIndex}
      onFinish={handleFinishedUpload}
      {...uploaderProps}>
      <div>
        Drop Image Here
        <UploadIcon />
        <button onClick={(e) => {e.preventDefault()}}>Select Image</button>
      </div>
    </DropzoneS3Uploader>
  )
}
