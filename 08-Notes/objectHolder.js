export class Note {
  constructor(title) {
    this.title = title;
  }
  _addContent(content) {
    this.content = content;
    const heading = content.split(" ").slice(0, 8).join(" ");
    this.heading = heading;
  }
  _updateTitle(newTitle) {
    this.title = newTitle;
  }
}
