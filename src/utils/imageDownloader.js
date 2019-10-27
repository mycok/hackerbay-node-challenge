import download from 'image-downloader';
import sharp from 'sharp';

const path = require('path');

const CURRENT_WORJING_DIR = process.cwd();
/**
 * @param  {} url of the downloaded image
 * @returns {} downloaded image data
 */
const downloadImageFromUrl = async (url) => {
  let imageData = null;
  try {
    imageData = await download.image({ url, dest: path.join(CURRENT_WORJING_DIR, '/public/images/') });
  } catch (err) {
    return err;
  }
  return imageData;
};

/**
 * @param  {} imageFile to be resized
 * @returns {} filePath to the resized image
 */
const generateResizedThumbnail = (imageFile) => {
  const resizedImageName = `${Math.floor(Math.random() * 100)}-${imageFile.split('/')[8]}`;
  const filePath = path.join(CURRENT_WORJING_DIR, `/public/images/thumbnail/${resizedImageName}`);
  sharp(imageFile)
    .resize(50, 50)
    .toFile(filePath, (err) => {
      if (err) return err;
    });
  return filePath;
};

export { downloadImageFromUrl, generateResizedThumbnail };
