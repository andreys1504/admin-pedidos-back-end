module.exports = {
  // Stop running tests after `n` failures
  bail: true,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  //collectCoverageFrom: ["src/**"],

  // The directory where Jest should output its coverage files
  //coverageDirectory: "__tests__/coverage",

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/__tests__/**/*.tests.ts?(x)"]
};
