let maxSpeed = 0.6;

class Element {
  constructor(w, p, clickable) {
    this.word = w;
    this.pos = p;
    this.clickable = clickable;

    this.weight = map(this.word.length, 1, 15, 1, 5);
    this.weight=constrain(this.weight,1,100);
    this.landPos = random(-50, -5);

    //-----------------------------------
    this.isTouched = false;
    this.switch = false;
    this.speed = createVector(0, 0);
    this.acc = createVector(0, this.weight / 5);
    this.c = 250; //transparency
    this.crtLife = 0;

    if (!RiTa.isPunct(this.word)) {
      this.maxLife = random(4000, 7000);
    } else {
      this.maxLife = random(2000, 3500);
    }
  }
  //-----------------------------------
  applyForce(force) {
    this.acc.add(force);
    this.speed.add(this.acc.div(this.weight));
    this.speed.y += this.weight/100;
    this.speed.limit(maxSpeed);
    this.pos.add(this.speed);
  }

  newWord() {
    if (!RiTa.isPunct(this.word)) {
      this.word = random(localizedWords);
    } else {
      this.word = "。";
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
    if (this.pos.x > width + 30 || this.pos.x < -30 || this.pos.y < -30) {
      this.crtLife = this.maxLife;
      this.isTouched = false;
    }else if (this.pos.y >= largestH + this.landPos) {
      this.acc.mult(0);
      this.speed.mult(0);
      //this.isTouched = false;
      this.maxLife++;
    } else if (this.isTouched && this.c >= 50) {
      this.follow(flowfield);
    }
  }

  update() {
    if (this.crtLife >= this.maxLife) {
      this.c -= 2;
    } else {
      this.crtLife++;
    }
    if (this.switch) {
      this.move();
    } else if (this.isTouched) {
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
