//QUESTION1
//array method
//1. length
let colors=["red", "green", "blue", "yellow", "black", "white"];
console.log(colors.length);
console.log(colors);

//2.toString -> converts array to string
let string = colors.toString();
console.log(string);

//3. Join -> creates and returns a new string by concatenating all elements of an array
//-> it uses a specified seperator between each element
console.log(colors.join("||"));

/*4. delete -> it is used to delete the given value which 
can be an object, array, etc..*/
let stu = {
    name: "Rahul", rollno: 12, course: "CSE"
}
console.log(stu);
console.log(delete stu.course);
console.log(stu);

//5. concat -> used to concatinate two or more arrays and it gives the merged array
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [7,8,9];
let mergedArr = arr1.concat(arr2, arr3);
console.log(mergedArr);

//6. flat -> flatten the array i.e. it merges all the given array and reduces all the nesting present in it.
const arr = [['1', '2'], ['3', '4', '5',['6'], '7']];

const flatArr= arr.flat(Infinity);
console.log(flatArr);

//7. push -> add an element at the end of an Array.
colors.push("pink", "purple");
console.log(colors);

//8. unshift -> is used to add elements to the front of an Array.
colors.unshift("brown");
console.log(colors);

//9. pop -> remove elements from the end of an array. 
colors.pop();
console.log(colors);

//10. shift -> remove elements from the beginning of an array 
colors.shift();
console.log(colors);

//QUESTION2

//QUESTION3
//we can use Array.isArray method

function is_array(input) {
    return Array.isArray(input);
  }
  
  console.log(is_array('w3resource')); 
  console.log(is_array([1, 2, 4, 0]));   
  
// QUESTION4
//We can use slice or spread method
//method1 -> slice
function array_Clone(arr) {
    return arr.slice(0);
}

console.log(array_Clone([1, 2, 4, 0]));      
console.log(array_Clone([1, 2, [4, 0]]));   
  
//method2 -> spread

function array_Clone(arr){
    return [...arr];
}

console.log(array_Clone([1, 2, 4, 0]));      
console.log(array_Clone([1, 2, [4, 0]]));    

//QUESTION5
//we can use slice method
function first(arr, n=1){
    if (n<0){
        return "error: cannot take negative value";
    }
     return arr.slice(0, n);
}
console.log(first([7, 9, 0, -2]));
console.log(first([],3));
console.log(first([7, 9, 0, -2],3));
console.log(first([7, 9, 0, -2],6));
console.log(first([7, 9, 0, -2],-3));