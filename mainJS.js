let words = [];
let elements = [];
let text_xpos;
let text_ypos = 100;
let sortedWords = [];

let noiseLine = [];
let nIndex = 0;

let highest = [];
let lowest = [];

let newsTxt = "";

let windowIsResized = false;

let wordInUserLanguage = [];
let wordIncountryLanguage = [];
let localizedWords = [];
var wastesListPairs = [];
let canvasH = 3000;
  loadjson();
getCountryLang();


function setup() {
  createCanvas(windowWidth, canvasH);
  textSize(18);
  textFont("Courier New");
  background("#152038");
  loadSentences();
  generateNewText();

    for (let i = 0; i < elements.length; i++) {
    elements[i].render();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, canvasH);
  windowIsResized = true;
}

function mouseClicked() {
  words = [];
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].mouseInsideText()) {

      for (let j = i - 5; j < elements.length-1; j++) {
        elements[j].clickable = false;
        elements[i].isTouched = true;
      }
      generateNewText();
      break;
    }
  }
}

function draw() {
  // if(frameCount<=10){
    localizedWords = wordInUserLanguage.concat(wordIncountryLanguage);
  // }
  background("#152038");

  windowIsResized = false;
  createFlowField();

  for (let i = 0; i < elements.length; i++) {
    elements[i].render();
  }

  //cursor changed to hand -> clickable
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].clickable && elements[i].mouseInsideText()) {
      cursor(HAND);
      break;
    } else {
      cursor(ARROW);
    }
  }

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].mouseInsideText() && !elements[i].clickable) {
      elements[i].isTouched = true;
    }
  }
  // console.log("L: "+ elements.length);
  let newArr = elements.filter(item => (item.c > 0));
  elements = newArr;

}
