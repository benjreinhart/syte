# syte

Syte is a minimalist static site generator. It works, and that's about it.

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
├── layouts
│   └── main.ejs
├── pages
│   └── index.md
└── site.json
```

Note:

* The `layouts` directory, `pages` directory, and `site.json` file are mandatory.
* `site.json` can contain any arbitrary context you want and will be available in the ejs files.
* The `pages` directory can contain any number markdown (`.md`) or ejs (`.ejs`) files.
* Pages can be nested arbitrarily deep. Their URLs will be the path to the file relative to the `pages` directory.

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
│   └── main.ejs
├── pages
│   ├── blog
│   │   ├── index.ejs
│   │   └── my-post.md
│   └── index.md
└── site.json
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

````md
```json
{
  "title": "My post"
}
```

# My Post

This is my post.
````

Note that front matter is supported (using the code block notation with `json`) and will be available to the layout as the identifier `page`.

And, finally, we want to compile the source into static files:

```
$ syte build --outputPath dist
```

This will output a directory called `dist` into the current working directory with the following structure:

```
dist
├── blog
│   ├── my-post
│   │   └── index.html
│   └── index.html
└── index.html
```
