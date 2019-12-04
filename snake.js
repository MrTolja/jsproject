var cvs = document.getElementById("snake");
var ctx = cvs.getContext("2d");

var box = 32;

//ucitavanje slika
var ground = new Image();
ground.src = "img/ground.png";

var foodImg = new Image();
foodImg.src = "img/food.png";

//ucitavanje zvuka
var dead = new Audio();
var eat = new Audio();
var up = new Audio();
var right = new Audio();
var left = new Audio();
var down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

var snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

var food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

var score = 0;
var d;

//pritisak tipke na tastaturi
document.addEventListener("keydown",direction);

function direction(event){
    var key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

function collision(head,array){
    for(var i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( var i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        
    }else{
        
        snake.pop();
    }
    
    var newHead = {
        x : snakeX,
        y : snakeY
    }
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

var game = setInterval(draw,200);