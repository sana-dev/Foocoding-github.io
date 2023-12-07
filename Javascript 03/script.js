// 01
let myString="hello,this,is,a,difficult,to,read,sentence";
console.log(myString.length);
console.log(myString.replaceAll(/,/g," "));
//02



let favoriteAnimals = ["blowfish", "capricorn", "giraffe"];

favoriteAnimals.push("Mauro's favorite animal is 'turtle'.");

favoriteAnimals.splice(1,0, "Jim's favorite animal is 'Meerkat'");


console.log(favoriteAnimals);
console.log("the array has a length of: " +  favoriteAnimals.length);

favoriteAnimals.splice(3,1);
console.log(favoriteAnimals);

console.log("the item you are looking here has a index:" + favoriteAnimals.indexOf("Jim's favorite animal is 'Meerkat'"));

