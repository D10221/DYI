module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  plugins: ["@babel/plugin-syntax-dynamic-import"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
};
