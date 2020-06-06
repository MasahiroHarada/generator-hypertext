"use strict";

const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-hypertext:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withArguments(["test"]);
  });

  it("copies files", () => {
    assert.file(["test/gulpfile.babel.js", "test/tasks/bundle.js"]);
  });

  it("creates gitignore", () => {
    assert.file(["test/.gitignore"]);
    assert.noFile(["test/_gitignore", "test/.npmignore"]);
  });

  it("compiles ejs template", () => {
    assert.file(["test/package.json"]);
    assert.noFile(["test/package.json.ejs"]);
  });
});
