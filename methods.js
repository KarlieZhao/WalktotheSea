let crtSentenceIndex = 0;

function generateNewText() {
  let t = RiTa.tokenize(sentences[crtSentenceIndex % 16]);
let isClickable =false;

  let lineHeight = 1.2 * (textAscent() + textDescent());
  text_ypos += lineHeight / 2;
  text_xpos = width / 3.5;

  for (let i = 0; i < t.length; i++) {

    if (t[i].charAt(t[i].length - 1) == '[') {
      t[i] = t[i].substr(0, str.length - 1); //get rid of the '['
    isClickable=true;

    } else if (t[i].charAt(t[i].length - 1) == ']') {
      t[i] = t[i].substr(0, str.length - 1); //get rid of the ']'
        isClickable=false;
    }

    if (text_xpos >= width - width / 3.5) {
      text_ypos += lineHeight;
      text_xpos = width / 3.5;
    }

    let pos = createVector(text_xpos, text_ypos);

      elements.push(new Element(t[i], pos, isClickable));

      text_xpos += RiTa.isPunct(t[i + 1]) ? textWidth(t[i]) : textWidth(t[i] + " ");

    if (t[i] == ".") {
      text_xpos = width / 3.5;
      text_ypos += lineHeight;
    }
  }


  crtSentenceIndex++;
}

//-------------------------------------------------

// let response = await fetch('coffee.jpg');
//   let myBlob = await response.blob();
//
//   let objectURL = URL.createObjectURL(myBlob);
//   let image = document.createElement('img');
//   image.src = objectURL;
//   document.body.appendChild(image);
// }


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
      wordInUserLanguage = wastesListPairs[i].text.split(",");
      break;
    } else {
      if (i == wastesListPairs - 1) {
        console.log("Fail to identify browser language, set language to English.");
        wordInUserLanguage = wastesListPairs[0].text.split(","); //default: English;
      }
    }
  }
}

async function getCountryLang() {
  let ipresponse = await fetch('https://api.ipify.org/?format=json');
  let response =await ipresponse.json();
  let ip = response.ip;
  console.log(ip);
  let country = await fetch('https://json.geoiplookup.io/' + ip);
  let res = await country.json();
  let ctyCode = res.country_code.toLowerCase();
  console.log("Country code: " + ctyCode);

  let langRes = await fetch('https://restcountries.eu/rest/v2/alpha/' + ctyCode);
  let resp=await langRes.json()
  let lang = resp.languages[0].iso639_1;

  console.log("Language code: " + lang);
  for (let i = 0; i < wastesListPairs.length; i++) {
    if (lang.toLowerCase() == wastesListPairs[i].symbol) {
      wordIncountryLanguage = wastesListPairs[i].text.split(",");
      break;
    }
  }
  console.log(wordIncountryLanguage);
}
