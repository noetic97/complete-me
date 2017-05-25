import { expect } from 'chai'
import Trie from '../scripts/Trie'
import Node from '../scripts/Node'
import fs from 'fs'

describe ('Trie', function () {
  this.timeout(20000)
  let trie;

  beforeEach( () => {
    trie = new Trie();
  })

  it('should be a function', () => {
    expect(trie).to.be.a.function;
  })

  it('should be have a property of root that defaults to new node', () => {

    expect(trie.root).to.deep.equal(new Node())
  })
})

describe ('Insert', () => {

  let trie;

  beforeEach( () => {
    trie = new Trie();
  })

  it('should be able to insert a new letter', () => {

    trie.insert('h');
    expect(trie.root.children.h.letter).to.equal('h')
  })

  it('should be able to insert a new word', () => {

    trie.insert('him');

    expect(trie.root.letter).to.equal( null )
    expect(trie.root.children.h.letter).to.equal('h')
    expect(trie.root.children.h
                    .children.i.letter).to.equal('i')
    expect(trie.root.children.h
                    .children.i
                    .children.m.letter).to.equal('m')
  })
})

describe ('Count', () => {

  let trie;

  beforeEach( () => {
    trie = new Trie();
  })

  it('should return the total of complete words', () => {

    expect(trie.wordCount).to.equal(0)

    trie.insert('word')

    expect(trie.count()).to.equal(1)

    trie.insert('Yay')

    expect(trie.count()).to.equal(2)
  })

  it('should return the same total if duplicate words are entered', () => {

    expect(trie.wordCount).to.equal(0)

    trie.insert('word')

    expect(trie.count()).to.equal(1)

    trie.insert('word')

    expect(trie.count()).to.equal(1)

    trie.insert('bleh')
    trie.insert('word')

    expect(trie.count()).to.equal(2)
  })
})

describe ('suggest', () => {

  let trie;

  beforeEach( () => {
    trie = new Trie();
  })

  it('should return a phrase that asks the user to enter a value if no value is passed in', () => {

    trie.insert('cat');
    trie.insert('catch');

    expect(trie.suggest()).to.equal('please enter some letters');
  })

  it('should have a helper function that returns a full word based on partial user input', () => {

    trie.insert('catcher')

    trie.suggest('ca')

    let passedNode = trie.root.children.c
                              .children.a

    expect(trie.findChildrenWords('ca', passedNode, [])).to.deep.equal([ 'catcher' ])
  })

  it('should return array of words based on partial user input', () => {

    trie.insert('cat')
    trie.insert('catch')
    trie.insert('catcher')

    expect(trie.suggest('ca')).to.deep.equal([ 'cat', 'catch', 'catcher' ])
  })

  it('should return all words that contain user input at the beginning of the word', () =>{

    trie.insert('cat');
    trie.insert('catch');
    trie.insert('car');
    trie.insert('cart');
    trie.insert('carted');
    trie.insert('bird');

    expect(trie.suggest('ca')).to.deep.equal(['cat', 'catch', 'car', 'cart', 'carted']);

    expect(trie.suggest('car')).to.deep.equal(['cart', 'carted']);

    expect(trie.suggest('bi')).to.deep.equal(['bird']);
  })
})


describe ('Populate', () => {

  let trie;

  beforeEach( () => {
    trie = new Trie();
  })

  it('should populate a dictionary of words', () => {
    const text = "/usr/share/dict/words"
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    trie.populate(dictionary)

    expect(trie.wordCount).to.equal(235886);
    expect(trie.count()).to.equal(235886);
  })
})

describe ('Select', () => {
  let trie;

  beforeEach( () => {
    trie = new Trie();
  })

  it('Should select a word from the suggest array and then return an array with the selected word first if the same suggest is called', () => {

    trie.insert('cat');
    trie.insert('catch');
    trie.insert('catcher');
    trie.insert('cab');

    expect(trie.suggest('ca')).to.deep.equal(['cat', 'catch', 'catcher', 'cab'])

    trie.select('catcher');

    expect(trie.suggest('ca')).to.deep.equal(['catcher', 'cat', 'catch', 'cab'])
  })
})
