const userDataSanitizer = (req, res, next) => {
  const { body } = req;
  const userProperties = Object.keys(body);
  const requiredNumberOfUserProperties = 2;

  if (userProperties.length !== requiredNumberOfUserProperties) {
    return res.status(400).json({
      error: 'login requires only two properties that is username and password!',
      sample: {
        username: 'sample-name',
        password: 'sample-password',
      },
    });
  }

  if (!userProperties.includes('username') || !userProperties.includes('password')) {
    return res.status(400).json({ error: 'both username and password fields are required!' });
  }

  return next();
};

const isUsernameValid = (req, res, next) => {
  const { body: { username } } = req;
  const re = /^[a-zA-Z]{3,}$/;
  if (!re.test(username.trim())) return res.status(400).json({ error: 'username must be atleast three characters long!' });
  return next();
};

const isPasswordValid = (req, res, next) => {
  const { body: { password } } = req;
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (!re.test(password)) return res.status(400).json({ error: 'A password must contain a minimum of 8 characters including atleast one an uppercase, lowercase, number and a special character!' });
  return next();
};

export {
  userDataSanitizer,
  isUsernameValid,
  isPasswordValid,
};
