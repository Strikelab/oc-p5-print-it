//--------------------------------//
//       JSON Data Format         //
//--------------------------------//

//---------slides datas-----------//

const slides = [
  {
    image: "slide1.jpg",
    tagLine: "Impressions tous formats <span>en boutique et en ligne</span>",
  },
  {
    image: "slide2.jpg",
    tagLine:
      "Tirages haute définition grand format <span>pour vos bureaux et events</span>",
  },
  {
    image: "slide3.jpg",
    tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>",
  },
  {
    image: "slide4.png",
    tagLine: "Autocollants <span>avec découpe laser sur mesure</span>",
  },
];

//--------------------------------//
//           variables            //
//--------------------------------//

//initialise for global scope
let shiftDirection = null;
//copy slides for work on copy
let slidesToShow = slides;
// initialize slideNumber
let slideNumber = 1;

//---------------------------------//
//     Generate DOM elements       //
//---------------------------------//

//-----------banner-img------------//

//select parent for banner img and dots
const divBanner = document.querySelector("#banner");
//create banner
let bannerImg = document.createElement("img");
//set src to banner img
bannerImg.src = `./assets/images/slideshow/${slidesToShow[0].image}`;
//set class to banner img
bannerImg.setAttribute("class", "banner-img");
//add banner to DOM
divBanner.appendChild(bannerImg);

//--------banner-tagline----------//

//create element p for tagline
let bannerTagLine = document.createElement("p");
//insert html tagline inside p
bannerTagLine.innerHTML = slidesToShow[0].tagLine;
//add tagline to DOM
divBanner.appendChild(bannerTagLine);

//---------banner-dots------------//

//select parent div for dots
const divDots = document.querySelector("#banner .dots");
//genenerate 1 bullet point for an object in slides list.
for (let i = 0; i < slidesToShow.length; i++) {
  //create div bullet point
  let divDot = document.createElement("div");
  //add div bullet point to DOM
  divDots.appendChild(divDot);
  //set class to div bullet point
  divDot.setAttribute("class", "dot");
  //active first bullet point
  if (i === 0) {
    divDot.classList.add("dot_selected");
  }
}

//---------------------------------//
//      click event Listener       //
//---------------------------------//

document.addEventListener("click", function (clicBanner) {
  //click on left arrow
  if (clicBanner.target.matches(".arrow_left")) {
    shiftDirection = "left";
    shiftAndShow(shiftDirection, slidesToShow);
    activeDot(shiftDirection);
  }
  //click on right arrow
  if (clicBanner.target.matches(".arrow_right")) {
    shiftDirection = "right";
    shiftAndShow(shiftDirection, slidesToShow);
    activeDot(shiftDirection);
  }
});

//---------------------------------//
//            functions            //
//---------------------------------//

//--- function "shift and show" ---//

/**
 * This function takes an array of objects and moves the first element
 * to the right or to the left accodding to shiftDirection value
 * @param {string} shiftDirection - values : "left" "right"
 * @param {array} arrayToShift - takes an array of objects as argument
 */

function shiftAndShow(shiftDirection, arrayToShift) {
  //shift:
  //elements to show will ever be the first one of the arrayToShift

  if (shiftDirection === "left") {
    //pop() method remove and return the last element of an array
    //unshift method add a new item at the begining on an array
    //move elements in array to the left
    //example : fruits = [apple, strawberry, raspberry] --> fruits = [raspberry, apple, strawberry]
    arrayToShift.unshift(arrayToShift.pop());
  }
  if (shiftDirection === "right") {
    //shift() method remove and return the first element of an array
    //push method add a new item to the end of an array
    //move elements in array to the right
    //example : fruits = [apple, strawberry, raspberry] --> fruits = [strawberry, raspberry, apple]
    arrayToShift.push(arrayToShift.shift());
  }
  //Show:
  //change src img according to json list
  bannerImg.src = `./assets/images/slideshow/${arrayToShift[0].image}`;
  //change banner tagline according to json list
  bannerTagLine.innerHTML = arrayToShift[0].tagLine;
}

//----- function "active Dot" -----//

/**
 *  this function unset current .dot_selected class
 *  and set it to a new one according to the slide number
 * @param {string} shiftDirection - values : "left" "right"
 */

function activeDot(shiftDirection) {
  if (shiftDirection === "left") {
    //infinite count 1-4-3-2-1... for dot activation
    slideNumber === 1 ? (slideNumber = slides.length) : slideNumber--;
  }
  if (shiftDirection === "right") {
    //infinite count 1-2-3-4-1... for dot activation
    slideNumber === slides.length ? (slideNumber = 1) : slideNumber++;
  }
  //select dot active
  let dotActive = document.querySelector(".dot_selected");
  //desactive dot
  dotActive.classList.remove("dot_selected");
  //select dot according to slide number
  let dotToActive = divDots.querySelector(`:nth-child(${slideNumber})`)
  //activate this dot
  dotToActive.classList.add("dot_selected");
}
