import fm from "../src/fm";

const noFrontMatter = `# Heading 1

Paragraph text.
`;

const emptyFrontMatterContent = `---
---
# Heading 1

Paragraph text.
`;

const whitespaceFrontMatterContent = `---

---
# Heading 1

Paragraph text.
`;

const frontMatterWithoutClosingTag = `---

# Heading 1

Paragraph text.
`;

const invalidFrontMatterContent = `---
non-object
---
# Heading 1

Paragraph text.
`;

const validFrontMatter = `---
title: My page
layout: blog
arbitraryKey: arbitrary value
---
# Heading 1

Paragraph text.
`;

describe("fm.parse", () => {
  it("parses contents with no front matter", () => {
    const [frontMatter, contents] = fm.parse(noFrontMatter);
    expect(frontMatter).toEqual({});
    expect(contents).toEqual("# Heading 1\n\nParagraph text.\n");
  });

  it("parses contents with empty front matter", () => {
    const [frontMatter, contents] = fm.parse(emptyFrontMatterContent);
    expect(frontMatter).toEqual({});
    expect(contents).toEqual("# Heading 1\n\nParagraph text.\n");
  });

  it("parses contents with whitespace only front matter", () => {
    const [frontMatter, contents] = fm.parse(whitespaceFrontMatterContent);
    expect(frontMatter).toEqual({});
    expect(contents).toEqual("# Heading 1\n\nParagraph text.\n");
  });

  it("throws an error when no closing tag is found", () => {
    expect(() => {
      fm.parse(frontMatterWithoutClosingTag);
    }).toThrow(/EOF reached without closing front matter tag/);
  });

  it("throws an error when front matter content is invalid", () => {
    expect(() => {
      console.log(fm.parse(invalidFrontMatterContent));
    }).toThrow(/^Front matter must be an object/);
  });

  it("parses valid front matter", () => {
    const [frontMatter, contents] = fm.parse(validFrontMatter);
    expect(frontMatter).toEqual({
      title: "My page",
      layout: "blog",
      arbitraryKey: "arbitrary value",
    });
    expect(contents).toEqual("# Heading 1\n\nParagraph text.\n");
  });
});
