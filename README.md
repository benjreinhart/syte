# syte

Syte is a minimalist static site generator.

Syte compiles [ejs](https://ejs.co) and [markdown](https://www.markdownguide.org) files into static HTML files.

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
├── layouts
│   └── app.ejs
├── pages
│   └── index.md
└── app.yaml
```

Note:

* The `layouts` directory, `pages` directory, and `app.yaml` file are mandatory. The `assets` is where you can put any static assets. This entire folder will be copied as is for the production build.
* `app.yaml` can contain any arbitrary context you want and will be available in the ejs files.
* The `pages` directory can contain any number markdown (`.md`) or ejs (`.ejs`) files.
* Pages can be nested arbitrarily deep. Their URLs will be the path to the file relative to the `pages` directory.
* Pages are able to supply context and configuration via front matter (yaml with leading and trailing `---`). This context will be merged against the global context defined in `app.yaml`.

Let's say we want to add some blog pages to our site with the following urls:

* /blog
* /blog/my-post

```
$ mkdir pages/blog
$ touch pages/blog/index.ejs
$ touch pages/blog/my-post.md
```

The resulting directory now looks like the following:

```
mysite
├── assets
├── layouts
│   └── app.ejs
├── pages
│   ├── blog
│   │   ├── index.ejs
│   │   └── my-post.md
│   └── index.md
└── app.json
```

In our `pages/blog/index.ejs` page, we want to render a list of links to all blog posts:

```ejs
<ul>
<% for (const page of pages) { %>
<% if (/\/blog\/.+/.test(page.urlPath)) { %>
  <li>
    <a href="<%= page.urlPath %>"><%= page.urlPath %></a>
  </li>
<% } %>
<% } %>
</ul>
```

And in our `pages/blog/my-post.md` we want to write a blog post:

```md
---
title: My post
---

# My Post

This is my post.
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
├── blog
│   ├── my-post
│   │   └── index.html
│   └── index.html
└── index.html
```
