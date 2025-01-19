/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    const newNode = new Node(val);

    // if no head create a new list with the new node
    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
      this.size ++;
      return;
    }

    // newest node becomes the head to keep o(1) runtime
    // rather than putting the new node at the end
    let oldHead = this.head;
    
    this.head = newNode;
    this.head.next = oldHead
    this.size ++;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {

    // if empty queue throw error
    if(!this.tail){
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

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.head.val
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    if(!this.head){
      return true
    }
    return false
  }
}


module.exports = Stack;
