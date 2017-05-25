export default class Node {
  constructor(letter = null, isCompleteWord = false, children = {}) {
    this.letter = letter;
    this.children = children;
    this.isCompleteWord = isCompleteWord;
    this.frequency = 0;
  }
}
