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

    let currentNode = this.root;
    let inputValue = [...input.toLowerCase()]
    //console.log("inputValue " + typeof(inputValue));
    // let nodeLetters = [];
    let finalArray = []

    // find base node
    let newCurrentNode = this.findNode(inputValue, currentNode)
    // console.log(newCurrentNode);

    // find children words
    this.findChildrenWords(input, newCurrentNode)

    //return finalArray
  }

  findChildrenWords(inputValue, currentNode, suggestedArray = []) {
    // console.log("inputValue" + inputValue);
    // console.log("currentNode", currentNode);

    let newWord = inputValue;
    let keys = Object.keys(currentNode.children);

    keys.forEach((element)  => {
      // console.log("element " + element);
      // console.log(currentNode);

      newWord += currentNode.children[element].letter
      // console.log("newWord" + newWord);

      if (currentNode.children[element].isCompleteWord === true) {
        suggestedArray.push(newWord)
      }

      if (currentNode.children[element]) {
        // console.log("Im running");
        currentNode = currentNode.children[element]
        this.findChildrenWords(newWord, currentNode, suggestedArray)
      }

    })
    // console.log("____________________");
    // console.log(currentNode);
    // console.log(suggestedArray);
    // console.log("____________________");
    return suggestedArray
  }

  findNode(inputValue, currentNode) {
    // console.log("currentNode " + currentNode);
    // console.log("inputValue " + inputValue);

    inputValue.forEach((element) => {
      // console.log("findnode" + element);
      if (currentNode.children[element]) {
        // console.log("it Exists");
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
