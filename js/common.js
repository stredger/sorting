
module.exports = {
    
    print: function (s) {
	console.log(s);
    },

    generateNumberArray: function (num) {
	arr = new Array();
	while (--num >= 0) {
	    arr[num] = Math.floor(Math.random() * 100);
	}
	return arr;
    }
};
