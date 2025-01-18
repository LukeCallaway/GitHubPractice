class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if(!this.root){
      this.root = new Node(val);
      return this;
    } 

    let current = this.root

    while(current.left || current.right){
      if(val > current.val){
        if(!current.right){
          current.right = new Node(val)
          return this;
        } 
        if(val > current.val){
          current = current.right
        }
      }
      if (val < current.val){
        if(!current.left){
          current.left = new Node(val)
          return this;
        } 
        if(val < current.val){
          current = current.left
        } 
      }
    }
    if(val > current.val) current.right = new Node(val) 
    if(val < current.val) current.left = new Node(val)

    return this;
  }


  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, curr = this.root) {
    if(!this.root){
      this.root = new Node(val);
      return this;
    } 

    if(val > curr.val){
      if(curr.right){
        return this.insertRecursively(val, curr.right)
      }
      curr.right = new Node(val) 
      return this;
    }
    if(val < curr.val) 
      if(curr.left){
        return this.insertRecursively(val, curr.left)
      }
      curr.left = new Node(val)
      return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let curr = this.root;
    if(val === curr.val) return curr.val;
    while(curr.left || curr.right){
      if(val > curr.val) curr = curr.right
      if(val < curr.val) curr = curr.left
      if(val === curr.val) return curr;
    }
    return undefined
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, curr = this.root) {
    if(!curr.left && !curr.right && curr.val != val) return undefined
    if(curr.val === val) return curr;
    if(curr.val > val) return this.findRecursively(val, curr.left)
    if(curr.val < val) return this.findRecursively(val, curr.right)
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. 
   * self -> left -> right */

  dfsPreOrder(node = this.root, arr=[]) {
    arr.push(node.val)

    if(node.left){
      this.dfsPreOrder(node.left, arr)
    } 
    if(node.right){
      this.dfsPreOrder(node.right, arr)
    } 
    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. 
   * left -> self -> right*/

  dfsInOrder(node=this.root, arr=[]) {
    if(node.left){
      this.dfsInOrder(node.left, arr)
    } 
    arr.push(node.val)

    if(node.right){
      this.dfsInOrder(node.right, arr)
    } 
    return arr;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. 
   * left -> right -> self */

  dfsPostOrder(node = this.root, arr=[]) {
    if(node.left){
      this.dfsPostOrder(node.left, arr)
    } 
    
    if(node.right){
      this.dfsPostOrder(node.right, arr)
    } 
    arr.push(node.val)

    return arr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs(curr = this.root, toVisit=[], visited=[]) {
    if(curr.left) toVisit.push(curr.left)
    if(curr.right) toVisit.push(curr.right)
    visited.push(curr.val)
    
    if(toVisit.length) return this.bfs(toVisit.shift(), toVisit, visited)
    
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;