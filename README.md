# syte

Syte is a minimalist static site generator.

Syte takes static assets, a configuration file, and your [ejs](https://ejs.co) files and compiles them into static HTML files.

[Markdown](https://www.markdownguide.org) is supported using the `.md.ejs` extension, which means it is first preprocessed using ejs. This enables a more powerful developer experience by allowing programmatic control as well as access to the dynamic application environment from within your markdown content.

## Install

```
npm install --global syte
```

## Quick start

```
$ syte new mysite
$ cd mysite
```

This will create a new project called `mysite` with the following directory structure:

```
mysite
├── assets
│   └── app.css
├── layouts
│   └── app.ejs
├── pages
│   └── index.md.ejs
└── app.yaml
```

Note:

* The `layouts` directory, `pages` directory, and `app.yaml` file are mandatory. The `assets` is where you can put any static assets. The entire `assets` folder will be copied as is for the production build.
* `app.yaml` can contain any arbitrary context you want and will be available in the ejs files.
* The `pages` directory can contain any number of ejs (`.ejs`) or markdown ejs (`.md.ejs`) files.
* Pages can be nested arbitrarily deep. Their URLs will be the path to the file relative to the `pages` directory.
* Pages are able to supply context and configuration via front matter (yaml with leading and trailing `---`). This context will be merged against the global context defined in `app.yaml`.

Let's say we want to add some blog pages to our site with the following urls:

* /blog
* /blog/my-post

```
$ mkdir pages/blog
$ touch pages/blog/index.ejs
$ touch pages/blog/my-post.ejs
```

The resulting directory now looks like the following:

```
mysite
├── assets
│   └── app.css
├── layouts
│   └── app.ejs
├── pages
│   ├── blog
│   │   ├── index.ejs
│   │   └── my-post.md.ejs
│   └── index.md.ejs
└── app.yaml
```

In the `pages/blog/my-post.md.ejs` file we want to write a blog post:

```md
---
title: My post
---

# My Post

This is my post.
```

Notice that the file uses front matter to define a `title` property for the page. Properties defined in the front matter will be available to the templates during compilation.

In our `pages/blog/index.ejs` page, we want to render a list of links to all blog posts:

```ejs
<ul>
<% for (const page of pages) { %>
<% if (/\/blog\/.+/.test(page.urlPath)) { %>
  <li>
    <a href="<%= page.urlPath %>"><%= page.title %></a>
  </li>
<% } %>
<% } %>
</ul>
```

To view our pages while we develop them, we'll start the development server:

```
$ syte serve
```

This will spin up your syte project by default on http://localhost:3500. In this case, the three pages available to us are:

* http://localhost:3500
* http://localhost:3500/blog
* http://localhost:3500/blog/my-post

Finally, when we're ready to deploy, we can compile the source into static files with the following command.

```
$ syte build
```

This will output a directory called `build` (the default, but can be changed with `-o` option) into the current working directory with the following structure:

```
build
├── assets
│   └── app.css
├── blog
│   ├── my-post
│   │   └── index.html
│   └── index.html
└── index.html
```
