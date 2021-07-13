module.exports = {
    "roots": [
        "<rootDir>"
    ],
    "testEnvironment": "jsdom",
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(test|spec)\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "setupFilesAfterEnv": [
        "<rootDir>/setupTests.ts",
    ],
};
