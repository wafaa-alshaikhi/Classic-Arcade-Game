
let score=100;

/**
  * @constructor
 */
var Enemy = function(x,y,sprite) {
    this.x=x;
    this.y=y; 
    this.height=65;
    this.width=95; 
    this.sprite = sprite;
    this.collision=false;
};
/**
* @description let the enemy moves constantly
* @param {var}  time  - the frame of time from Engine.js
*/
Enemy.prototype.update = function(dt) {
    // If the enemies reached the far right 
    if(this.x>ctx.canvas.width+this.width){
        this.x= -200+Math.floor(Math.random()*4)+1;
    }
     // let the  enemies move 
    else{
        this.x+=150*dt;
    }
    // If the player collides with the enemies
    if(collision(player.x,player.y,player.width,player.height,this.x,this.y,this.width,this.height)){
        this.collision=true;
        if(player){
            player.x=202;
            player.y=400;
            score-=10;
        }
       
    }
    else{
        this.collision=false;
    }
};


/**
* @description Draw the enemy on the screen, required method for game
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);   
};

/**
  * @constructor
 */
var Player = function(x,y,sprite) {
     charecter=0;
    this.x=x;
    this.y=y;
    this.height=75;
    this.width=65; 
    this.sprite = sprite;
    this.players = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
    ]
};

/**
* @description Draw the player on the screen.
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   
};
/**
* @description change the chracter and put it back to the origin pisition .
*/
Player.prototype.update = function(dt) {
   // when the player want to change the chrecter 
   if(this.x===402&&this.y==400){
    changePlayer();
    this.x  = 202;
    this.y = 400;
   } 
};
/**
* @description controal the movment of the player  .
*/
Player.prototype.handleInput=function(direction){
    if (direction === 'left' && this.x !== 2){
   this.x -=100;
   console.log("the cardinate of x is "+this.x);
    }else if (direction === 'right' && this.x !== 402){
       this.x +=100;
       console.log("the cardinate of x is "+this.x);
    }else if (direction === 'up' && this.y !==-15){
       this.y -=83;
       console.log("the cardinate of y is "+this.y);
    }else if(direction === 'down' && this.y !==400){
       this.y +=83;
       console.log("the cardinate of y is "+this.y);
    }
   // if the player reach the end 
    if(this.y==-15){
       console.log("Bravvo you Win !");
       alert("Bravvo you Win ! your score is "+score);
       player.x=202;
       player.y=400;
   }
   
   }
 /**
  * @constructor
  * @description if hte player come to this place the Character will change 
 */
var Selector = function(x,y,sprite) {
    this.x=x;
    this.y=y;
    this.height=75;
    this.width=65; 
    this.sprite = sprite;
};
Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);   
};

Selector.prototype.update = function(dt) {
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //Console.log(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
    
});
const slector = new Selector(402,400,'images/Selector.png');
const player=new Player(202,400,'images/char-boy.png');
const EnemyPosition=[55,140,230];
const allEnemies=EnemyPosition.map((y,index)=>{
    return new Enemy((-200*(index+1)),y,'images/enemy-bug.png');
});
/**
  * @description to detect if the player collides with the enemies or not  
 */
function collision (px,py,pw,ph,ex,ey,ew,eh){

    return(Math.abs(px-ex)*2<(pw+ew))&&(Math.abs(py-ey)*2<(ew+pw));
}
var n = 0;
/**
  * @description to choose the Character from the  players Array
 */
var changePlayer = function() {
    n = (n + 1) % player.players.length;
    player.sprite = player.players[n];
};
