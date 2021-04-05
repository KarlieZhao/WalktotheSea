let crtSentenceIndex = 0;
let leftMargin;

let reloadBtnPos, endBtnPos;
let reloadBtnL, endBtnL;

function generateNewText() {

  let t = RiTa.tokenize(sentences[crtSentenceIndex]);
  let isClickable = false;
  let isPoem = false;
  let isConjunctWord = false;

  let lineHeight = 1.7 * (textAscent() + textDescent());

  text_ypos += lineHeight;
  text_xpos = leftMargin;

  for (let i = 0; i < t.length; i++) {

    if (t[i].charAt(t[i].length - 1) == '[') {
      t[i] = t[i].substr(0, str.length - 1); //get rid of the '['
      isClickable = true;

    } else if (t[i].charAt(t[i].length - 1) == ']') {
      t[i] = t[i].substr(0, str.length - 1); //get rid of the ']'
      isClickable = false;
    } else if (t[i].charAt(t[i].length - 1) == '{') {
      t[i] = t[i].substr(0, str.length - 1);
      isPoem = true;

    } else if (t[i].charAt(t[i].length - 1) == '}') {
      t[i] = t[i].substr(0, str.length - 1);
      isPoem = false;
    } else if (t[i].charAt(t[i].length - 1) == '(') {
      t[i] = t[i].substr(0, str.length - 1);
      isConjunctWord = true;

    } else if (t[i].charAt(t[i].length - 1) == ')') {
      t[i] = t[i].substr(0, str.length - 1);
      isConjunctWord = false;
    }

    if (text_xpos >= width - 1.1 * leftMargin && !RiTa.isPunct(t[i])) {
      text_ypos += lineHeight;
      text_xpos = leftMargin;
    }

    let pos = createVector(text_xpos, text_ypos);
    if (t[i] != "") {
      elements.push(new Element(t[i], pos, isClickable, isPoem, isConjunctWord));
    }

    if (crtSentenceIndex == sentences.length - 3) {
      if (t[i] == "and") {
        reloadBtnPos = createVector(text_xpos, text_ypos);
        reloadBtnL = textWidth(" and everything ");
      } else if (t[i] == "fading") {
        endBtnPos = createVector(text_xpos, text_ypos);
        endBtnL = textWidth("fading away ");
      }
    }

    text_xpos += RiTa.isPunct(t[i + 1]) ? textWidth(t[i]) : textWidth(t[i] + " ");
    if (t[i] == "." || t[i] == "?") {
      text_xpos = leftMargin;
      text_ypos += lineHeight;
    }
  }
  crtSentenceIndex++;
}

//-------------------------------------------------
let re = /[\s,]/;

async function loadjson() {
  let f = await fetch('waste.json');
  let response = await f.json();
  
  for (let i = 0; i < 45; i++) {
    wastesListPairs[i] = {
      "symbol": response[i].symbol,
      "text": response[i].text
    };
  }
  var userLanguage = getFirstBrowserLanguage();
  console.log("Browser Language: " + userLanguage);

  for (let i = 0; i < wastesListPairs.length; i++) {
    if (userLanguage.toLowerCase() == wastesListPairs[i].symbol) {
      wordInUserLanguage = wastesListPairs[i].text.split(re);
      break;
    } else {
      if (i == wastesListPairs - 1) {
        console.log("Fail to identify browser language, set language to English.");
        wordInUserLanguage = wastesListPairs[0].text.split(re); //default: English;
      }
    }
  }
}

async function getCountryLang() {
  try {
    const ipresponse = await fetch('https://api.ipify.org/?format=json');
    let response = await ipresponse.json();
    let ip = response.ip;
    console.log("IP:" + ip);

    const country = await fetch('https://json.geoiplookup.io/' + ip);
    let res = await country.json();
    let ctyCode = res.country_code.toLowerCase();
    let cryName = res.country_name;
    console.log("Country code: " + ctyCode);
    const langRes = await fetch('https://restcountries.eu/rest/v2/alpha/' + ctyCode);
    let resp = await langRes.json();
    let lang = resp.languages[0].iso639_1;
    console.log("Language code: " + lang);
    for (let i = 0; i < wastesListPairs.length; i++) {
      if (lang.toLowerCase() == wastesListPairs[i].symbol) {
        wordIncountryLanguage = wastesListPairs[i].text.split(re);
        break;
      }
    }
    localizedWords = wordInUserLanguage.concat(wordIncountryLanguage);
  } catch (err) {
    console.log('Error -> ', err);
    wordIncountryLanguage = wordInUserLanguage;
  }
}
