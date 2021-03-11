#!/usr/bin/env node

import yargs, { Argv } from "yargs";
import cmd from "./cmd";

yargs(process.argv.slice(2))
  .command({
    command: "new [path]",
    describe: "Generate new syte project",
    builder: (yargs: Argv) => {
      return yargs.positional("path", {
        describe: "Where to create syte project",
        default: ".",
      });
    },
    handler: cmd.new,
  })
  .command({
    command: "serve [path]",
    describe: "Serve the given syte project",
    builder: (yargs: Argv) => {
      return yargs
        .positional("path", {
          describe: "Path to the root directory of syte project",
          default: ".",
        })
        .options({
          port: {
            alias: "p",
            describe: "Port to serve on",
            default: 3500,
          },
        });
    },
    handler: cmd.serve,
  })
  .command({
    command: "build [path]",
    describe: "Compile syte project into a static site",
    builder: (yargs: Argv) => {
      return yargs
        .positional("path", {
          describe: "Path to the root directory of syte project",
          default: ".",
        })
        .options({
          outputPath: {
            alias: "o",
            describe: "Path where syte site will be written",
            default: "build",
          },
          urlPathPrefix: {
            describe: "Specify a path to prefix the url path",
            default: "/",
          },
        });
    },
    handler: cmd.build,
  })
  .help().argv;
