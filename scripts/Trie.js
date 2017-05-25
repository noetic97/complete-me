import Node from '../scripts/Node'

export default class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
  }

  insert(string) {
    let wordArray = [...string.toLowerCase()]
    let currentNode = this.root;
    let currentLetter = wordArray.shift();

    while (currentLetter) {
      if (!currentNode.children[currentLetter]) {
        currentNode.children[currentLetter] = new Node(currentLetter)
      }

      currentNode = currentNode.children[currentLetter];
      currentLetter = wordArray.shift()
      if (!currentLetter) {
        if (currentNode.isCompleteWord === false) {
          currentNode.isCompleteWord = true;
          this.wordCount++
        }
      }
    }
  }

  count() {
    return this.wordCount;
  }

  suggest(input) {
    if (!input) {
      return 'please enter some letters';
    }

    let currentNode;
    let inputValue = [...input.toLowerCase()]
    let finalArray = []

    // find base node
    currentNode = this.findNode(inputValue, this.root)

    // find children words
    return this.findChildrenWords(input, currentNode, finalArray)

  }

  findChildrenWords(inputValue, currentNode, finalArray) {

    let newWord = inputValue;
    let keys = Object.keys(currentNode.children);

    keys.forEach((element)  => {

      let completeWord = newWord + currentNode.children[element].letter

      if (currentNode.children[element].isCompleteWord === true) {
        finalArray.push(completeWord)
      }

      if (currentNode.children) {
        this.findChildrenWords(completeWord, currentNode.children[element], finalArray)
      }
    })
    return finalArray;
  }

  findNode(inputValue, currentNode) {

    inputValue.forEach((element) => {
      if (currentNode.children[element]) {
        currentNode = currentNode.children[element];
      }
    })
    return currentNode
  }

  populate(array) {
    for (var i = 0; i < array.length; i++) {
      this.insert(array[i])
    }
    // console.log(this.wordCount);
  }

  select(string) {
    let selectedWord = this.suggest(string);

  }


}
