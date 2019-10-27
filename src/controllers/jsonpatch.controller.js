import jsonpatch from 'fast-json-patch';

/**
 * @param  {} req
 * @param  {} res
 * @returns {} response object
 */
const objectPatch = (req, res) => {
  const { body: { document, patch } } = req;
  const { newDocument } = jsonpatch.applyPatch(document, patch, true);

  return res.status(200).json({
    success: 'object patch successful!',
    data: newDocument,
  });
};

export default objectPatch;
