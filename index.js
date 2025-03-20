const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const speed = 5
const jumpStrength = 15;
const attackSpeed = 100;

canvas.width = 1024;
canvas.height = 576;



c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './Bilder/Background/background.png'
})
const shop = new Sprite({
    position: {
        x: 625,
        y: 128
    },
    imageSrc: './Bilder/Background/shop.png',
    scale: 2.75,
    framesMax: 6
})


const player = new Fighter({
    position:{
        x:0,
        y:10
    },
    velocity: {
        x:0,
        y:0
    },
    offset: {
        x:215,
        y:157
    },
    color: 'blue',
    imageSrc: './Bilder/samuraiMack/idle.png',
    framesMax: 8,
    scale: 2.5,
    sprites: {
        idle: {
            imageSrc: './Bilder/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './Bilder/samuraiMack/Run.png',
            framesMax: 8
        }, 
        jump: {
            imageSrc: './Bilder/samuraiMack/Jump.png',
            framesMax: 2
        }, 
        fall: {
            imageSrc: './Bilder/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './Bilder/samuraiMack/Attack1.png',
            framesMax: 6
        },
        attack2: {
            imageSrc: './Bilder/samuraiMack/Attack2.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './Bilder/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: './Bilder/samuraiMack/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }
})

const enemy = new Fighter({
    position:{
        x:1000,
        y:10
    },
    velocity: {
        x:0,
        y:0
    },
    offset: {
        x: 215,
        y: 167
    },
    color: 'red',
    gravity: gravity,
    imageSrc: './Bilder/kenji/idle.png',
    framesMax: 4,
    scale: 2.5,
    sprites: {
        idle: {
            imageSrc: './Bilder/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './Bilder/kenji/Run.png',
            framesMax: 8
        }, 
        jump: {
            imageSrc: './Bilder/kenji/Jump.png',
            framesMax: 2
        }, 
        fall: {
            imageSrc: './Bilder/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './Bilder/kenji/Attack1.png',
            framesMax: 4
        },
        attack2: {
            imageSrc: './Bilder/kenji/Attack2.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './Bilder/kenji/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './Bilder/kenji/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    }
})

const powerUp = new Consumable({
    position:{
        x: Math.random() * 1024,
        y: Math.random() * (450-150)+150
    }, 
    imageSrc: './Bilder/Background/powerUp.png'
})


player.draw()
enemy.draw()
powerUp.draw()


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    arrowLeft: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    }
}

decreaseTimer()

function animate() {

    window.requestAnimationFrame(animate)
    c.fillStyle='Black'
    c.fillRect(0,0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    powerUp.update()

    document.querySelector("#timer").innerHTML = timer

    player.velocity.x = 0
    enemy.velocity.x = 0
   


    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -speed
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = speed
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')

    }
    

    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    if (keys.arrowLeft.pressed && enemy.lastKey === 'j') {
        enemy.velocity.x = -speed
        enemy.switchSprite('run')
    } else if (keys.arrowRight.pressed && enemy.lastKey === 'l') {
        enemy.velocity.x = speed
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking && player.framesCurrent == 4) {
        enemy.takeHit()
        player.isAttacking = false;
        if (enemy.health < 0){
            enemy.health = 0
        }
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking && player.framesCurrent == 4) {
        enemy.takeHit()
        player.isAttacking = false;
    }

    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && enemy.isAttacking && enemy.framesCurrent == 2) {
        player.takeHit()
        enemy.isAttacking = false;
        if (player.health < 0){
            player.health = 0
        }
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }
    if (enemy.isAttacking && enemy.framesCurrent == 2) {
        enemy.isAttacking = false;
    }

    if (enemy.health <= 0 || player.health <= 0) {
        winnerWinnerChickenDinner({player, enemy, timerId})
    }
    if (enemy.position.x <= powerUp.position.x + powerUp.width && enemy.position.x + enemy.width >= powerUp.position.x && enemy.position.y <= powerUp.position.y && enemy.position.y + enemy.height >= powerUp.position.y) {
        player.recievedDamage = 20;
        powerUp.consumed = true;
        setTimeout(() => {
            player.recievedDamage = 10
        }, 3000);
    }if (player.position.x <= powerUp.position.x + powerUp.width && player.position.x + player.width >= powerUp.position.x && player.position.y <= powerUp.position.y && player.position.y + player.height >= powerUp.position.y) {
        enemy.recievedDamage = 20;
        powerUp.consumed = true;
        setTimeout(() => {
            enemy.recievedDamage = 10
        }, 3000);
    }
}

animate()

window.addEventListener('keydown', (event) => {
    if (!player.dead){
        switch (event.key) {
            case 'd':
            case 'D':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            case 'a':
            case 'A':
                keys.a.pressed = true
                player.lastKey = 'a'
                break
            case 'w':
            case 'W':
                player.jamp = true;
                break
            case 's':
            case 'S':
                player.attack()
                break;
        }
    }
    if (!enemy.dead) {
        switch (event.key) {
            case 'l':
            case 'L':
                keys.arrowRight.pressed = true;
                enemy.lastKey = "l";
                break;
            case 'j':
            case 'J':
                keys.arrowLeft.pressed = true;
                enemy.lastKey = "j";
                break;
            case 'i':
            case 'I':
                enemy.jamp = true;
                break;
            case 'k':
            case 'K':
                enemy.attack()
                break;
            case 'p':
            case 'P':
                player.recievedDamage = 100;
                break;
        }
    }
    
})



window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
        case 'D':
            keys.d.pressed = false
            break
        case 'a':
        case 'A':
            keys.a.pressed = false
            break
    }
    switch (event.key) {
        case 'l':
        case 'L':
            keys.arrowRight.pressed = false
            break
        case 'j':
        case 'J':
            keys.arrowLeft.pressed = false
            break
    }

})

