// let devideOps = 0 , multiplyOps = 0 , addOps = 0 , subOps = 0, result = 0;
// let exp = "6/33*2+3+3-3-55";
// let operator = ["/", "*", "+", "-"];
// let expNumArr = exp.split('/').join('*').split('*').join('+').split('+').join('-').split('-')
// console.log(expNumArr)
// let expOpArr = exp.split('0').join('1').split('1').join('2').split('2').join('3').split('3').join('4').split('4').join('5').split('5').join('6').split('6').join('7').split('7').join('8').split('8').join('9').split('9').join('').split('');
// console.log(expOpArr)
// let expArr = exp.split('');






// for (let i = 0; i < expNumArr.length; i++) {
//     if (expNumArr[i]%2 == 1) {
//         expNumArr.splice(i+1, 0, value);
//     }
// }
// expArr.forEach(opsClassify);
// ///////////////////////////
// function opsClassify (value, index) {
//     if(operator.includes(value)){
//         if (value == "*") {
//             multiplyOps++;
//         } else if (value == "/") {
//             devideOps++;
//         } else if (value == "+") {
//             addOps++;
//         } else if (value == "-") { 
//             subOps++;
//         }
//     }
// }
// ///////////////////////////


// console.log(devideOps, multiplyOps, addOps, subOps)

// // let a = "2*2-1";
// // let b = Number(a)
// // console.log(typeof a)
// // console.log(a)
// // console.log(b)df

// let exArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// exArr.push(10)
// console.log(exArr)

function calculate(expression) {
    try {
        
        // () =>{ return expression};
        // console.log(new Function('return ' + expression)())
        const result = new Function('return ' + expression)();
        return result
    } catch (error) {
        return "Invalid Expression";
    }
}

console.log(calculate());
