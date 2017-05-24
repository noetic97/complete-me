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

    let currentNode = this.root.children;
    let inputValue = [...input.toLowerCase()]

    let nodeLetters = [];
    let finalArray = []

    inputValue.forEach((element) => {

      if(currentNode[element]) {

        nodeLetters.push(element)

        if(currentNode[element].isCompleteWord === true) {
          let inputWord = nodeLetters.join('');
          finalArray.push(inputWord)

        console.log(inputWord);
        console.log(finalArray);
        }
        currentNode = currentNode[element].children;
        // console.log(element);
        // console.log('it exists');
        // console.log(currentNode[element].isCompleteWord)
      }
    })

  }

  populate(array) {
    for (var i = 0; i < array.length; i++) {
      this.insert(array[i])
    }
    console.log(this.wordCount);
  }


}
