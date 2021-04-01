# syte

Syte is an opinionated static site generator. It's intended for simple use cases, e.g., personal sites and blogs.

Syte takes static files of any kind, a config file, and your [ejs](https://ejs.co) and [markdown](https://www.markdownguide.org) files and compiles them into static HTML files.

[Markdown](https://www.markdownguide.org) files are first preprocessed using ejs. This enables a more powerful developer experience by allowing programmatic access to the dynamic application environment from within your markdown content.

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
├── layouts
│   └── app.ejs
├── pages
│   └── index.md
├── static
│   └── app.css
└── app.yaml
```

Note:

* The `layouts` directory, `pages` directory, and `app.yaml` file are mandatory. The `static` directory is where you can put any static files, like JavaScript, CSS, favicon.ico, CNAME, etc. The entire `static` folder will be copied as is into the root directory for the production build.
* `app.yaml` can contain any arbitrary context you want and will be available in the ejs files.
* The `pages` directory can contain any number of ejs (`.ejs`) or markdown (`.md`) files.
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
├── layouts
│   └── app.ejs
├── pages
│   ├── blog
│   │   ├── index.ejs
│   │   └── my-post.md
│   └── index.md
├── static
│   └── app.css
└── app.yaml
```

In the `pages/blog/my-post.md` file we want to write a blog post:

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
<% for (const page of pages) { _%>
<% if (page.urlPath.startsWith("/blog/")) { _%>
  <li>
    <a href="<%= pathTo(page) %>"><%= page.title %></a>
  </li>
<% } _%>
<% } _%>
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
├── app.css
├── blog
│   ├── my-post
│   │   └── index.html
│   └── index.html
└── index.html
```

When deploying to some environments, you may need to prefix the urls with a root path (this is the case with some github pages sites). If you used the `pathTo` helper for all your relative url references, then you can build the site with a specified url path prefix. For example, if you are deploying to github pages for a repo named `your-gh-repo`, you would build your syte project with the following command:

```
$ syte build --urlPathPrefix your-gh-repo
```
