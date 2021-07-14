//Create variables here
var food;
var dog;

function preload()
{
	//load images here
  dogHappy=loadImage("images/dogImg1.png")
  dogSad=loadImage("images/dogImg.png")
}

function setup() {
	createCanvas(800, 700);
  
  database=firebase.database()

  dog=createSprite(400,400,50,50)
  dog.addImage(dogSad)
  dog.scale=0.4

  database.ref('food').on("value",readPosition)
  
  
}


function draw() {  
  background("black")

  
  if (food===0){
    dog.addImage(dogHappy)
    dog.scale=0.4
  }

  drawSprites();
  //add styles here



  textSize(35)
  fill("blue")
  text("Food remaining = "+food,100,100)
  text("Press up arrow to feed the dog.",100,200)

  if (keyWentDown(UP_ARROW) && food!==0){
    food--
    WriteStock(food)
  }

}




function readPosition(data){

  food=data.val()
}

function WriteStock(data){

  database.ref('/').update({

    food:data
  })
}