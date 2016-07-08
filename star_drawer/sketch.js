var numstars=0;
var numtrees=3;


//width and height-need to put in set up as well.
var w=960;
var h=540;
//frame rate
var fr=30;


var stars=[];
var trees=[];
var leaves=[];
var sphere;


var hand;
var moon;
var brush;
var blink;
var mooner;


var handang=0;
var angpos=.045;
var ap2=.9;
var blinkt=0;
var tinksound=0;
//var moonang;
var approachang=0;
var tinkpan=0;
var wind;
var tinkle;
var music

function preload(){
  noCursor();
  wind=loadSound("http://hrfart.github.io/wind.mp3");
    tinkle=loadSound("http://hrfart.github.io/tinkle.m4a");
music=loadSound("http://hrfart.github.io/music.m4a");


 hand=loadImage("http://hrfart.github.io/hand.png");
  brush=loadImage("http://hrfart.github.io/brrush.png");
  blink=loadImage("http://hrfart.github.io/blink.png");
  moon=loadImage("http://hrfart.github.io/moon.png");
	for(var i=0;i<3;i++)leaves[i]=loadImage("http://hrfart.github.io/leaf"+(i+1)+".png");


}


function setup(){
	tinkle.setVolume(0);
	tinkle.loop();
	
	wind.setVolume(.45);
	wind.pan(-.5);
	wind.loop();
	
	music.setVolume(.3);
	music.pan(.3);
	music.loop();
	
	mooner = new Moon();
	imageMode(CENTER);
	stars=[];
	fullscreen();
   createCanvas(windowWidth, windowHeight);
	numstars=75;
	//onumstars=150;
   frameRate(fr);
	for(var i=0;i<numstars;i++)stars[i]=new Star();
	for(var i=0;i<numtrees;i++)trees[i]=new Tree();
}

var oldx,oldy,speed,clus,xx,yy,clickt;
var starsper=2;

function draw(){

createCanvas(windowWidth, windowHeight);
	w=windowWidth;
	h= windowHeight;
  background(0); 

 for(var i=0;i<numstars;i++)stars[i].updatedraw();
 
 if(mouseIsPressed){
 //tinkle.setVolume(.01);
 	if(tinksound<.04)tinksound+=.003;
    clickt=min(clickt+.02,1);
    xx=mouseX;
    yy=mouseY;
    speed=sqrt(pow((xx-oldx),2)+pow((yy-oldy),2));
    xx=oldx-xx;
    yy=oldy-yy;
    speed=max(speed,2);
    clus=.04/speed*clickt;
    for(var j=0;j<starsper*clickt;j++){
    fill(255);
    // ellipse(j*20,j*20,100);
      stars[numstars]=new Star();
      
      stars[numstars].setxys(mouseX+xx*j/starsper,mouseY+yy*j/starsper,clus);
 	  numstars=numstars+1;
      
    //  mouseX+xx*j/starsper,mouseY+yy*j/starsper,clus));
      
    }
  }else {clickt=0;
  if(tinksound>0)tinksound-=.003;
  if(tinksound<0)tinksound=0;
  }
  mooner.drawmoon(mouseY,h);
  oldx=mouseX;
  oldy=mouseY;
  
tinkle.setVolume(tinksound);
tinkle.pan(sin(tinkpan)*.7);
tinkpan+=.1;
 for(var i=0;i<numtrees;i++)trees[i].updatedraw();

}







//star stuff
var srin=5;
function Star(){
	this.x=random(1); 
    this.y=random(1); 
    this.s=.002+random(.002);
    this.p=random(TWO_PI);
    this.os=(.6+random(1.2))/fr;
    this.b=150+random(55); 
    
    
     
    this.updatedraw = function(){
    noStroke();
    var ww=max(w,h*1280/720);
    this.p += this.os;
    for(var j=srin;j>0;j--){
      fill(250,max(0,min(255,.4*(srin-j)/srin*this.b*(.1+.9*pow(sin(this.p),2)))));
      ellipse(this.x*w,this.y*h,this.s*ww*j/srin*2,this.s*ww*j/srin*2); 
    }
    };
    
    this.setxys = function(x1,y1,speed){
		this.x=(x1/w-(speed-random(speed*2))); 
    	this.y=(y1/h-(speed-random(speed*2))*w/h); 
     	//this.s=.002+random(.001); 
     	this.os=(1+random(2.5))/fr;
    	this.b=100+random(140);  
    };

}









//////////////////tree////////////////////
//how long the brainches are
var  baselength=.18;
var numn=1000;

