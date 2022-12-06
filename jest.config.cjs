/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  testPathIgnorePatterns: [".js"],
  testMatch: ["**/?(*.)+(spec|test).(j|t)s?(x)"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/src/__tests__/tsconfig.json",
        useESM: true,
      },
    ],
  },
};
