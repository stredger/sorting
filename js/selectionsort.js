
var comm = require('./common.js');

function selectionSort(arr) {
    for (var i = 0; i < arr.length; i++) {
	var largest = i;
	for (var j = i+1; j < arr.length; j++) {
	    if (arr[j] > arr[largest]) {
		largest = j;
	    }
	}
	if (largest != i) {
	    var tmp = arr[i];
	    arr[i] = arr[largest];
	    arr[largest] = tmp;
	}
    }
}


function main(num) {
    var arr = comm.generateNumberArray(num || 10);
    comm.print(arr);
    selectionSort(arr);
    comm.print(arr);
}
main();