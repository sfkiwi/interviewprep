var Tree = function (value) {
  this.value = value;
  this.left = null;
  this.right = null;
};

var Queue = function (tree, depth) {
  this.storage = [{
    node: tree,
    depth: depth
  }];
}

Queue.prototype.enqueue = function (node, depth) {
  this.storage.push({
    node: node,
    depth: depth
  });
}

Queue.prototype.dequeue = function () {
  return this.storage.shift();
}

Queue.prototype.size = function () {
  return this.storage.length;
}



Tree.prototype.BFSelect = function (filter, queue = new Queue(this, 0), arr = []) {
  // return an array of values for which the function filter(value, depth) returns true

  // check 
  if (!(this instanceof Tree)) {
    throw new TypeError('This is not a Tree');
  }

  if (queue.size() > 0) {
    let { node, depth } = queue.dequeue();

    // push node to array if callback returns true
    if (filter && filter(node.value, depth)) {
      arr.push(node.value);
    }

    // queue any child nodes
    if (node.left) {
      queue.enqueue(node.left, depth + 1);
    }
    if (node.right) {
      queue.enqueue(node.right, depth + 1);
    }

    // recursively iterate through queue
    this.BFSelect(filter, queue, arr);
  }

  return arr;
};

/**
 * You shouldn't need to change anything below here, but feel free to look.
  */

/**
  * add an immediate child
  * (wrap values in Tree nodes if they're not already)
  */
Tree.prototype.traverse = function(value) {

  if (value === this.value) {
    return this;
  }

  if (value < this.value) {
    if (this.left === null) {
      return this;
    } else {
      return this.left.traverse(value);
    }
  } else {
    if (this.right === null) {
      return this
    } else {
      return this.right.traverse(value);
    }
  }
}

Tree.prototype.add = function (value) {

  let node = this.traverse(value);
  
  if (value < node.value) {
    node.left = new Tree(value);
  } else {
    node.right = new Tree(value);
  }
};

let tree = new Tree(5);
tree.add(7);
tree.add(3);
tree.add(-1);
tree.add(4);
tree.add(-2);

console.log(tree.traverse(7));
console.log(tree.traverse(3));
console.log(tree.traverse(-1));
console.log(tree.traverse(4));
console.log(tree.traverse(-2));
console.log(tree.traverse(6));

console.log(tree.BFSelect((value, depth) => {
  return depth === 1;
}));

console.log(tree.BFSelect((value, depth) => {
  return depth === 2;
}));

console.log(tree.BFSelect((value, depth) => {
  return depth === 3;
}));

console.log(tree.BFSelect((value, depth) => {
  return value === 3;
}));

console.log(tree.BFSelect((value, depth) => {
  return value === -1;
}));

console.log(tree.BFSelect((value, depth) => {
  return ((value === 3) && (depth === 1));
}));

console.log('here', tree.BFSelect((value, depth) => {
  return ((value === 2) && (depth === 1));
}));

var sumRows = function(tree) {
  this.rowSums = [];

  tree.BFSelect((value,depth) => {
    if(this.rowSums[depth]) {
      this.rowSums[depth] += value;
    } else {
      this.rowSums[depth] = value;
    }
  });
  console.log(this.rowSums);
}


sumRows.prototype.Min = function() {
  var value = this.rowSums[0];
  var index = 0;

  for (let i = 0; i < this.rowSums.length; i++) {
    if (this.rowSums[i] < value) {
      index = i;
    }  
  }
  return this.rowSums[index];
}
sumRows.prototype.Max = function () {
  var value = this.rowSums[0];
  var index = 0;

  for (let i = 0; i < this.rowSums.length; i++) {
    if (this.rowSums[i] > value) {
      index = i;
    }
  }
  return this.rowSums[index];
}

let sum = new sumRows(tree);

console.log('Answer', sum.Min());
console.log('Answer', sum.Max());
