const jwt = require('jsonwebtoken');

const generateMockToken = () => {
  const payload = { _id: 'fakeuserId', email: 'test@example.com', name: 'Test User' };
  return jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '6h' });
};

module.exports = { generateMockToken };
