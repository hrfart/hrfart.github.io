//control where in the animation we are
int round = 1;
float yupold;
boolean QUICKK=true;
boolean change;
float back=0;
boolean go=false;
boolean time=false;
boolean guyy;
boolean change2=false;
boolean change3=false;
int cc=0;
int cc2=0;
boolean up;
//set up 
void setup() {
 //for(int i=0;i<6;i++) stars[i] = true; //(stars all drop at once for testing)
  size(750, 600);
  smooth();
  noStroke();
  frameRate(30);
  strokeJoin(ROUND);
  //rotation of stars
float rot=0;

}






//beach color
float bd=0;


//max footprints, array of footprint x,y and angle coords, current foot number, timer/referencetime for footprints
int maxfeet=10000;
float[][]prints=new float[maxfeet][3];
int footnum=0;
int foottime=0;
int lastfoot=-100;
float ang; //angle for footprints


//draw the beach scene
void beach(){
  bd=(900-y)/700.0;
  fill(219*bd,173*bd,113*bd);
  ellipse(375,600,750,220);
  ellipse(375,650,550,200);
   beginShape();
   vertex(0,630);
   vertex(width,630);
   vertex(width+75, 500);
  bezierVertex(width/2+150,480,width/2-150,480,-75, 500);
  endShape();
  //footprints
  foottime++;
  for(int i=footnum;i>0;i--) oldfootprint(prints[i][0],prints[i][1],prints[i][2]);
  if(mouseY>530 && pmouseY>520&& abs(foottime-lastfoot)>7 &&abs(mouseX-pmouseX)+abs(pmouseY-mouseY)>0&&
    footnum<maxfeet&&!change){
    footprint(pmouseX,pmouseY,mouseX,mouseY);
    lastfoot=foottime;
  }
  
  //ocean
   
  ocean();
 
  
  //draw the chair
 translate(0,20);
 translate(-25,0);
 
  fill(255*bd,0,0);
  chairpiece(0);
  fill(0,0,255*bd);
  chairpiece(5);
  translate(25,5);
  
  
  translate(-8,0);
    fill(255*bd,0,0);
    stroke(255*bd);
  chairpieceb(0);
  noStroke();
  fill(0,255*bd,0);
  chairpieceb(5);
  fill(0,0,255*bd);
  chairpieceb(10);
  translate(8,0);
  
  chaira();
  
  //draw the umbrella
  fill(255*bd,0,0);
  arc(683,540,60,40,PI+.5,2*PI+.5);
  stroke(0);
  line(683,540,669,562);
  noStroke();
 translate(0,-15);
}

//make and store a new footprint
void footprint(float x, float y,float x2, float y2){
  translate(x2,y2);
  if(y-y2==0&&(x-x2!=0)) ang=PI/2*abs(x-x2)/(x-x2);
  else{
    ang=atan((x2-x)/(y-y2));
    if(abs(y-y2)/(y-y2)>0) ang = ang+PI;
  }
  footnum++;
  prints[footnum][0]=x;
  prints[footnum][1]=y;
  prints[footnum][2]=ang;
  rotate(ang);
  fill(219*bd*.8,173*bd*.8,113*bd*.8);
  ellipse(-4,-7,4,4);
  ellipse(-4,-2,4,9);
  ellipse(4,2,4,4);
  ellipse(4,7,4,9);
  rotate(ang*-1);
  translate(-1*x2,-1*y2);
}

//render an old footprint
void oldfootprint(float x, float y, float ang){
  translate(x,y);
  rotate(ang);
  fill(219*bd*.8,173*bd*.8,113*bd*.8);
  ellipse(-4,-7,4,4);
  ellipse(-4,-2,4,9);
  ellipse(4,2,4,4);
  ellipse(4,7,4,9);
  rotate(ang*-1);
  translate(-1*x,-1*y);
}

//a piece of the seat of the chair
void chairpiece(float off){
 beginShape();
  vertex(660+off,550+off);
  vertex(675+off,550+off);
  vertex(680+off,554+off);
  vertex(665+off,554+off);
  endShape();
}

//back of the chair piece
void chairpieceb(float off){
 beginShape();
  vertex(660+off,550-off);
  vertex(675+off,550-off);
  vertex(670+off,554-off);
  vertex(655+off,554-off);
  endShape();
}

