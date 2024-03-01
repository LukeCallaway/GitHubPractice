/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.length ++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
    }

    newNode.next = this.head;
    this.head = newNode;
    this.length ++;
  }

  /** pop(): return & remove last item. */

  pop() {
    if(!this.head){
      throw new Error('Empty Array')
    }
    if(this.length === 1){
      let removedElement = this.head.val;
      this.head = null;
      this.tail = null;
      this.length --;
      return removedElement;
    }

    let previous = this.head;

    while(previous.next.next != null){
      previous = previous.next;
    }
    let removedElement = previous.next
    previous.next = null;
    this.tail = previous;

    this.length --;

    return removedElement.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if(!this.head){
      throw new Error('Empty Array')
    }
    if(this.length === 1){
      let removedElement = this.head.val;
      this.head = null;
      this.tail = null;
      this.length --;
      return removedElement;
    }

    let newHead = this.head.next;
    let oldHead = this.head;
    this.head = newHead;
    this.length --;

    return oldHead.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if(!this.head){
      throw new Error('Empty Array')
    }

    let index = 0;
    let currentNode = this.head;
    if(idx === 0){
      return this.head.val;
    }
    for(let i = 0; currentNode != null && i < idx; i++){
      index ++;
      currentNode = currentNode.next;
    }
    if(index < idx){
      throw new Error('Index out of range')
    }

    return currentNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let newNode = new Node(val);
    let index = 0;
    let currentNode = this.head;

    if(idx === 0){
      this.head = newNode;
      return;
    }
    for(let i = 0; currentNode != null && i < idx - 1; i++){
      index ++;
      currentNode = currentNode.next;
    }
    if(this.length < idx){
      throw new Error('Index out of range')
    }

    currentNode.next = newNode;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let newNode = new Node(val);
    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
      this.length ++;
      return;
    }
    
    let index = 0;
    let currentNode = this.head;
    if(idx === 0){
      this.head = newNode;
      this.head.next = currentNode;
      this.length ++;
      return;
    }    
    if(idx > this.length){
      throw new Error('Index out of range')
    }
    if(idx === this.length){
      this.tail.next = newNode;
      this.tail = newNode;
    }
    for(let i = 0; i < idx - 1; i++){
      index ++;
      currentNode = currentNode.next;
    }
    let currentNodeNext = currentNode.next;
    currentNode.next = newNode;
    newNode.next = currentNodeNext;
    this.length ++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {

    if(!this.head){
      throw new Error('Empty Array')
    }
    let index = 0;
    let currentNode = this.head;
    let removedNode;
    if(this.length === 1){
      this.head = null;
      this.tail = null;
      this.length --;
      return;
    }
    if(idx === 0){
      this.head = currentNode.next;
      this.length --;
      return;
    }

    for(i = 0; currentNode != null && i < idx - 1; i++){
      index ++;
      removedNode = currentNode.next;
      currentNode = currentNode.next;
    }

    if(idx > this.length){
      throw new Error('Index out of range')
    }

    let next = currentNode.next.next;
    currentNode.next = next;
    this.length --;
    
    return removedNode;
  }

  /** average(): return an average of all values in the list */

  average() {
    if(!this.head){
      return 0;
    }
    let total = 0;
    let indexCount = 0;
    let currentNode = this.head;
    while(currentNode !== null){
      total += currentNode.val;
      currentNode = currentNode.next;
      indexCount ++;
    }
    return total / indexCount;    
  }
}

module.exports = LinkedList;
