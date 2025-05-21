
function rectangularCollision({
    rectangle1,
    rectangle2
}) {
    return (rectangle1.attackBox.position.x + rectangle1. attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height && rectangle1.health > 0 && timer > 0)
}


function winnerWinnerChickenDinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector("#result").style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector("#result").innerHTML = 'TIE'
    } else if (player.health > enemy.health) {
        document.querySelector("#result").innerHTML = 'PLAYER 1 WINS'
    } else if (player.health < enemy.health) {
        document.querySelector("#result").innerHTML = 'PLAYER 2 WINS'
    }
}

const once = fn => {
    let called = false;
  
    return function(...args) {
      if (called) return;
      called = true;
      return fn.apply(this, args);
    };
  };
  
  const decreaseTimer = function() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--;
    }
    
    
    if (timer == 0) {
        winnerWinnerChickenDinner({player, enemy, timerId})
        canTime = true;
    }
  };

let timer = 30;
let timerId;

let powerUpTimer = 3;
let powerUpTimerId
function decreasePowerUpTimer() {
    if (powerUpTimer > 0) {
        powerUpTimerId = setTimeout(decreasePowerUpTimer, 1000)
        powerUpTimer--;
        document.querySelector("#powerUpTimer").innerHTML = powerUpTimer
    }
    
}