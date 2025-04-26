let canvas=document.querySelector("#canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
canvas.style.background="#ff8";
let context=canvas.getContext("2d");
gravity=0.5;


//platform class defined
class Platform{
    constructor(x,y,width,height){
        this.position={x:x,y:y};
        this.height=height;
        this.width=width;
    }
    draw(){
        context.fillStyle="blue";
        context.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

//player class defined
class Player{
    constructor(){
        this.position={x:100,y:100};
        this.velocity={x:0,y:4};
        this.width=30;
        this.height=30;
    }
    //first time summon
    draw(){
        context.clearRect(0,0,canvas.width,canvas.height)
        context.fillStyle="black";
        context.fillRect(this.position.x,this.position.y,this.width,this.height)
    }


    //player movements defined
    playerMovement(){
        //drop from first summon
        if((this.position.y+this.height+this.velocity.y)>=canvas.height){
            this.velocity.y=0;
        }
            //gravity defined
            else{
                this.velocity.y+=gravity;
            }

            //jump obstacles defined
            if(this.velocity.y>=0 &&
                this.position.y+this.height<=platform.position.y &&
                this.position.y+this.height+this.velocity.y>=platform.position.y &&
                this.position.x+this.width>platform.position.x &&
                this.position.x<platform.position.x+platform.width){
                    this.velocity.y=0;
                    this.position.y=platform.position.y-this.height;
                }

                else if(
                    this.velocity.y<0 &&
                    this.position.y>=platform.position.y+platform.height &&
                    this.position.y+this.velocity.y<=platform.position.y+platform.height &&
                    this.position.x+this.width>platform.position.x &&
                    this.position.x<platform.position.x+platform.width
                ){
                    this.velocity.y=0;
                    this.position.y=platform.position.y+platform.height;
                }

                this.position.y+=this.velocity.y;
                this.position.x+=this.velocity.x;
                this.draw()
        }
}

//click events
addEventListener("keyup",function(e){
    if(e.key=="ArrowRight"){
        player.velocity.x=0;
    }
    if(e.key=="ArrowLeft"){
        player.velocity.x=0;
    }
})
addEventListener("keydown",function(e){
    if(e.key=="ArrowUp"){
        player.velocity.y=-14;
    }
    if(e.key=="ArrowRight"){
        player.velocity.x=5;
    }
    if(e.key=="ArrowLeft"){
        player.velocity.x=-5;
    }
})

//creation of players and platforms
let platforms=[];
let platform1=new Platform(300,400);
platforms.push(platform1);
let platform2=new Platform();
platforms.push(platform2);
player.draw();
function gameAnimation(){
    requestAnimationFrame(gameAnimation);
    player.playerMovement()
    platform.draw();
}
gameAnimation();