function Tree(){


    this.totalang=0;
    this.ls=0;
   this.index=0;
      this.lt=floor(random(3));
      this.ls=.2+random(.1);
      this.col=20+random(150);
      this.x=random(1);
      this.bsn=new Array(numn);
      this.angles  =new Array(numn);
       this.lengths  =new Array(numn);
        this.origangles  =new Array(numn);
         this.leafangs  =[];
         this.leafdirs=[];
          this.branchleft  =new Array(numn);
          
       this.bsn[0]=2;
       
      for(var i=1;i<numn;i++)this.bsn[i]=2+floor(random(2));
     for(var i=0;i<numn;i++){
        this.angles[i]=-PI/4+random(PI/2);
        this.lengths[i]=1.25+random(1);
        this.origangles[i]=this.angles[i];
        this.branchleft[i]=false;
        this.leafangs[i]=[];
        this.leafdirs[i]=[];
       for(var j=0;j<5;j++){
         this.leafangs[i][j]=-PI/4+random(PI/2);
          this.leafdirs[i][j]=floor(random(2));
          
        }
      }
      this.angles[0]=0;
      
      

    
    this.updatedraw = function(){
      imageMode(CORNER);
      //update the angles
      stroke(this.col);
      //tint(this.col);
      strokeWeight(min(w,h*1280/720)*.01);
      //draw the tree here.
      this.index=0;
      this.totalang=0;
      push();
      translate(this.x*w,h*(2.1-1.1*abs(this.x-.5)));
      this.branches(0);
      pop();

    };
   
   //draw brances recurrsively
   this.branches = function(level){
      push();
      rotate(this.angles[this.index]);
      this.totalang+=this.angles[this.index];
      line(0,0,0,-h*baselength*this.lengths[this.index]);
    
      for(var i=1;i<4;i++){
        push();
        translate(0,-h*baselength*this.lengths[this.index]*i/3);
        rotate(PI/8*2+this.leafangs[this.index][i]);
      // if(level>3||(level==3&&i==3))image(leaves[this.lt],0,0,h*this.ls,h*this.ls);
       if(level>4||(level==4&&i>=2))image(leaves[this.lt],0,0,h*this.ls,h*this.ls);
         pop();
         if(this.leafdirs[this.index][i]>.5){
       this.leafangs[this.index][i]-=(PI/64+random(PI/32))*.5;
        if(this.leafangs[this.index][i]<-PI/4)this.leafdirs[this.index][i]=0;
      }else{
         this.leafangs[this.index][i]+=(PI/64+random(PI/32))*.2;
        if(this.leafangs[this.index][i]>3*PI/8)this.leafdirs[this.index][i]=1;
      }
      }
   
      translate(0,-h*baselength*this.lengths[this.index]);
      scale(.8);
      var curindex=this.index;
      var curlevel=level;
      this.index++;
      
      if(curlevel<5) for(var i=1;i<=this.bsn[curindex];i++){
        this.branches(curlevel+1);
        //if(pood)print(curindex,"/",bsn[curindex]," ",i,".");
      }
      
      pop();
      this.totalang-=this.angles[this.index];
      //update angle
      if(this.branchleft[curindex]){
       this.angles[curindex]-=(PI/64+random(PI/32))*pow(level,2)/25.0*.1;
        if(this.angles[curindex]<this.origangles[curindex]-PI/4*level*.035)this.branchleft[curindex]=false;
      }else{
         this.angles[curindex]+=(PI/64+random(PI/32))*pow(level,2)/25*.06;
        if(this.angles[curindex]>this.origangles[curindex]+3*PI/8*level*.035)this.branchleft[curindex]=true;
      }
     
  };


}


/////////moon///////




function Moon(){
	this.oldyyy=0;
 	this.moonang=0;
	//this.approachang=0;
	this.moonspeed=0;

	
 	this.drawmoon = function(my,h){
 	imageMode(CENTER);
	push();
	if(mouseIsPressed) handang+=PI/15;
 	else if(abs(sin(handang))>.3)handang+=PI/7.5;
/*
 this.approachang=min(h*.1,max((-my+oldyy),-h*.1))/h/.1*1.5;
 if(this.approachang>this.moonang)this.moonspeed=min(this.moonspeed+.03,.2);
 if(this.approachang<this.moonang)this.moonspeed=max(this.moonspeed-.03,-.2);
 this.moonspeed=this.moonspeed*.7;
 if(abs(this.moonang-this.approachang)<.02)this.moonspeed=0;
 this.moonang+=this.moonspeed;
*/

//oldyy-my
var ww=min(w,h*1280/720);
 approachang=min(h*.1,max((-my+this.oldyyy),-h*.1))/h/.1*1.5;
 // approachang=PI;
  this.moonang+=(approachang-this.moonang)*.15;
  
	translate(mouseX,mouseY);
 	rotate(this.moonang);
 	translate(-mouseX,-mouseY);
	//this.mang=moonang;
   	translate(mouseX+ww*.15,mouseY+ww*.035);
    // ellipse(0,0,w*.2,w*.2);
    push();
    translate(-ww*angpos,-ww*angpos*ap2);
    rotate(PI/20*sin(handang));
    translate(ww*angpos,ww*angpos*ap2);
    image(brush,0,0,ww*.3,ww*.3);
    //ellipse(-w*angpos,-w*angpos*ap2,10,10);
    pop();
   image(hand,0,0,ww*.3,ww*.3);
   image(moon,0,0,ww*.3,ww*.3);
   if(blinkt>0){
     image(blink,0,0,ww*.3,ww*.3);
     blinkt--;
   }else if(random(10)<.35)blinkt=3+random(3);
   pop();
   //this.moonang=this.moonang+(this.approachang-this.moonang)*.15;
   this.oldyyy=my;
};

}


