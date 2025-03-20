
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


let timer = 30
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--;
    }

    if (timer == 0) {
        winnerWinnerChickenDinner({player, enemy, timerId})
    }
    
}

let powerUpTimer = 3;
let powerUpTimerId
function decreasePowerUpTimer() {
    if (powerUpTimer > 0) {
        powerUpTimerId = setTimeout(decreasePowerUpTimer, 1000)
        powerUpTimer--;
        document.querySelector("#powerUpTimer").innerHTML = powerUpTimer
    }
    
}
document.querySelector("#restart").addEventListener("click", function () {
    timer = 30;
    player.position.x = 0
    player.position.y = 10
    player.health = 100
    document.getElementById("playerHealth").style.width = player.health + '%'
    player.dead = false
    player.switchSprite('idle')
    player.framesCurrent = 1
    player.canDie = false


    enemy.position.x = 1000
    enemy.position.y = 10
    enemy.health = 100
    document.getElementById("enemyHealth").style.width = enemy.health + '%'
    enemy.switchSprite('idle')
    enemy.dead = false
    enemy.framesCurrent = 0

    document.getElementById("result").innerHTML = ''

    decreaseTimer()
})