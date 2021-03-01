import fm from "../src/fm";

const noFrontMatter = `# Heading 1

Paragraph text.
`;

const emptyFrontMatterContent = `\`\`\`json
\`\`\`
# Heading 1

Paragraph text.
`;

const whitespaceFrontMatterContent = `\`\`\`json

\`\`\`
# Heading 1

Paragraph text.
`;

const frontMatterWithoutClosingTag = `\`\`\`json

# Heading 1

Paragraph text.
`;

const invalidFrontMatterContent = `\`\`\`json
invalid json
\`\`\`
# Heading 1

Paragraph text.
`;

const validFrontMatter = `\`\`\`json
{
  "title": "My page",
  "layout": "blog.ejs",
  "arbitraryKey": "arbitrary value"
}
\`\`\`
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
      fm.parse(invalidFrontMatterContent);
    }).toThrow(/^Unexpected token/);
  });

  it("parses valid front matter", () => {
    const [frontMatter, contents] = fm.parse(validFrontMatter);
    expect(frontMatter).toEqual({
      title: "My page",
      layout: "blog.ejs",
      arbitraryKey: "arbitrary value",
    });
    expect(contents).toEqual("# Heading 1\n\nParagraph text.\n");
  });
});
