class SnakeGame {
  constructor() {
    this.box = document.querySelector('.game-box');
    this.snake = document.querySelector('.snake');
    this.speed = 1000;
    this.boxParams = {
      width: this.box.getBoundingClientRect().width,
      height: this.box.getBoundingClientRect().height,
      top: this.box.getBoundingClientRect().top,
      left: this.box.getBoundingClientRect().left
    };
    this.direction = 'up';
    this.start();
  }
  
  start() {
    let context = this;

    setInterval(context.moveStart, context.speed, context);
    document.addEventListener('keydown', e => {
      let keyCode = e.code;
      if (keyCode = 'ArrowLeft') {
        this.direction === 'left';
      } else if (keyCode === 'ArrowRight') {
        this.direction = 'right';
      } else if (keyCode === 'ArrowUp') {
        this.direction = 'up';
      } else if (keyCode === 'ArrowDown') {
        this.direction = 'down';
      }
    })
  }

  moveStart(context) {
    console.log(context.direction);
    let leftCoord = +window.getComputedStyle(context.snake).left.replace(/[^-0-9]/gim,'');
    let topCoord = +window.getComputedStyle(context.snake).top.replace(/[^-0-9.]/gim,'');
    let isInsideGameBox =
      window.getComputedStyle(context.snake).left.replace(/[^-0-9]/gim,'') >= 0 + 20 &&
      window.getComputedStyle(context.snake).left.replace(/[^-0-9]/gim,'') <= context.boxParams.width - 40 &&
      window.getComputedStyle(context.snake).top.replace(/[^-0-9.]/gim,'') >= 0 + 20 &&
      window.getComputedStyle(context.snake).top.replace(/[^-0-9.]/gim,'') <= context.boxParams.height - 40
    ;

    if (isInsideGameBox) {
      if (context.direction === 'right') {
        leftCoord += 20;
      } else if (context.direction === 'left') {
        leftCoord -= 20;
      } else if (context.direction === 'up') {
        topCoord -= 20;
      } else if (context.direction === 'down') {
        topCoord += 20;
      }
      context.snake.style.left = leftCoord + 'px';
      context.snake.style.top = topCoord + 'px';
    } else {
      // alert('Game Over');
    }
  }
};

new SnakeGame();