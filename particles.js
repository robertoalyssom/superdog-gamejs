class Particles {
  constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
  }
  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.97; // decreasing by 5%
    if (this.size < 0.5) this.markedForDeletion = true;
  }
}

export class Dust extends Particles {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 10 + 10; // 10/20
    this.x = x;
    this.y = y;
    this.speedX = Math.random(); // 0/1
    this.speedY = Math.random();
    this.color = "rgba(0, 0, 0, 0.2)";
  }
  draw(context) {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.restore();
  }
}

export class Splash extends Particles {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 100 + 100; // 100/200
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 4; // -4/4
    this.speedY = Math.random() * 2 + 2;
    this.gravity = 0;
    this.image = fire;
  }
  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}

export class Fire extends Particles {
  constructor(game, x, y) {
    super(game);
    this.image = fire;
    this.size = Math.random() * 100 + 50; // 50/150
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1; // velocity of angle = -0.1/0.1
  }
  update() {
    super.update();
    this.angle += this.va;
    this.x += Math.cos(this.angle * 5);
  }
  draw(context) {
    context.save();
    context.translate(this.x, this.y); // new canvas position / drawImage's x, y positions
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      -this.size * 0.5 + 45,
      -this.size * 0.5 + 45,
      this.size,
      this.size
    );
    context.restore();
  }
}
