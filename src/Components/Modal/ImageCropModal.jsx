import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../Utils/cropImage';
import CloseIcon from '../../Assets/icons/x.svg';

const ImageCropModal = ({
  imageUrl,
  cropInit = { x: 0, y: 0 },
  zoomInit = 1,
  onCancel,
  setCroppedImageFor,
  cropShape,
  aspect,
}) => {
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onCrop = async (e) => {
    e.preventDefault();
    const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
    setCroppedImageFor(crop, zoom, croppedImageUrl);
  };

  return (
    <div
      style={{
        backgroundColor: 'black',
        maxWidth: '390px',
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 10,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className='button-area'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px 15px',
        }}
      >
        <button
          onClick={onCancel}
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '3px 3px 0 3px',
          }}
        >
          <img src={CloseIcon} alt='취소&닫기' />
        </button>

        <button
          onClick={onCrop}
          style={{
            backgroundColor: 'black',
            color: 'white',
            fontSize: '18px',
            padding: '0 4px',
            letterSpacing: '0.6px',
          }}
        >
          저장
        </button>
      </div>

      <div style={{ height: '400px', width: '100%', margin: '20px auto' }}>
        <Cropper
          style={{
            containerStyle: {
              overflow: 'hidden',
              height: '100%',
              width: '100%',
              position: 'relative',
            },
          }}
          image={imageUrl}
          zoom={zoom}
          crop={crop}
          showGrid={false}
          aspect={aspect}
          cropShape={cropShape}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className='controls' style={{ textAlign: 'center', padding: '20px 15px' }}>
        <input
          type='range'
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onInput={(e) => {
            setZoom(e.target.value);
          }}
          className='slider'
          style={{ width: '90%' }}
          aria-labelledby='zoom'
        ></input>
      </div>
    </div>
  );
};

export default ImageCropModal;

ImageCropModal.propTypes = {
  imageUrl: PropTypes.string,
  cropInit: PropTypes.object,
  zoomInit: PropTypes.number,
  onCancel: PropTypes.func,
  setCroppedImageFor: PropTypes.func,
  cropShape: PropTypes.string,
  aspect: PropTypes.number,
};
