class SnakeGame {
  constructor() {
    this.box = document.querySelector('.game-box');
    this.snake = document.querySelector('.snake');
    this.speed = 300;
    this.score = 0;
    this.intervalId;
    this.boxParams = {
      width: this.box.getBoundingClientRect().width,
      height: this.box.getBoundingClientRect().height,
      top: this.box.getBoundingClientRect().top,
      left: this.box.getBoundingClientRect().left
    };
    this.direction = 'up';
    document.addEventListener('keydown', this.keyListener.bind(this));
  }
  
  start() {
    let interval = setInterval(this.moveStart.bind(this), this.speed);
    this.intervalId = interval; 
  }

  moveStart() {
    let leftCoord = +window.getComputedStyle(this.snake).left.replace(/[^-0-9]/gim,'');
    let topCoord = +window.getComputedStyle(this.snake).top.replace(/[^-0-9.]/gim,'');
    let isInsideGameBox =
      window.getComputedStyle(this.snake).left.replace(/[^-0-9]/gim,'') >= 0 &&
      window.getComputedStyle(this.snake).left.replace(/[^-0-9]/gim,'') <= this.boxParams.width - 20 &&
      window.getComputedStyle(this.snake).top.replace(/[^-0-9.]/gim,'') >= 0 &&
      window.getComputedStyle(this.snake).top.replace(/[^-0-9.]/gim,'') <= this.boxParams.height - 20
    ;
    this.score += 1;
    if (isInsideGameBox) {
      if (this.direction === 'right') {
        leftCoord += 20;
      } else if (this.direction === 'left') {
        leftCoord -= 20;
      } else if (this.direction === 'up') {
        topCoord -= 20;
      } else if (this.direction === 'down') {
        topCoord += 20;
      }
      this.snake.style.left = leftCoord + 'px';
      this.snake.style.top = topCoord + 'px';
    } else {
      clearInterval(this.intervalId);
      alert(`
        Game Over!
        Score:${this.score};
        REFRESH THE PAGE TO RESTART!
      `);
    }
  }

  keyListener(e) {
    let keyCode = e.code;

    if (keyCode === 'ArrowLeft') {
      this.direction = 'left';
    } else if (keyCode === 'ArrowRight') {
      this.direction = 'right';
    } else if (keyCode === 'ArrowUp') {
      this.direction = 'up';
    } else if (keyCode === 'ArrowDown') {
      this.direction = 'down';
    } else if (keyCode === 'Enter') {
      this.start();
    }
  }
};

new SnakeGame();