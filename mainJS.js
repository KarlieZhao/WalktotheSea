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

let wordInUserLanguage = [];
let wordIncountryLanguage = [];
let localizedWords = [];
var wastesListPairs = [];
let canvasW;
let canvasH = 3700;

let enFont = "New Tegomin";
let secondFont = "New Tegomin";

loadjson();
getCountryLang();


function setup() {
  canvasW = windowWidth;
  createCanvas(canvasW, canvasH);
  textSize(19);
  textFont("New Tegomin");
  // textFont("Amiri");
  background(0, 0);
  loadSentences();
  generateNewText();

  for (let i = 0; i < elements.length; i++) {
    elements[i].render();
  }
}
let count = 0;
let startCounting = false;

function mouseClicked() {
  words = [];
  //resizeCanvas(canvasW, canvasH);
  if (crtSentenceIndex == sentences.length - 2) {
    startCounting = true;
  }
  if (crtSentenceIndex < sentences.length) {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].mouseInsideText() && elements[i].clickable) {
        elements.forEach((item) => {
          item.clickable = false;
        });

        elements[i].isTouched = false;
        generateNewText();
        break;
      }
    }
  }
}


function draw() {
  // if(frameCount<=10){
  localizedWords = wordInUserLanguage.concat(wordIncountryLanguage);
  // }
  clear();
  createFlowField();
  if (startCounting) {
    count++;
  }
  if (count == 300) generateNewText();

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
