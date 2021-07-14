//Create variables here
var dog, happydog;
var foodS, foodStock;
var database;
var dogImg, happydogImg;
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happydogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
  
  dog = createSprite(300,200);
  dog.scale = 0.2;
    dog.addImage(dogImg);

  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  foodStock.set(20);
}


function draw() {  
background(46, 139, 87);


  textSize(20);
  fill("black");
  text("Note: Press UP_ARROW key to feed drago milk!",50,50);
  text("Food Remaining: " +foodS,150,150);

if(keyWentDown(UP_ARROW)) {
  writeStock(foodS)
  dog.addImage("happydogImg")
}



if(foodS === 0) {
  foodS=20;
}



  drawSprites();
  //add styles here

}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {

  if(x<=0) {
    x=0;
  }else{
      x=x-1;
    }
  
  database.ref('/').update({
    Food:x
  })
}



 