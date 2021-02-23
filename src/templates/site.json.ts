interface ArgsType {
  title: string;
}

export default function generate(args: ArgsType) {
  return `
{
  "title": "${args.title}"
}
`.trim();
}