//chair frame
void chaira(){
 stroke(255*bd);
 line(640,540,651,550);
 line(640,540,630,555);
 line(660,540,640,565);
 translate(16,0);
 line(660,540,640,565);
 translate(-16,0);
 translate(-5,6);
  line(640,540,650,550);
 translate(5,-6);
 noStroke();
}



float bt=PI;//building tracker
float btt=PI;//building tracker
int bh=0;//building height-ground
int xp,yp,wp,hp;//permenant values
int ground =0;//where buildings start
void building(int x, int w,int h, int red,int blue,int green){
  if(bh<200) h= h*bh/200; 
  else bh=200;
  strokeWeight(5);
  stroke(red/2,blue/2,green/2);
  
  fill(red,blue,green);
  //main building
  beginShape();
  vertex(x,height-ground);
  vertex(x+w,height-ground);
  if((bt/TWO_PI)%2<1){
    vertex(x+w+sin(bt)*w/5*h/120,height-ground-h+sin(bt)*h/10);
    vertex(x+sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
  }else{
    vertex(x+w-sin(bt)*w/5*h/120,height-ground-h+sin(bt)*h/10);
    vertex(x-sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
  }
  vertex(x,height-ground);
  endShape();
  
  //leftside
  fill(red*.6,blue*.6,green*.6);
  beginShape();
  vertex(x,height-ground);
  vertex(x-w/3,height-ground);
  
  if((bt/TWO_PI)%2<1){
    vertex(x-w/3+sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
    vertex(x+sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
  }else{
    vertex(x-w/3-sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
    vertex(x-sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
  }
  vertex(x,height-ground);
  endShape();
  
  
  //top
  fill(red*.8,blue*.8,green*.8);
  beginShape();
  if((bt/TWO_PI)%2<1){
    vertex(x-w/3+sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
    vertex(x+sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
    vertex(x+w+sin(bt)*w/5*h/120,height-ground-h+sin(bt)*h/10);
     vertex(x+w-w/3+sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
     vertex(x-w/3+sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
    
  }else{
    vertex(x-w/3-sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
    vertex(x-sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
    vertex(x+w-sin(bt)*w/5*h/120,height-ground-h+sin(bt)*h/10);
     vertex(x+w-w/3-sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
     vertex(x-w/3-sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);;
  }
  endShape();
  
  strokeWeight(2);
  stroke(red/4,blue/4,green/4);
  noFill();
   //main building
  beginShape();
  vertex(x,height-ground);
  vertex(x+w,height-ground);
  if((bt/TWO_PI)%2<1){
    vertex(x+w+sin(bt)*w/5*h/120,height-ground-h+sin(bt)*h/10);
    vertex(x+sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
  }else{
    vertex(x+w-sin(bt)*w/5*h/120,height-ground-h+sin(bt)*h/10);
    vertex(x-sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
  }
  vertex(x,height-ground);
  endShape();
  
  //leftside
  beginShape();
  vertex(x,height-ground);
  vertex(x-w/3,height-ground);
  
  if((bt/TWO_PI)%2<1){
    vertex(x-w/3+sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
    vertex(x+sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
  }else{
    vertex(x-w/3-sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
    vertex(x-sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
  }
  vertex(x,height-ground);
  endShape();
  
  
  //top
  beginShape();
  if((bt/TWO_PI)%2<1){
    vertex(x-w/3+sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
    vertex(x+sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
    vertex(x+w+sin(bt)*w/5*h/120,height-ground-h+sin(bt)*h/10);
     vertex(x+w-w/3+sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
     vertex(x-w/3+sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
    
  }else{
    vertex(x-w/3-sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
    vertex(x-sin(bt)*w/5*h/120, height-ground-h+sin(bt)*h/10);
    vertex(x+w-sin(bt)*w/5*h/120,height-ground-h+sin(bt)*h/10);
     vertex(x+w-w/3-sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);
     vertex(x-w/3-sin(bt)*w/5*h/120,height-ground-h-h/12+sin(bt)*h/10);;
  }
  endShape();
  
  
  
  
  xp=x;
 
  //windows
   //main building
  fill(255,255,0);
  for(int j=1;j<10;j++){
    for(int i=0;i<5;i++){
      x=xp+w*i/5+w/16;
      y=h*j/10+h/40;
      
      beginShape();
      if((bt/TWO_PI)%2<1){
      vertex(x+sin(bt)*w/5*h/120*j/9.5,height-ground-ground-y+sin(bt)*h/10*j/9.5);
      vertex(x+w/10+sin(bt)*w/5*h/120*j/9.5,height-ground-ground-y+sin(bt)*h/10*j/9.5);
  
      vertex(x+w/10+sin(bt)*w/5*h/120*j/9,height-ground-ground-h/20+sin(bt)*h/10*j/9-y);
      vertex(x+sin(bt)*w/5*h/120*j/9, height-ground-ground-h/20+sin(bt)*h/10*j/9-y);
      
     vertex(x+sin(bt)*w/5*h/120*j/9.5,height-ground-ground-y+sin(bt)*h/10*j/9.5);
     
      
      }else{
        vertex(x-sin(bt)*w/5*h/120*j/9.5,height-ground-ground-y+sin(bt)*h/10*j/9.5);
      vertex(x+w/10-sin(bt)*w/5*h/120*j/9.5,height-ground-ground-y+sin(bt)*h/10*j/9.5);
  
      vertex(x+w/10-sin(bt)*w/5*h/120*j/9,height-ground-ground-h/20+sin(bt)*h/10*j/9-y);
      vertex(x-sin(bt)*w/5*h/120*j/9, height-ground-ground-h/20+sin(bt)*h/10*j/9-y);
      
     vertex(x-sin(bt)*w/5*h/120*j/9.5,height-ground-ground-y+sin(bt)*h/10*j/9.5);
    
    }
      endShape();
     if(guyy&&j==2&&i==1){
       if((bt/TWO_PI)%2<1) guy(x+sin(bt)*w/5*h/120*j/9.5+w/20,height-ground-ground-y+sin(bt)*h/10*j/9.5-h/50,bh/200.0);
       else guy(x-sin(bt)*w/5*h/120*j/9.5+w/20,height-ground-ground-y+sin(bt)*h/10*j/9.5-h/50,bh/200.0);
     }
     
    }
  }

  
  noStroke();
  strokeWeight(1);
}




void guy(float x,float y,float h){
  
  fill(222,171,127);
  ellipse(x,y,12,9*h);
  stroke(0);
  strokeWeight(1.3);
  bezier(x-4,y+3*h,x-2,y,x+2,y,x+4,y+3*h);
  fill(0);
  ellipse(x-1,y-2*h,1.5,1.5*h);
  ellipse(x+3,y-2*h,1.5,1.5*h);
 
  fill(255,255,0);
  strokeWeight(2);
  if(dist(mouseX,mouseY,x,y)<30&&!time){
   cursor(HAND);
   arr=true;
     if(mousePressed) time=true;
  }
}



//change the height of the background light when the sunset happens
int ssos=100;
int sunoff=50;
float dsun;
int suny;
float cl=2.0;

//used to track poisitin of the sun, adjust darkness and timing
int x = 375;
int y = 200;
int yup=600-y;
float d = 5; //also used to time stars



//initial and current background colors for sky
float bgg1 =125;
float bgb1= 255;
float bgg= bgg1;
float bgb= bgb1;

//sun rotation and color
float sunrot=0;
float sr=0;
float sg=0;
int k; //for sun detail

//cloud position and color
int cp =0;
int cr=255;
int cg=255;
int cb=255;


//draw the sun, d for darkness, h for height
void sun(float d, int h) {
  for (int i=0;i<30;i++) {
    fill((2-d/5)*170+i*4, 140*(d/5)+i*4, 0);
    ellipse(375, h, 150-i*3.5, 150-i*3.5);
  }
  sr=(2-d/5)*170;
  sg=140*(d/5);
  k=0;
  for(float i=0;i<2*PI;i=i+PI/70){
    if(k%4==0)fill(sr,sg,0);
    if(k%4==1)fill(sr*1.2,sg*1.2,0);
    if(k%4==2)fill(sr,sg,0);
    if(k%4==3)fill(sr*.8,sg*.8,0);
    beginShape();
    vertex((float)(cos((i-.05+sunrot)*1)*75+375),(float)(sin((i-.05+sunrot)*1)*75+h));
    vertex((float)(cos((i+.05+sunrot)*1)*75+375),(float)(sin((i+.05+sunrot)*1)*75+h));
    vertex((float)(cos((i+sunrot)*1)*90+375),(float)(sin((i+sunrot)*1)*90+h));
    endShape();
    k++;
  }
  sunrot=sunrot+.005;
  clouds(cp);
  beach();
}



//draw a single cloud of height and width h and w and size s and length l
void cloud(int h, int w, int s, int l) {
  for (int i=0;i<l;i++) ellipse( (w+i*s)%750, h, 2*s, 2*s);
  for (int i=0;i<l;i++) ellipse( (w+i*s+s/2)%750, h+s, 2*s, 2*s);
  for (int i=0;i<l;i++) ellipse( (w+i*s+s)%750, h+2*s, 2*s, 2*s);
}


//draw some clouds at position cp
void clouds(int cp) {
  fill(cr, cg, cb);
 // stroke(cr/cl,cg/cl,cb/cl);
  cloud(100, cp, 10, 10);
  cloud(300, cp+420, 30, 5);
  cloud(200, cp+120, 5, 4);
  cloud(50, cp+160, 5, 4);
  cloud(20, cp+610, 15, 7);
  cloud(170, cp+500, 18, 3);
  cloud(310, cp+19, 31, 7);
  cloud(70, cp+350, 24, 2);
  cloud(240, cp+600, 20, 7);
  cloud(170, cp+200, 10, 9);
  noStroke();
}




//set up sky and ground with the right colors,etc for the daytime
void setting() {
  // size(750, 600);
  fill(0, bgg, bgb);
  ellipse(375,300,1020,900);
  if (y>205) {
    for (float i=1;i<100;i++) {
      fill(i/100*200, bgg*(1-i/100)+i/100*(5-d/5)*13, bgb*(1-i/100)+i/100*(5-d/5)*8);
      ellipse(375, 600, 800, (100.0-i)*1.5*(5-d)+ssos);
    }
  }
}  


//set up sky and ground with the right colors,etc for the automated sunset
void setting2() {
   size(750, 600);
  background(0, bgg, bgb);
  for (float i=1;i<100;i++) {
    fill(i/100*200, bgg*(1-i/100)+i/100*(5-dsun/5)*13, bgb*(1-i/100)+i/100*(5-dsun/5)*8);
    ellipse(375, 600, 800, (100.0-i)*1.5*(5-dsun)+ssos);
  }
} 

//set up sky and ground with the right colors,etc for the very end of sunset
void setting3() {
   size(750, 600);
  background(0, 0, 0);
  for (float i=1;i<100;i++) {
    fill((i/100*200)*yup/200, (bgg*(1-i/100)+i/100*(5-dsun/5)*13)*yup/200, (bgb*(1-i/100)+i/100*(5-dsun/5)*8)*yup/200);
    ellipse(375, 600, 800, (100.0-i)*1.5*(5-dsun)+ssos);
  }
  
} 




float yoff = 9.0;        // 2nd dimension of perlin noise



void ocean() {
 
  
  if(bd>.7)fill(0,0,255*pow(bd,3.0));
  if(bd<=.7&&(bd>.5)) fill(330*(.7-bd),0,255*pow(bd,3.0));
  // We are going to draw a polygon out of the wave points
  if(bd<=.5) fill(120*bd,0,255*pow(bd,3.5));
  beginShape(); 
  
  float xoff = 0;       // Option #1: 2D Noise
  // float xoff = yoff; // Option #2: 1D Noise
  
  // Iterate over horizontal pixels
  for (float x = -60; x <= width+60; x += 10) {
    // Calculate a y value according to noise, map to 
    float y2 = map(noise(xoff, yoff), 0, 1, 200,300); // Option #1: 2D Noise
    // float y = map(noise(xoff), 0, 1, 200,300);    // Option #2: 1D Noise
    
    // Set the vertex
    vertex(x, .68*y2+370); 
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.004;
  vertex(width+75, 500);
  bezierVertex(width/2+150,480,width/2-150,480,-75, 500);
  endShape(CLOSE);
}


//whether each star has been dstarroppedstar
boolean[] stars =new boolean[10];

//store the position andstar velocity of each star
float[]xx=new float[10];
float[]yy=new float[10];
float[]vx=new float[10];
float[]vy=new float[10];
int dstar=0;
boolean arr=false;

//rotation of stars
float rot=0;

//offset
int[] dstaroffs= new int[10];
int starlock=9999;



//a star at x,y with size r andstar rotation rot
void star(float x, float y,float r,float rot){
float a=72;
for(float i=0;i<100;i++){
 fill(i/100.0*255.0,i/100.0*255.0,i/100.0*255.0);
 if ((dist(x, y, mouseX, mouseY) < r)) fill(i/100.0*255.0*1.5,i/100.0*255.0*1.5,i/100.0*255.0*1.5);
 ellipse(x,y,pow(r,1.2)*(1-i/100),pow(r,1.2)*(1-i/100)); 
 
}
fill(255,255,255);
beginShape();
for(float i=rot;i<6;i++){
  vertex((float)(cos(a*i*PI/180)*r+x),(float)(sin(a*i*PI/180)*r+y));
  vertex((float)(cos((a*i+a/2)*PI/180)*r/3+x),(float)(sin((a*i+a/2)*PI/180)*r/3+y));
}
endShape();
}

//make a crescent moon
void moon(float x, float y,float r){
for(float i=10;i<100;i++){
 fill(i/100.0*255.0,i/100.0*255.0,i/100.0*255.0);
 if ((dist(x, y, mouseX, mouseY) < r)) fill((i+5)/100.0*255.0*1,(i+5)/100.0*255.0*1,(i+5)/100.0*255.0*1);
 ellipse(x,y,pow(r,1.2)*(1-i/100),pow(r,1.2)*(1-i/100)); 
}
fill(255);
y=y-r/20;
beginShape();
vertex(x-r/1.5,y+r/1.5);
bezierVertex(x-r/1.5,y+r/1.1,x+r*1.8,y+r*1.1,x+r/2.5,y-r/1.2);
bezierVertex(x+r/4.0,y+r/5.0,x+r/4.0,y+r/3.0,x-r/1.5,y+r/1.5);
endShape();
}

//make a little star for backgroundstar
void lstar(float x, float y, float r){
  for(float i=0;i<10;i++){
  fill(i/10.0*255.0,i/10.0*255.0,i/10.0*255.0);
  ellipse(x,y,r*(1-i/10.0),r*(1-i/10.0));
  }
}

//make backgroun stars appear gradstarually
void backgroundstars(){
  if(dstar<700){
    lstar(10,10,5.0*dstar/2000.0);
    lstar(20,100,3.0*dstar/2000.0);
    lstar(500,350,9.0*dstar/2000.0);
    lstar(725,105,8.0*dstar/2000.0);
    lstar(88,550,10.0*dstar/2000.0);
    lstar(312,412,2.0*dstar/2000.0);
    lstar(477,500,3.0*dstar/2000.0);
    lstar(602,212,4.0*dstar/2000.0);
    lstar(87,188,6.0*dstar/2000.0);
  }
   if(dstar<1400&&dstar>=700){
   lstar(10,10,5.0*dstar/2000.0);
    lstar(20,100,3.0*dstar/2000.0);
    lstar(500,350,9.0*dstar/2000.0);
    lstar(725,105,8.0*dstar/2000.0);
    lstar(88,550,10.0*dstar/2000.0);
    lstar(312,412,2.0*dstar/2000.0);
    lstar(477,500,3.0*dstar/2000.0);
    lstar(602,212,4.0*dstar/2000.0);
    lstar(87,188,6.0*dstar/2000.0);
    
    lstar(400,106,1.0*(dstar-700)/1300);
    lstar(322,77,3.0*(dstar-700)/1300);
    lstar(497,222,8.0*(dstar-700)/1300);
    lstar(552,189,9.0*(dstar-700)/1300);
    lstar(577,289,5.0*(dstar-700)/1300);
    lstar(601,316,2.0*(dstar-700)/1300);
    lstar(512,404,2.0*(dstar-700)/1300);
    lstar(399,15,2.0*(dstar-700)/1300);
  }
  
  if(dstar<2000&&dstar>=1400){
   lstar(10,10,5.0*dstar/2000.0);
    lstar(20,100,3.0*dstar/2000.0);
    lstar(500,350,9.0*dstar/2000.0);
    lstar(725,105,8.0*dstar/2000.0);
    lstar(88,550,10.0*dstar/2000.0);
    lstar(312,412,2.0*dstar/2000.0);
    lstar(477,500,3.0*dstar/2000.0);
    lstar(602,212,4.0*dstar/2000.0);
    lstar(87,188,6.0*dstar/2000.0);
    
    lstar(400,106,1.0*(dstar-700)/1300);
    lstar(322,77,3.0*(dstar-700)/1300);
    lstar(497,222,8.0*(dstar-700)/1300);
    lstar(552,189,9.0*(dstar-700)/1300);
    lstar(577,289,5.0*(dstar-700)/1300);
    lstar(601,316,2.0*(dstar-700)/1300);
    lstar(512,404,2.0*(dstar-700)/1300);
    lstar(399,15,2.0*(dstar-700)/1300);
    
    lstar(100,500,1.0*(dstar-1400)/600);
    lstar(50,476,3.0*(dstar-1400)/600);
    lstar(262,202,8.0*(dstar-1400)/600);
    lstar(75,406,9.0*(dstar-1400)/600);
  }
  
  if(dstar>=2000){
    lstar(10,10,5.0);
    lstar(20,100,3.0);
    lstar(500,350,9.0);
    lstar(725,105,8.0);
    lstar(88,550,10.0);
    lstar(312,412,2.0);
    lstar(477,500,3.0);
    lstar(602,212,4.0);
    lstar(87,188,6.0);
    
    lstar(400,106,1.0);
    lstar(322,77,3.0);
    lstar(497,222,8.0);
    lstar(552,189,9.0);
    lstar(577,289,5.0);
    lstar(601,316,2.0);
    lstar(512,404,2.0);
    lstar(399,15,2.0);
    
    lstar(100,500,1.0);
    lstar(50,476,3.0);
    lstar(262,202,8.0);
    lstar(75,406,9.0);
  }
  
}


//drop a star
void stardrop(float x, float y,float r,int dstaroff,int snum,boolean QUICK){
  if(dstar-dstaroff>=300&&dstar-dstaroff<800&&!stars[snum]&&!QUICK) star(x,-20*((800-(dstar-dstaroff))/300)+(dstar-dstaroff-800)/15-r/2,r,rot);
  if(dstar-dstaroff>=800&&!stars[snum]||QUICK){
     if ((dist(x, 0, mouseX, mouseY) < r)){
       cursor(HAND);
        arr=true; 
     }

    if ((dist(x, 0, mouseX, mouseY) < r &&mousePressed) ||QUICK){
      stars[snum]=true;
      vx[snum]=2;
      vy[snum]=0;
      xx[snum]=x;
      yy[snum]=-r/2;
      dstaroffs[snum+1]=(int)dstar;
    }else star(x,-r/2,r,rot);
  }
  if(stars[snum]){
    if(dist(xx[snum], yy[snum], mouseX, mouseY) < r){
      cursor(HAND);
      arr=true;
    }
    if((dist(xx[snum], yy[snum], mouseX, mouseY) < r &&mousePressed&&(starlock==snum||starlock==9999))||(mousePressed&&starlock==snum)){
      starlock=snum;
      cursor(HAND);
      arr=true;
      vx[snum]=0;
      vy[snum]=0;
      if(dist(x,0,mouseX,mouseY)<y*1.2){
        xx[snum]=mouseX;
        yy[snum]=mouseY;
       }
    }else{
      if(starlock ==snum) starlock=9999;
      xx[snum]=xx[snum]+vx[snum];     
      vx[snum]=(vx[snum]+(x-xx[snum])*.01)*.98;
      yy[snum]=yy[snum]+vy[snum];     
      vy[snum]=(vy[snum]+(y-yy[snum])*.01)*.96;
    }
    star(xx[snum],yy[snum],r,rot);
    stroke(255);
    line(x,0,xx[snum],yy[snum]);
    noStroke();
  }
}



//dstarrop the moon
void moondrop(float x, float y,float r,int dstaroff,int snum){
  if(dstar-dstaroff>=300&&dstar-dstaroff<800&&!stars[snum]&&!QUICKK) moon(x,-20*((800-(dstar-dstaroff))/300)+(dstar-dstaroff-800)/15-r/2,r);
  if(dstar-dstaroff>=800&&!stars[snum]&&!QUICKK){
     if ((dist(x, 0, mouseX, mouseY) < r)){
       cursor(HAND);
       arr=true;  
   }

    if ((dist(x, 0, mouseX, mouseY) < r &&mousePressed) ){
      stars[snum]=true;
      vx[snum]=2;
      vy[snum]=0;
      xx[snum]=x;
      yy[snum]=-r/2;
      dstaroffs[snum+1]=(int)dstar;
      arr=true;
    }else moon(x,-r/2,r);
  }
  if(stars[snum]){
    if(dist(xx[snum], yy[snum], mouseX, mouseY) < r){
      cursor(HAND);
      arr=true;
    }
    if((dist(xx[snum], yy[snum], mouseX, mouseY) < r &&mousePressed&&(starlock==snum||starlock==9999))||(mousePressed&&starlock==snum)){
      arr=true;
      starlock=snum;
      cursor(HAND);
      vx[snum]=0;
      vy[snum]=0;
      if(dist(x,0,mouseX,mouseY)<y*1.2){
        xx[snum]=mouseX;
        yy[snum]=mouseY;
       }
    }else{
      if(starlock ==snum) starlock=9999;
      xx[snum]=xx[snum]+vx[snum];     
      vx[snum]=(vx[snum]+(x-xx[snum])*.01)*.98;
      yy[snum]=yy[snum]+vy[snum];     
      vy[snum]=(vy[snum]+(y-yy[snum])*.01)*.96;
    }
  
    stroke(255);
    line(x-r/1.5,0,xx[snum]-r/1.5,yy[snum]+r/1.5-r/20);
    line(x+r/2.5,0,xx[snum]+r/2.5,yy[snum]-r/1.2-r/20);
    noStroke();
      moon(xx[snum],yy[snum],r);
  }
}



//draw the picture
void draw() {
  //cursor(ARROW);
 strokeWeight(1);
  //if the sun isn't too high or low redraw it and sky with appriate adjustments
  if (round==1) {
     //track arrow movement and adjust colors of sun and sky
  if (dist(x, y, mouseX, mouseY) < 150 / 2) {
    cursor(HAND);
    arr=true;
    if (mousePressed) {
      y = mouseY;
      yup=600-y;
      d = 5*(float)yup/400.0;
      bgg=bgg1*((float)yup/500.0+.25);
      bgb=bgb1*((float)yup/500.0+.25);
      cb=255-(5-(int)d)*5;
      cg=255-(5-(int)d)*20;
    }
  } else cursor(ARROW);
    if (y>=550-sunoff) {
      //cp++;
      round=2;
    }
    else {
      cp++;
      if (y>=200){
        setting();
        sun(d, y);
      }else {
        y=200;
        yup=600-y;
        d = 5*(float)yup/400.0;
        bgg=bgg1*((float)yup/500.0+.25);
        bgb=bgb1*((float)yup/500.0+.25);
        cb=255-(5-(int)d)*5;
        cg=255-(5-(int)d)*20;
         setting();
        sun(d, 200);
      }
    }
  }
  
  
  

  //automate the end of the sunset
  if (round==2) {
    y++;
    yup=700-y;
    d = -1*yup/250*5;
    dsun=5*(600-y)/400.0;
    bgg=bgg1/4*yup/100;
    bgb=bgb1/4*yup/100;
    cr=255*yup/150+50*(1-yup/150);
    cb=(int)(233.125*yup/151+30*(1-yup/150));
    cg=(int)(167.5*yup/170+10*(1-yup/150));
    setting2();
    sun(dsun, y);
    cp++;
    if (y>700){
     //translate(0,-10);
     round=3;
     up=true;
    }
  }
  
  
  //very end of the sunset after the sun is gone
  if (round==3) {
   
   y=y+3;
    yup=900-y;
    d=5*(600-y)/400.0;
    dsun=5*(600-y)/400.0;
    cr=50*yup/200+30-30*yup/200;
    cb=30*yup/200+30-30*yup/200;
    cg=10*yup/200+30-30*yup/200;
    setting3();
    
    sun(dsun, y);
    cp++;
    if(up){
    up=false;
   // translate(0,10);
    }
    if (y>=900){
      round=4; 
      
    }
   
  }

  //start droppin stars
  if (round==4) {
    arr=false;
    cr=(int)(30.0*(1.0-dstar/3000.0));
    cb=cr;
    cg=cr;
    background(0, 0, 0);
    backgroundstars();
    if(cr>15)clouds(cp);
    dstar=dstar+4;
     cp++;
    rot=(float)(dstar%75)/75.0;
    stardrop(200.0,200.0,30.0,0,0,false);
    if(stars[0]) stardrop(520.0,488.0,32.0,dstaroffs[1],1,false);
    if(stars[1]) stardrop(100.0,70.0,38.0,dstaroffs[2],2,false);
    if(stars[4]) stardrop(150.0,388.0,20.0,dstaroffs[5],5,QUICKK);
    if(stars[3]) stardrop(420.0,300.0,40.0,dstaroffs[4],4,QUICKK);
    if(stars[2]){
      stardrop(302.0,150.0,20.0,dstaroffs[3],3,QUICKK);
      if(stars[5]==true) QUICKK=false;
      for(int i = 3;i<6;i++) stars[i]=true;
    }
    if(stars[5]){
      moondrop(590.0,150.0,80.0,dstaroffs[6],6);
      if(stars[6]){
        bh++; 
         if(bh>=100){
          bh=0;
          round =5;
        }
      }
    }
  }
  if (!arr) cursor(ARROW);
  
      if(round==5){
        dstar=dstar+4;
        rot=(float)(dstar%75)/75.0;
        arr=false;
        background(0, 0, 0);
    backgroundstars();
    stardrop(200.0,200.0,30.0,0,0,false);
   stardrop(520.0,288.0,32.0,dstaroffs[1],1,false);
    stardrop(100.0,70.0,38.0,dstaroffs[2],2,false);
    stardrop(150.0,250.0,20.0,dstaroffs[5],5,false);
   stardrop(420.0,110.0,40.0,dstaroffs[4],4,false);
    
      stardrop(302.0,150.0,20.0,dstaroffs[3],3,false);
   
  
      moondrop(590.0,100.0,80.0,dstaroffs[6],6);
      
    
      bt=bt+PI/20;
      bh++;
    if(bt-btt>=PI){
      bt=bt+PI;
      if(bt>4*PI) bt=PI;
      btt=bt;
    }
     building(210,200,120,110,255,0);
    building(60,90,220,0,110,110);
      building(100,70,200,110,0,255);
      building(300,100,250,255,110,0);
     
      building(430,78,400,110,255,255);
      guyy=true;
        building(550,150,250,170,170,0);
       guyy=false;
       
          
         
        
        if(time) change=true;
        }
        if(change){
          fill(255);
          stroke(0);
          if(cc<20){
           cc++;
           ellipse(620,520,20*cc/40.0,20*cc/40.0);
          }else{
           ellipse(620,520,20*cc/40.0,20*cc/40.0);
          change2=true; 
          }
          noStroke();
          }
          if(change2){
             fill(255);
          stroke(0);
          if(cc<40){
           cc++;
           ellipse(640,505,20*cc/30.0,20*cc/30.0);
          }else{
           ellipse(640,505,20*cc/30.0,20*cc/30.0);
          change3=true; 
          }
          noStroke();
          }
        
         if(change3){
            
           y=200; 
           if(back<60) back= back+2;
           translate(690-(float)back/1000.0*690.0,490.0-(float)back/1000.0*490.0);
           scale((float)(back/1000.0));
            yup=600-y;
            
      d = 5*(float)yup/400.0;
      bgg=bgg1*((float)yup/500.0+.25);
      bgb=bgb1*((float)yup/500.0+.25);
      cb=255-(5-(int)d)*5;
      cg=255-(5-(int)d)*20;
      cr=255;
            setting();
            sun(d, 200);
             noFill();
  stroke(0);
  strokeWeight(25);
   ellipse(375,300,1010,900);
  noStroke();
  strokeWeight(1);
           scale(1000.0/(float)back);
           translate((640-(float)back/1000.0*640)*-1,(540-(float)back/1000.0*540)*-1);
           if(back<1000&&go)
             back=back+10;
           if(dist(mouseX,mouseY,690,490)<60&&!go){
            cursor(HAND);
            arr=true;
           if(mousePressed) go=true; 
           }

         
        if(back>=1000){
             
             bt=PI;//building tracker
              btt=PI;//building tracker
              bh=0;//building height-ground
              //whether each star has been dropped


//store the position and velocity of each star

 dstar=0;
d=5;
bd=0;
arr=false;



//offset

for(int i=0;i<10;i++){
dstaroffs[i]=0;
xx[i]=0;
vx[i]=0;
yy[i]=0;
vy[i]=0;
stars[i]=false;
}

starlock=9999;
y=200;
 QUICKK=true;
 change=false;
 back=0;
 go=false;
round=1;
guyy=false;
time=false;
change2=false;
change3=false;
cc=0;
cc2=0;
         }
           }
    
 
   if (!arr) cursor(ARROW);
   
 }
 
 



