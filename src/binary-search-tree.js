const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

class BinarySearchTree {

  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);
    if (!this._root) {
      this._root = node;
      return;
    }
    let current = this._root;
    while (current) {
      if (node.data < current.data) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      } else if (node.data > current.data) {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      } else {
        break;
      }
    }
  }

  has(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) {
        return true;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(current, data) {
    if (!current) {
      return null;
    }
    if (data === current.data) {
      if (!current.left && !current.right) {
        return null;
      }
      if (!current.left) {
        return current.right;
      }
      if (!current.right) {
        return current.left;
      }
      let temp = this._getMinNode(current.right);
      current.data = temp.data;
      current.right = this._removeNode(current.right, temp.data);
      return current;
    } else if (data < current.data) {
      current.left = this._removeNode(current.left, data);
      return current;
    } else {
      current.right = this._removeNode(current.right, data);
      return current;
    }
  }

  _getMinNode(current) {
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  min() {
    if (!this._root) {
      return null;
    }
    let current = this._root;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this._root) {
      return null;
    }
    let current = this._root;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}


module.exports = {
  BinarySearchTree
};