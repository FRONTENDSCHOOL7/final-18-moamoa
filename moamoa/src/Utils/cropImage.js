const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

// function getRadianAngle(degreeValue) {
//   return (degreeValue * Math.PI) / 180;
// }

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  // const maxSize = Math.max(image.width, image.height);
  // const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = image.width;
  canvas.height = image.height;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(image.width / 2, image.height / 2);
  // ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image and store data.
  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  return canvas.toDataURL('image/jpeg');

  // As a blob
  // return new Promise((resolve) => {
  //   canvas.toBlob((file) => {
  //     console.log(file);
  //     resolve(URL.createObjectURL(file));
  //   }, 'image/jpeg');
  // });
}
