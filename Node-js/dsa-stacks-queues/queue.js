/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    const newNode = new Node(val);

    // if no head create a new list with the new node
    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
      this.size ++;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.size ++;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {

    // if empty queue throw error
    if(!this.head){
      throw new Error('Queue is empty')
    }

    // if size is 1 head and tail become null
    if(this.size === 1){
      let removedElement = this.head.val;
      this.head = null;
      this.tail = null;
      this.size = 0;
      return removedElement;
    }

    // else make new head and remove and return the old head value
    let oldHead = this.head;
    this.head = this.head.next;
    this.size --;

    return oldHead.val;
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.head.val
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    if(!this.head){
      return true
    }
    return false
  }
}

module.exports = Queue;
