module.exports = {
  name: 'bms-nodelogger',
  verbose: true,
  collectCoverage: true,
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/*.{js}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/__test__/**',
    '!**/helpers/**',
    '!**/docs/**',
    '!**/.vscode/**',
    '!**.config.js',
    '!**works**',
  ],
  testPathIgnorePatterns: ['constants'],
};
