module.exports = {
	"globals": {
		"ts-jest": {
			tsconfig: "./tsconfig.test.json"
		}
	},
	"projects": [
		"<rootDir>",
		"<rootDir>/packages/*"
	],
	"roots": [
		"<rootDir>/src",
		"<rootDir>/test",
	],
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
