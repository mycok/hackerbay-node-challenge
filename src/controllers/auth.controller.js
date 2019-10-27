import generateToken from '../utils/generateToken';

/**
 * @param  {} req
 * @param  {} res
 * @returns {} response object
 */
const login = (req, res) => {
  const { body: { username } } = req;
  const token = generateToken(username);

  return res.status(200).json({
    success: `${username} is now logged in!`,
    token,
  });
};

export default login;
