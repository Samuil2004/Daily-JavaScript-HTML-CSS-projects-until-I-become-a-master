export class Note {
  constructor(title) {
    this.title = title;
  }
  _addContent(content) {
    this.content = content;
    this._updateHeading(content);
  }
  _updateTitle(newTitle) {
    this.title = newTitle;
  }
  _updateHeading(content) {
    const heading = content.split(" ").slice(0, 8).join(" ");
    this.heading = heading;
  }
}
