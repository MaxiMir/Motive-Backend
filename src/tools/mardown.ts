export class Markdown {
  static convert(value: string) {
    return value.replace(/(https?:\/\/[^\s]+)/g, '[$1]($1)').replace(/\\n/g, '  ');
  }
}
