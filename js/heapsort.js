
function print(s) {
    console.log(s);
}

function stringifyTree(n) {
    s = n.val + " L:{";
    if (n.left)
	s += stringifyTree(n.left);	
    else
	s += "null";
    s += "} R:{";
    if (n.right)
	s += stringifyTree(n.right);
    else
	s += "null";
    return s + "}";
}

function Node(val, left, right, parent) {
    this.val = val;
    this.right = right || null;
    this.left = left || null;
    this.parent = parent || null;

    this.isRightChild = function () {
	return this.parent && this.parent.right == this;
    }

    this.isLeftChild = function () {
	return this.parent && this.parent.left == this;
    }

    this.swapVals = function (n) {
	var tmp = n.val;
	n.val = this.val;
	this.val = tmp;	
    }

    this.toString = function () {
	s = this.val + " L:{";
	if (this.left)
	    s += this.left.val;
	else
	    s += "null";
	s += "} R:{";
	if (this.right)
	    s += this.right.val;
	else
	    s += "null";
	return s + "}";
    }
}

function Heap() {
    this.root = null;
    this.freespot = null;
    this.lastadded = null;

    this.add = function (n) {
	if (this.freespot) {
	    n.parent = this.freespot;
	    if (this.freespot.left) {
		this.freespot.right = n;
		this.findNextFreespot();
	    } else {
		this.freespot.left = n;
	    }
	    // place the value correctly in the heap
	    this.rebalanceVals(n);
	} else {
	    // we are the root node!
	    this.freespot = this.root = n;
	}
	this.lastadded = n;
    }

    this.findNextFreespot = function () {
	if (this.freespot.parent) {
	    var curr = this.freespot;
	    // move up the tree until we are a left child or root
	    while (curr.parent && curr.isRightChild())
		curr = curr.parent;
	    // if we are a left child switch to right subtree
	    if (curr.parent)
		curr = curr.parent.right;
	    // move down as far left as we can
	    while (curr.left)
		curr = curr.left;
	    this.freespot = curr;
	} else {
	    // we are the root! So next spot is on the left subtree
	    this.freespot = this.freespot.left;
	}
    }

    this.rebalanceVals = function (n) {
	// move the value up until our parent is smaller (or eq)
	while (n.parent && n.val > n.parent.val) {
	    n.swapVals(n.parent);
	    n = n.parent;
	}
    }

    this.removeRoot = function () {
	var removed = this.root.val;
	var curr = this.root;
	print("tree: " + stringifyTree(this.root));
	while (curr) {
	    if (curr.right) {
		// we must have a left if we have a right
		if (curr.left.val > curr.right.val)
		    curr = curr.left;
		else
		    curr = curr.right;
	    } else if (curr.left)
		curr = curr.left; // we only have a left
	    else	
		break; // we are at the bottom of the heap!
	    curr.swapVals(curr.parent);
	}
	if (curr == this.root) {
	    // the heap is empty, so set it to the initial state
	    this.lastadded = this.freespot = this.root = null;
	    return removed;
	}
	curr.swapVals(this.lastadded);
	curr = this.lastadded;
	// find the node that would have been the previous inserted
	this.findPreviousInserted();
	if (curr.isLeftChild())
	    curr.parent.left = null;
	else
	    curr.parent.right = null;
	// we removed a node so the next insertion should go here
	this.freespot = curr.parent;
	return removed;
    }

    this.findPreviousInserted = function () {
	var curr = this.lastadded;
	// move up the tree until we are a right child or root
	while (curr.parent && curr.isLeftChild())
	    curr = curr.parent;
	// if we are a right child switch to left subtree
	if (curr.parent)
	    curr = curr.parent.left;
	// move down as far right as we can
	while (curr.right)
	    curr = curr.right;
	this.lastadded = curr;
    }
}


function generateNumberArray(num) {
    arr = new Array();
    while (--num >= 0) {
	arr[num] = Math.floor(Math.random() * 100);
    }
    return arr;
}

function buildHeap(vals) {
    h = new Heap();
    for (i in vals) {
	h.add( new Node(vals[i]) );
    }
    return h;
}

function heapSort(vals) {
    var h = buildHeap(vals);
    var sorted = new Array(vals.length);
    for (var i = 0; h.root; i++) {
	sorted[i] = h.removeRoot();
    }
    return sorted;
}

function main(num) {
    //var vals = generateNumberArray(num || 10);
    var vals = [ 19, 38, 33, 4, 93, 88, 31, 64, 71, 5 ];
    print(vals);
    var s = heapSort(vals);
    print(s);
}
main();


// [ 19, 38, 33, 4, 93, 88, 31, 64, 71, 5 ]
// [ 93, 88, 71, 64, 38, 33, 19, 31, 5, 4 ]