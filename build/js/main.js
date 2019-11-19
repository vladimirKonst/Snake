class SnakeGame {
  constructor() {
    this.box = document.querySelector('.game-box');
    this.snake = [...document.querySelectorAll('.snake')][0];
    this.speed = 200;
    this.score = 0;
    this.intervalId;
    this.snakePartsPrevPos = [];
    this.boxParams = {
      width: this.box.getBoundingClientRect().width,
      height: this.box.getBoundingClientRect().height,
      top: this.box.getBoundingClientRect().top,
      left: this.box.getBoundingClientRect().left
    };
    this.direction = 'up';
    document.addEventListener('keydown', this.keyListener.bind(this));
    alert('PRESS ENTER TO START');
  }
  
  start() {
    let interval = setInterval(this.moveStart.bind(this), this.speed);

    this.intervalId = interval;
    this.addVictim();
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
    let snakeParts = [...document.querySelectorAll('.snake')].map((el) => {
      return {
        left:  window.getComputedStyle(el).left.replace(/[^-0-9]/gim,''),
        top: window.getComputedStyle(el).top.replace(/[^-0-9.]/gim,'')
      }
    });
    this.snakePartsPrevPos = snakeParts;
    if ([...document.querySelectorAll('.snake')].length > 1) {
      for(let i =0; i<= [...document.querySelectorAll('.snake')].length - 1; i++) {
        if (i !== 0) {
          [...document.querySelectorAll('.snake')][i].setAttribute('style',`
            left:${this.snakePartsPrevPos[i-1].left}px;
            top:${this.snakePartsPrevPos[i-1].top}px;
          `);
        }
      }
    }
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
    let foodPlace = {
      left: +window.getComputedStyle(document.querySelector('.new-victim')).left.replace(/[^-0-9]/gim,''),
      top: +window.getComputedStyle(document.querySelector('.new-victim')).top.replace(/[^-0-9.]/gim,'')
    };
    if (leftCoord === foodPlace.left && topCoord === foodPlace.top) {
      let growUp = document.createElement('div');

      growUp.className = 'snake';
      growUp.setAttribute('style',`
        left:${this.snakePartsPrevPos[this.snakePartsPrevPos.length - 1].left}px;
        top:${this.snakePartsPrevPos[this.snakePartsPrevPos.length - 1].top}px;
      `);
      this.box.append(growUp);
      this.deleteVictims();
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

  addVictim() {
    let victim = document.createElement(`div`);
    let randomNum = [...String(Math.random())][2] ** 2;
    let rightLimit = window.getComputedStyle(this.box).width / 20;
    let bottomLimit = window.getComputedStyle(this.box).height / 20;

    victim.className = 'new-victim';
    this.box.append(victim);
    if (randomNum >= rightLimit && randomNum <= bottomLimit && randomNum >= 0) {
      randomNum = [...String(Math.random())][2] ** 2;
    }
    document.querySelector('.new-victim').setAttribute('style', `
      left:${randomNum * 20}px;
      top:${randomNum * 20}px;
    `);
  }

  deleteVictims() {
    [...document.querySelectorAll('.new-victim')].forEach((el) => el.parentElement.removeChild(el));
    this.addVictim();
  }
};

new SnakeGame();