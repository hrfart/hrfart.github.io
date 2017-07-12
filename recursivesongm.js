
//ArrayList<SinOsc> sounds= new ArrayList<SinOsc>();//store the actual sin waves

 var melody=[];
 var h=400;
 var w=400;
 var wold=960;
var hold=960;
var sounds=[];
var resetting=false;
var playing=false;

var hand=false;
var button=0;
var curbutton=999;

var ok2reset;


  var sh=.14;
var sw=.9;

var ts=[];

var notstart=[];
var maxlevel=0;
var frame=0;
var currentlevel=1;
var levelup=1;
var justclicked=0;

var linkback=0;
var imageback;

function preload(){
imageback=loadImage("http://harryrubinfalcone.com/back2.png");
}

function setup(){
  for(var i=0;i<5;i++)notstart[i]=true;
  rectMode(CORNER);
	fullscreen;
 //size(400,400,P2D);
   // surface.setResizable(true);

// w=400;
 //h=400;
 frameRate(15);
  for(var j=0;j<4;j++){
   sounds[j]=new p5.SinOsc(440);
 // sounds[j].setType('sine');
  // sounds[j].freq(440);
   //if(j<=maxlevel)sounds[j].play();
   ts[j]=[];
   for(var i=0;i<5;i++)ts[j][i]=-1;
 }
 
 melody[0]=1;
 melody[1]=.75;
 melody[2]=2;
 melody[3]=1.5;
// pixelDensity(2);

 

}


function draw(){
  createCanvas(windowWidth, windowHeight);
	w=windowWidth;
	h=windowHeight;
  textFont("Times",w*.03);
  
  
  hand=false;
 button=0;
 if(!(mouseIsPressed||touchIsDown)){
   curbutton=999;
   ok2reset=true;
   if(justclicked>0)justclicked--;
 }
       background(200);

 
   if(!playing){

   
    fill(0);
    text("pick any four numbers-",0.05*w,.1*h);
    text("these will be the base of your recursive melody:",.05*w,.15*h);
    
    text("warning!:   this doesn't work well in all browsers.",.05*w,.85*h);
    text("also!: it can produce incredibly irritating sounds.",.05*w,.9*h);
	text("sorry!:            good luck and god speed.",.05*w,.95*h);


    for(var i=0;i<4;i++) melody[i]=slider("note "+(i+1),w*.05,h*.2+h*.15*i,.75,3,melody[i]);
      
      
      rectMode(CORNER);
      fill(255,0,255);
   rect(w*.75,h*.85,.2*w,.1*h);
   fill(0);
   text("go!!",w*.83,h*.91);
   if(mouseover(w*.85,h*.9,.2*w,.1*h)){
     curbutton=999;
    if((mouseIsPressed||touchIsDown)&&justclicked==0){
      justclicked=10;
      playing=true; 
    }
   }
  if(!hand)cursor(ARROW);
  
  
  
  }else{
  if(frame%256==0&&frame>0){
    //if(levelup==-1)sounds[maxlevel].stop();
    maxlevel+=levelup;
    
    for(var j=0;j<4;j++)
   //  if(j<=maxlevel)sounds[j].play();
     if(maxlevel==0&&levelup==-1)levelup=1;
     if(maxlevel==3&&levelup==1)levelup=-1;
  }
  

  //push();
  translate(-w/4.0,0);
  for(var i=0;i<=3;i++){
    currentlevel=i;
  //  currentlevel=maxlevel;
    translate(w/4.0,0);
    song(0,0,220,ts[i],sounds[i]);
  }
 // for(var i=0;i<4;i++)if(maxlevel>i)sounds[i].amp(.1);
//  pop();
  frame++;
  translate(-w*.75,0);
    rectMode(CORNER);
    fill(255,0,255);
   rect(w*.8,h*.85,.15*w,.1*h);
   fill(0);
   text("reset",w*.83,h*.91);
   if(mouseover(w*.875,h*.9,.15*w,.1*h)){
     curbutton=999;
    if((mouseIsPressed||touchIsDown)&&justclicked==0){
      justclicked=10;
      playing=false; 
      maxlevel=0;
      frame=0;
    currentlevel=1;
     levelup=1;
     //sounds.remove();
     
     
       for(var j=0;j<4;j++){
   //if(j<=maxlevel)sounds[j].play();
   for(var i=0;i<5;i++)ts[j][i]=-1;
       }
       resetting=true;
     for(var i=0;i<4;i++){
       if(!notstart[i]){
       notstart[i]=true;
       song(0,0,220,ts[i],sounds[i]);
      // print(i);
     }
     }
     resetting=false;
  //   sounds=[];
     for(var j=0;j<4;j++){
sounds[j]=new p5.SinOsc(440);
//  sounds[j].setType('sine');
  // sounds[j].freq(440);
     }

 }
    }
    }
  if(!hand)cursor(ARROW);
  
  //deal with back button
if(linkback==0){
	linkback=createA("http://harryrubinfalcone.com/music.html","<img src='blank.png' width='"+w*.12+"' height='"+this.h*.18+"'>");
	linkback.position(w*.88,h*0);
}else if(wold!=w || hold!=h){
	linkback.remove();
	linkback=createA("http://harryrubinfalcone.com/music.html","<img src='blank.png' width='"+w*.12+"' height='"+this.h*.18+"'>");
	linkback.position(w*.88,h*0);
}
wold=w;
hold=h;
image(imageback,w*.85,h*0,w*.15,h*.2);

}







