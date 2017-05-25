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

    let inputValue = [...input.toLowerCase()];
    let finalArray = [];
    let currentNode = this.findNode(inputValue, this.root); //find base node

    // find children words

    this.findChildrenWords(input, currentNode, finalArray)

    return finalArray.sort(function (a, b) {
      return b.frequency - a.frequency
    }).reduce((finalArray, obj) => {
      finalArray.push(obj.word)
      return finalArray
    }, []);
  }

  findChildrenWords(inputValue, currentNode, finalArray) {
    let newWord = inputValue;
    let keys = Object.keys(currentNode.children);

    keys.forEach((element)  => {
      let completeWord = newWord + element;

      if (currentNode.children[element].isCompleteWord === true) {
        finalArray.push({word: completeWord, frequency: currentNode.children[element].frequency})
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
    return currentNode;
  }

  populate(array) {
    for (var i = 0; i < array.length; i++) {
      this.insert(array[i])
    }
  }

  select(string) {
    let arrayedString = [...string];
    let currentNode = this.root;
    let node = this.findNode(arrayedString, currentNode);

    if (node.isCompleteWord) {
      node.frequency++
    }
    return node;
  }
}
