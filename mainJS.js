let words = [];
let elements = [];
let text_xpos;
let text_ypos = 100;

let wordInUserLanguage = [];
let wordIncountryLanguage = [];
let localizedWords = [];
var wastesListPairs = [];
let canvasW;
let canvasH = 3200;

let enFont;
let secondFont = "New Tegomin";

function preload() {
  loadjson();
  getCountryLang();
  enFont = loadFont("NewTegomin-Regular.ttf");
}

function setup() {
  frameRate(30);
  canvasW = windowWidth;
  createCanvas(canvasW, canvasH);
  leftMargin = width / 4;
  textFont(enFont);
  textSize(19);
  // textFont("Amiri");
  background(0, 0);
  loadSentences();
  generateNewText();
}

function mouseClicked() {
  words = [];
  if (crtSentenceIndex < sentences.length) {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].mouseInsideText() && elements[i].clickable) {
        if (crtSentenceIndex == sentences.length - 2) {
          if (elements[i].word == "and" || elements[i].word == "everything") {
            //restart
            crtSentenceIndex++;
          }
        }
        elements.forEach((item) => {
          item.clickable = false;
        });
        elements[i].isTouched = false;
        generateNewText();
      }
    }
  } else if (crtSentenceIndex >= sentences.length) {
    restart();
  }
}

function scrollWindow() {
  window.scrollTo(0, 0);
}

function restart() {
  crtSentenceIndex = 0;
  text_xpos = leftMargin;
  text_ypos = 100;

  let newArr = elements.filter(item => (item.isTouched == true && item.isPoem == false));
  elements = newArr;
  scrollWindow();
  generateNewText();
}


function draw() {
  // if (frameCount % 50 == 0) {
  //   console.log(frameRate().toFixed(2));
  // }
  clear();
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
    if (elements[i].mouseInsideText() && !elements[i].clickable && elements[i].appeared) {
      elements[i].isTouched = true;
    }
  }
  let newArr = elements.filter(item => (item.c > 0));
  elements = newArr;

}
