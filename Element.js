class Element {
  constructor(w, p, clickable) {
    this.word = w;
    this.pos = p;
    this.clickable = clickable;

    //weight and gravity system
    if (this.word.length >= 7) {
      this.weight = 10;
      this.landPos = random(-40, 0);
    } else if (this.word.length >= 4) {
      this.weight = 5;
      this.landPos = random(-5, 40);
    } else {
      this.weight = 1;
      this.landPos = random(-10, 20);
    }
    //-----------------------------------
    this.isTouched = false;
    this.reachTop = false;
    this.switch = false;

    this.speed = createVector(0, 0);
    this.acc = createVector(0, 0.07);
    this.c = 250; //transparency

    this.maxSpeed = 1;
    this.crtLife = 0;

    if (!RiTa.isPunct(this.word)) {
      this.maxLife = random(1800, 2000);
    } else {
      this.maxLife = random(500, 700);
    }
  }
  //-----------------------------------
  applyForce(force) {
    this.acc.add(force);
    this.speed.add(this.acc);
    this.pos.add(this.speed);
  }

  wrap() {
    if (this.pos.x > width || this.pos.x < 0) {
      this.crtLife = this.maxLife;
      this.isTouched = false;
    }
    if (this.pos.y >= canvasH) {
      this.acc.mult(0);
      this.speed.mult(0);
      isTouched = false;
    }
  }

  newWord() {
    if (!RiTa.isPunct(this.word)) {
      this.word = random(localizedWords);

    } else {
      this.word = "。";
    }
    if (this.weight == 1) {
      this.acc = createVector(0, 0.2);
    } else if (this.weight == 5) {
      this.acc = createVector(0, 0.6);
    } else {
      this.acc = createVector(0, 1.2);
    }
  }

  follow(vector) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);

    var index = x + y * cols;
    var force = vector[index];
    this.applyForce(force);
  }

  move() {
    if (this.pos.y >= height + this.landPos) {
      this.acc.mult(0);
      this.speed.mult(0);
      this.pos.add(this.speed);
      this.isTouched = false;
    } else if (this.pos.y <= noiseLine[floor(this.pos.x / 5)].y + this.landPos) {
      this.reachTop = true;
    } else if (this.isTouched && this.c >= 50) {
      this.follow(flowfield);
    }
  }

  update() {
    this.wrap();
    if (this.crtLife >= this.maxLife) {
      this.c -= 2;
    } else {
      this.crtLife++;
    }

    this.speed.limit(this.maxSpeed);

    if (this.switch) {
      this.move();
    }else if (this.isTouched) {
      if (!RiTa.isPunct(this.word)) {
        this.maxLife = random(3000, 5000);
      }
      if (this.c == 50) {
        this.switch = true;
        this.newWord();
      }
      if (!this.switch) {
        if (this.c > 50) {
          this.c -= 10;
        }
      } else if (this.c < 180) {
        this.c += 10;
      }
      //isTouched = false;
    } else {

      if (this.crtLife >= this.maxLife * 0.8) {
        this.isTouched = true;
      }
    }

    if (this.reachTop) {
      this.isTouched = false;
      if (this.pos.x > 0 && this.pos.x < width) {
        this.pos.y = noiseLine[floor(this.pos.x / 5)].y + this.landPos;
      }
      this.acc = createVector(0, 0);
      this.speed = createVector(0, 0);
      this.force = 0;
    }
  }

  render() {
    if (this.clickable) {
      stroke(255, this.c);
      strokeWeight(1);
      line(this.pos.x, this.pos.y + 1.2 * textDescent(), this.pos.x + textWidth(this.word + " "), this.pos.y + 1.2 * textDescent());
    } else {
      this.update();
    }
    fill(255, this.c);
    noStroke();
    text(this.word, this.pos.x, this.pos.y);
  }


  mouseInsideText() {
    let top = this.pos.y - textAscent();
    let bottom = this.pos.y + textDescent();

    return (mouseX > this.pos.x && mouseX < this.pos.x + textWidth(this.word) &&
      mouseY > top && mouseY < bottom);
  }

}
