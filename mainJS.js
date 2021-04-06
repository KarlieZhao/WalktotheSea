/* Sound source: freesound.org
licensed under the Creative Commons 0 License.
Great thanks to @pulswelle. Link to the file: https://freesound.org/s/339517/ */

let words = [];
let elements = [];
let text_xpos;
let text_ypos = 160;

let wordInUserLanguage = [];
let wordIncountryLanguage = [];
let localizedWords = [];
var wastesListPairs = [];
let canvasW;
let canvasH = 3200;

let firstFont = "New Tegomin";
let lastSentence = 0;
let waveSound;
let headLine;

function preload() {
  loadjson();
  getCountryLang();
  waveSound = loadSound('wave.mp3');
}

function setup() {
  frameRate(30);
  canvasW = windowWidth;
  createCanvas(canvasW, canvasH);
  leftMargin = width / 4;
  textFont(firstFont);
  textSize(19);
  background(0, 0);

  waveSound.amp(0.4);
  lineHeight = 1.7 * (textAscent() + textDescent());

  loadSentences();
  loadHeading("Listen to the sound of the sea");
  generateNewText();
}

function loadHeading(t) {
  let soundButton = t;
  let pos = createVector(leftMargin, 100);
  headLine = new Element(soundButton, pos, true, false, false);
}

function mouseClicked() {
  words = [];
  if (headLine.mouseInsideText()) {
    if (!waveSound.isPlaying()) {
      waveSound.loop();
      loadHeading("Stop listening");
    } else {
      waveSound.pause();
      loadHeading("Listen to the sound of the sea");
    }
  }

  if (crtSentenceIndex < sentences.length) {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].mouseInsideText() && elements[i].clickable) {
        if ((crtSentenceIndex == sentences.length - 2) && (elements[i].word == "and" || elements[i].word == "everything")) {
          crtSentenceIndex++;
        }
        elements.forEach((item) => {
          item.clickable = false;
        });

        elements[i].isTouched = false;
        generateNewText();
      }
    }
  } else {
    restart();
  }
}

function scrollWindow() {
  window.scrollTo(0, 0);
}

function restart() {
  crtSentenceIndex = 0;
  text_xpos = leftMargin;
  text_ypos = 160;

  let newArr = elements.filter(item => (item.isTouched == true && item.isPoem == false));
  elements = newArr;
  scrollWindow();
  generateNewText();
}


function draw() {
  clear();
  createFlowField();
  headLine.render();

  for (let i = 0; i < elements.length; i++) {
    elements[i].render();
  }

  //cursor changed to hand -> clickable
  if (headLine.mouseInsideText()) {
    cursor(HAND);
  } else {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].clickable && elements[i].mouseInsideText()) {
        cursor(HAND);
        break;
      } else {
        cursor(ARROW);
      }
    }
  }

  for (let i = 0; i < elements.length - lastSentence; i++) {
    if (elements[i].mouseInsideText() && !elements[i].clickable && elements[i].appeared) {
      elements[i].isTouched = true;
    }
  }
  let newArr = elements.filter(item => (item.c > 0));
  elements = newArr;
}
