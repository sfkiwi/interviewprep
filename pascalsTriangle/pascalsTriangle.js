/*Given numRows, generate the first numRows of Pascal's triangle.

For example, given numRows = 5,
    Return

[
0: [1],
1: [1, 1], //0
2: [1, 2, 1], //1 1
3: [1, 3, 3, 1], //2 0 2
4: [1, 4, 6, 4, 1] //3 2 2 3
5: [1, 5, 10, 20, 30, 1]


7: []
]


The value at the nth row and rth column of the triangle is 
equal to n!/(r!*(n-r)!) where indexing starts from 0. 
These values are the binomial coefficients.
*/


var factorial = function (n) {

    if (n === 1) {
        return 1;
    }

    return n * factorial(n - 1);
}

var pascalsTriangle = function(n) {

    var inner = function(n) {
        if (n === 1) {
            return [1];
        }

        var arr = [];
        arr.push(1);
        for( var i = 1; i < n; i++) {
            arr.push(factorial(n) / (factorial(i) * factorial(n-i)))
        }
        arr.push(1);
        console.log(arr);
        
        solution.push(inner(n-1));
       
        return arr;
    }
    var solution = [];
    solution.push(inner(n))
    
    return solution;
}