// 
// 
function song(level,base,scale,t,sound){
    if(resetting){sound.amp(0);
    sound.stop();
    return;
    }else{
    if(currentlevel>maxlevel){
    
    //  print(" sss");
     if(!notstart[currentlevel]){
     fill(255);
          rect(0,0,w*.25,h);
          fill(100+currentlevel*155/3,0,255-currentlevel*155/3);
          rect(0,h-h*(melody[t[level]]*scale+base)/1600-h*.025,w*.25,h*.05);
          sound.amp(.1);
          }
     return; 
    }
    else{ 
     // print(currentlevel,"/",maxlevel," ");
      if(frame%(64/pow(4,level))==0)
          t[level]=(t[level]+1)%4;
 
    if(level==currentlevel){
       fill(255);
          rect(0,0,w*.25,h);
          fill(100+currentlevel*155/3,0,255-currentlevel*155/3);
          rect(0,h-h*(melody[t[level]]*scale+base)/1600-h*.025,w*.25,h*.05);
      if(frame%(64/pow(4,level))==0){
          sound.amp(0);
         // sound.stop();
          sound.freq(melody[t[level]]*scale+base);
          sound.amp(.2+currentlevel*.2);
         if(notstart[currentlevel]){
           sound.start();
           notstart[currentlevel]=false;
         }
          
      }
    }else song(level+1,melody[t[level]]*scale+base-scale/2*0,scale/2,t,sound); 
         
    }
 }
}
  
  
  
  
  


function slider(name,x,y,minc,maxc,cur){
  rectMode(CORNER);
  noStroke();
  fill(215);
  rect(x,y,sw*w*1.03,sh*h);
  fill(0);
  text(name,x+.01*w,y+.03*h);
  text(minc,x,y+sh*h-.01*h);
  text(maxc,x+sw*w-.1*w,y+sh*h-.01*h);
  fill(200,0,200);
  stroke(0);
  rect(x+.025*w,y+.06*h,sw*w*.95,h*.02);
  
  
  
  //do the actual updating and display it
      rectMode(CENTER);
  
  if(mouseover((cur-minc)/(maxc-minc)*sw*w*.95+x+.025*w,y+.07*h,sw*w*.05,h*.05)||curbutton==button)
  cur=max(min(maxc,(mouseX-x-.025*w)/(sw*w*.95)*(maxc-minc)+minc),minc);
  cur=round(cur*100)*.01;
  rect((cur-minc)/(maxc-minc)*sw*w*.95+x+.025*w,y+.07*h,sw*w*.05,h*.05);
	text(cur,x+sw*w*.5-.05*w,y+sh*h-.01*h);

  button++;
  return cur;
}



function mouseover(x,y,wi,he){
  if((mouseX>=x-wi/2&&mouseX<=x+wi/2&&mouseY>=y-he/2&&mouseY<+y+he/2) || (touchX>=x-wi/2&&touchX<=x+wi/2&&touchY>=y-he/2&&touchY<+y+he/2)){
    cursor(HAND);
    hand=true;
    if((mouseIsPressed||touchIsDown)){
      if(button==999&&ok2reset){
       // updatefreqs();
        ok2reset=false;
      }
    curbutton=button;
    return true;
    }
  }
  return false;
}

 
function touchMoved() {
  // do some stuff
  return false;
}

