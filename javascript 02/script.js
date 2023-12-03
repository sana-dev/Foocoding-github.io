//1
console.log("Hello World");//English
console.log("Salam Duniya");//Urdu
console.log("hej Världen");//Swedish
console.log("Γειά σου Κόσμε");//Greek

//2
console.log("I'm awesome'");
//3
var x;
console.log ("the value of my variable x will be: undefined");
console.log(x);
x =21;
console.log ("the value of my variable x will be: 21") ;
console.log(21);
//4
let y ="This is Javascript file"
console.log(" the value of this string will be:This is Javascript file\n");
console.log(y);


//5
const z =7.25;
console.log(z);
let a = Math.floor(z);
console.log(a);

//6
const bookstore=[];
console.log(bookstore);

const animals=["lynx","orca","deer","cat","cheetah"];
console.log(animals);
animals.push("baby pig");
console.log(animals);

//7
let myString = "this is my string";
console.log(myString);
console.log (myString.length);
console.log (myString.size);

//8 
const foo =3;
const moo = true;
const nor = "this is foocoding";
const doo ="yes";
console.log("The value of my variable foo is: " + foo);
console.log("The value of my variable foo is: " + moo);
console.log("The value of my variable foo is: " + nor);
console.log("The value of my variable foo is: " + doo);

console.log("The value of my variable foo is: " + typeof foo);
console.log("The value of my variable foo is: " + typeof moo);
console.log("The value of my variable foo is: " + typeof nor);
console.log("The value of my variable foo is: " + typeof doo);


function typeofvariable( foo,moo,nor,doo) 
{
  if (typeof foo === typeof moo && typeof moo === typeof nor && typeof nor === typeof doo)
  {
    console.log("same data type");
  }
  else {
    console.log("not same data type");
  }
  
};
typeofvariable(foo,moo,nor,doo);
typeofvariable(foo,moo);
typeofvariable(foo,nor);
typeofvariable(foo,doo);
typeofvariable(nor,doo);

//9 
const x =7;
 y = x;
y = x % 3;
console.log (y);

//10
         
const infinity01 = 6 / 0;
const infinity02 = 10 / 0;

console.log("6/0:", infinity01);
console.log("10/0:", infinity02);

if (infinity01 === infinity02) {
  console.log("6/0 is equal to 10/0");
} else {
  console.log("6/0 is not equal to 10/0");
}