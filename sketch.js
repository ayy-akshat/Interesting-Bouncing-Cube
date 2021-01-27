var PLAY = 0;
var END = 1;
var gameState;

var square;

var rect1, rect2, rect3, rect4;
var rectGroup;

var edge1, edge2, edge3, edge4;
var edges;

let SHAKETIME = 15;
let SHAKEAMT = 20;

var shakeTimer;

var bam, gameOver, hit, smack;

function preload()
{
    bam = loadSound('bam.wav');
    gameOver = loadSound('crash.mp3');
    hit = loadSound('hit.wav');
    smack = loadSound('smack.wav');
}

function setup(){
    createCanvas(800, 600);

    rect1 = createSprite(100, 550, 180, 20);
    rect1.shapeColor = "blue";
    rect2 = createSprite(300, 550, 180, 20);
    rect2.shapeColor = "red";
    rect3 = createSprite(500, 550, 180, 20);
    rect3.shapeColor = "green";
    rect4 = createSprite(700, 550, 180, 20);
    rect4.shapeColor = "purple";

    
    rectGroup = createGroup();
    rectGroup.add(rect1);
    rectGroup.add(rect2);
    rectGroup.add(rect3);
    rectGroup.add(rect4);
    
    edge1 = createSprite(400, -1, 800, 2);
    edge2 = createSprite(400, 601, 800, 2);
    edge3 = createSprite(-1, 300, 2, 600);
    edge4 = createSprite(801, 300, 2, 600);

    edges = createGroup();
    edges.add(edge1);
    edges.add(edge2);
    edges.add(edge3);
    edges.add(edge4);

    edges.setVisibleEach(false);

    //create box sprite and give velocity
    square = createSprite(400, 300, 50, 50);
    resetSquare();

}

function draw() {
    background("black");
    
    //add condition to check if box touching surface and make it box

    if (gameState == PLAY)
    {
        for (var r = 0; r < rectGroup.length; r++)
        {
            if (rectGroup[r].isTouching(square) && square.bounceOff(rectGroup[r]))
            {
                
                shakeTimer = SHAKETIME/3;
                switch(rectGroup[r].shapeColor)
                {
                    case "red":
                        crash();
                        console.log("red");
                        break;
                    case "blue":
                        bam.play();
                        console.log("blue");
                        break;
                    case "green":
                        hit.play();
                        console.log("green");
                        break;
                    case "purple":
                        smack.play();
                        console.log("purple");
                        break;
                }
                square.shapeColor = rectGroup[r].shapeColor;
            }
        }
    
        square.bounceOff(edges);
    }

    if (keyWentDown("space"))
    {
        resetSquare();
    }

    if (shakeTimer < 0) { shakeTimer = 0; }

    if (shakeTimer > 0)
    {
        shakeTimer--;
    }

    camera.x = Math.round(random(-SHAKEAMT * shakeTimer / SHAKETIME, SHAKEAMT * shakeTimer / SHAKETIME)) + 400;
    camera.y = Math.round(random(-SHAKEAMT * shakeTimer / SHAKETIME, SHAKEAMT * shakeTimer / SHAKETIME)) + 300;

    drawSprites();

    
    

    fill(square.shapeColor);
    textAlign(CENTER);
    textSize(30);
    text("PRESS SPACE TO RESET AT ANY TIME", 400, 100);
}

function resetSquare()
{
    square.x = Math.round(random(25, 775));
    square.y = Math.round(random(25, 400));

    square.setVelocity(Math.round(random(-2, 2)), Math.round(random(-2, 2)));

    if (square.velocityY == 0)
    {
        square.velocityY = [-1, 1][Math.round(random(0,1))];
    }

    if (square.velocityX == 0)
    {
        square.velocityX = [-1, 1][Math.round(random(0,1))];
    }

    square.velocityX *= 4;
    square.velocityY *= 4;

    square.shapeColor = "white";

    gameState = PLAY;
}

function crash()
{
    shakeTimer = SHAKETIME;
    gameState = END;
    square.setVelocity(0, 0);
    gameOver.play();
}