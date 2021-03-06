//Create variables here
var dog, happyDog, dogImage, happyDogImage;
var foodS, foodStock;
var database,data;
function preload() {
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 350, 40, 40);
  dog.addImage("pet", dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock,writeStock);
}

function readStock(data) {
  foodS = data.val();
}

function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage("happy", happyDogImage);
  }

  drawSprites();
  textSize(20);
  stroke(0);
  fill(255);
  text("FOOD LEFT :-"+foodS, 150, 200);
  text("Note :- USE UP_ARROW TO FEED YOUR PET", 40, 25);
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").update({
    Food:x
  })
}