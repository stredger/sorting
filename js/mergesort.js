
var comm = require('./common.js');


function findMax(arr, lists) {
    var p0 = arr[lists[0]];
    var p1 = arr[lists[1]];
    var p2 = arr[lists[2]];
    if (p0 >= p1 && p0 >= p2)
	return 0;
    if (p2 > p1)
	return 2;
    return 1;
}

function mergeSort(arr) {
    if (arr.length == 1)
	return [arr[0]];
    var mid = Math.floor( (arr.length) / 2);
    if (!mid) 
	return arr;
    var l = mergeSort(arr.slice(0, mid));
    var r = mergeSort(arr.slice(mid, arr.length));
    for (var rp = lp = i = 0; i < arr.length; i++) {
	if (lp >= l.length)
	    for (i; i < arr.length; rp++, i++)
		arr[i] = r[rp];
	else if (rp >= r.length)
	    for (i; i < arr.length; lp++, i++)
		arr[i] = l[lp];
	else
	    arr[i] = l[lp] > r[rp] ? l[lp++]: r[rp++];
    }
    return arr;
}

function main(num) {
    var arr = comm.generateNumberArray(num || 10);
    comm.print(arr);
    arr = mergeSort(arr);
    comm.print(arr);
}
main();