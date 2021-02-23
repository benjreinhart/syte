# syte

Syte is a minimalist static site generator. It works, and that's about it.

## Getting started

```
npm install --global syte
```

## CLI

```
> syte --help
syte [command]

Commands:
  cli.js new [path]    Generate new syte project
  cli.js build [path]  Compile syte project into a static site

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

#### new

```
> syte new --help
cli.js new [path]

Generate new syte project

Positionals:
  path  Where to create syte project                              [default: "."]
```

#### build

```
> syte build --help
syte build [path]

Compile syte project into a static site

Positionals:
  path  Path to the root directory of syte project                [default: "."]

Options:
  -o, --outputPath  Path where syte site will be written      [default: "build"]
```
