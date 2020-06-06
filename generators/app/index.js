"use strict";

const Generator = require("yeoman-generator");
const chalk = require("chalk");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("appname", { type: String, required: true });
  }

  writing() {
    const { appname } = this.options;

    this.fs.copy(
      this.templatePath("!(package.json.ejs|_gitignore)"),
      this.destinationPath(appname),
      { globOptions: { dot: true } }
    );

    this.fs.copy(
      this.templatePath("_gitignore"),
      this.destinationPath(`${appname}/.gitignore`)
    );

    const dirs = ["src", "tasks"];

    for (const dir of dirs) {
      this.fs.copy(
        this.templatePath(dir),
        this.destinationPath(`${appname}/${dir}`)
      );
    }

    this.fs.copyTpl(
      this.templatePath("package.json.ejs"),
      this.destinationPath(`${appname}/package.json`),
      { appname }
    );
  }

  end() {
    this.log(
      `\n\n` +
        `   Project successfully created ✨ 🌈 🦄 🌈 ✨` +
        `\n\n` +
        `   ${chalk.gray("$")} ` +
        chalk.green(`cd ${this.options.appname}`) +
        `\n\n` +
        `   ${chalk.gray("$")} ` +
        chalk.green(`npm install`) +
        ` or ` +
        chalk.green(`yarn`) +
        `\n`
    );
  }
};
