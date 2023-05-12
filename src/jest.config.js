/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transformIgnorePatterns: ['/node_modules/(?!(react-bootstrap-tagsinput))'],
};

module.exports = config;
