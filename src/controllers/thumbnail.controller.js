import { downloadImageFromUrl, generateResizedThumbnail } from '../utils/imageDownloader';

/**
 * @param  {} req
 * @param  {} res
 * @returns {} response object
 */
const getResizedThumbnail = async (req, res) => {
  const { body: { imageUrl } } = req;
  const { filename } = await downloadImageFromUrl(imageUrl);

  if (filename.split('/')[8] === 'download') return res.status(400).json({ error: 'Unable to download image, please verify that the provided image url has an image name and extension attached!' });

  const thumbnail = generateResizedThumbnail(filename);

  return res.status(200).json({
    success: 'image resize successful!',
    data: thumbnail,
  });
};

export default getResizedThumbnail;
