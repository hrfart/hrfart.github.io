//to do:

//height can't decrease
//sound bad on mobile
//custom loading page


//occasional loud swelling??
//galaxies??? probably not


//background variables
var numstars=400;
var stars=[];


//main enviornment vairables
var w;
var h;
var fr=30;

var basepath="http://hrfart.github.io/";

//management of buttons and menus
var trans;
var menu=1;
var prevmenu=1;
var currentsong=0;
var menus=new Array();
var sm=.8;//make selection range smaller

var clickwait=5;

//sound variables
var music=[];
var wind;
var swells;
var shrink;
var mute=1;
var songmute=1;
var musicplaying=false;
var mute2;
var ok2click=0;

var fade=0;

var leaves=[];

var gosounds;
var evol=.06;
var wvol=.21;


function preload(){
mute2=loadImage(basepath+"mute2.png");
//image(mute2,0,0,w,h);
//  wind=loadSound("http://hrfart.github.io/wind.mp3");
// hand=loadImage("http://hrfart.github.io/hand.png"); 
//	for(var i=0;i<3;i++)leaves[i]=loadImage("http://hrfart.github.io/leaf"+(i+1)+".png");

music[0]=loadSound(basepath+"floating.mp3");
music[1]=loadSound(basepath+"Trictotrism.m4a");
music[2]=loadSound(basepath+"Autumn.m4a");
music[3]=loadSound(basepath+"Mystery.m4a");

wind=loadSound(basepath+"wind.mp3");
swells=loadSound(basepath+"swell.mp3");
shrink=loadSound(basepath+"shrink.mp3");

//load in sounds here
for(var i=0;i<9;i++)leaves[i]=loadImage(basepath+"leaf"+i+".png");
populatemenus();

}


function setup(){
	//tinkle.setVolume(0);
	//tinkle.loop();
	music[currentsong].loop();
	musicplaying=true;
	//trans=new Transit();
	trans=0;
	menu=1;
	prevmenu=2;
	imageMode(CENTER);
	fullscreen();
  	 frameRate(fr);
	for(var i=0;i<numstars;i++)stars[i]=new Star();

}





function draw(){
	
	createCanvas(windowWidth, windowHeight);
	w=windowWidth;
	h= windowHeight;
	

  	fr=getFrameRate();
  	domusic();
  	
  	sitebackground();
 
 	cursor(ARROW);
 	var k=menus[0].domenu();
   if( k>0){
    ok2click=clickwait;
   	if(k==1){
   		trans=1;
   		if(gosounds||(mute==1 && (prevmenu>6||currentsong>0) )){
   			//swells.stop();
			wind.play();
			wind.setVolume(wvol);
   		}
   	}
  
   }
   
   if(prevmenu>6)fade=trans;
   else if (menu>6)fade=(1-trans);
   else fade=0;
   var drewleaves=false;
	if(menu>6||(prevmenu>6&&trans>0)){
		frontleaves()	
		drewleaves=true;
	}

   fill(0,180*fade);
   rect(0,0,w,h);
   // trans.setit();
  //  var oldm=menu;
  	fill(155);
    if(trans>0){
    	if(prevmenu>6&&trans<.1) menus[prevmenu].close();
    	trans=trans-.008*(5-9*abs(trans-.5))*30/fr;
    	//pushMatrix();
    	translate((trans-1)*w,0);
    
    	menus[prevmenu].domenu();
    	translate(w,0);
   
    	menus[menu].domenu();
    	if(trans<=.005)trans=0;
    	translate(-trans*w,0);
    	//popMatrix();
    }else{
    	if(menus[menu].domenu()==1){
    	 trans=1;
    	ok2click=clickwait;
    	if(gosounds||(mute==1 && (prevmenu>6||currentsong>0) )){
   		//	swells.stop();
			wind.play();
			wind.setVolume(wvol);
   		}
		
		}
    }
    
    if(mouseIsPressed==false && touchIsDown==false && ok2click>0)ok2click--;
   // if(oldm!=menu)trans.doit();
    if(!drewleaves)frontleaves()	
}


function domusic(){
	var hush=.3;
	
	if(menu!=4 && currentsong!=0){
		music[currentsong].stop();
		currentsong=0;
		music[currentsong].loop();
	}
	
	if(currentsong!=0)music[currentsong].setVolume(1);
	else if(menu>6)music[currentsong].setVolume(trans*mute*hush);
	else if(prevmenu>6&&trans>0)music[currentsong].setVolume((1-trans)*mute*hush);
	else music[currentsong].setVolume(mute*hush);
	
	gosounds=true;
	if(mute==0 || currentsong>0 || menu>6)gosounds=false;
}



//////////////////////BACKGROUND//////////////////////
function sitebackground(){
	background(0); 

 	for(var i=0;i<numstars;i++)stars[i].updatedraw();
 	
 }
 
 

//stars
var srin=5;
function Star(){
	this.x=random(1.2); 
    this.y=random(1); 
    this.s=.002+random(.002);
    this.p=random(TWO_PI);
    this.os=(.6+random(1.2))/fr;
    this.b=150+random(55); 
    
    
     
    this.updatedraw = function(){
    noStroke();
    var ww=max(w,h*1280/720);
    this.p += this.os;
    this.x-=this.s*.3+.075*(.5-abs(.5-trans));
    if(this.x<0)this.x+=1.2;
    for(var j=srin;j>0;j--){
      fill(250,max(0,min(255,.6*(srin-j)/srin*this.b*(.2+.8*pow(sin(this.p),2)))));
      ellipse((this.x-.1)*w,this.y*h,this.s*ww*j/srin*2,this.s*ww*j/srin*2); 
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




//////////////////BUTTON/////////////////////

function Button(inter,i,xx,yy,wii,hii,soundt,picc){
	this.pic=loadImage(basepath+picc+".png");
	this.internal=inter;
	this.link=i;
	this.ourmenu=i;
	this.sound=soundt;
	this.x=xx;
	this.y=yy;
	this.wi=wii;
	this.hi=hii;
	
	this.swell=1;
	this.issoundok=true;
	this.dsoundok=true;
	

	this.transs=0;
	this.t=1;
	this.pm;
	this.mm;
	
	this.mouseover = function(){
		
		if(abs(this.x-mouseX/w)<this.wi/2*this.mm/w*sm&&abs(this.y-mouseY/h)<this.hi/2*this.mm/h*sm) return true;
		else if(abs(this.x-touchX/w)<this.wi/2*this.mm/w*sm&&abs(this.y-touchY/h)<this.hi/2*this.mm/h*sm) return true;

		else return false;
	};
	
	this.click = function(){
		touchX=-1000;
		touchY=-1000;
		if(this.sound) this.dosound();
		else{
			if(!this.internal){
			//addTab(this.link);
			 //link(this.link);
			// var links=window.open('',"_blank");
			 //links.location.href = this.link;
			 location = this.link;
			 }else {
				
					mouseIsPressed=false;
					touchIsDown=false;
					prevmenu=menu;
					menu=this.ourmenu;
				//	this.transs=1;
					
					//PLAYSWAPSOUND
				
			}
		
		}
		return 0;
	};
	
	this.updateanddraw = function(){
		this.mm=min(h,w);
		this.transs=0;
		//this.transs=0;
		if(trans==0){
			if(this.mouseover()==true){
				cursor(HAND);
				if(this.issoundok){
					//PLAYISOUND
					this.issoundok=false;
				}
				if(this.swell<1.3){
					if(this.swell<=1 && gosounds){
						swells.stop();
						swells.play();
						swells.setVolume(evol);
					}
					this.swell+=.03;
				}
				if(mouseIsPressed||touchIsDown && ok2click==0){
					
					
					if( this.internal==true && this.sound == false){
					this.transs=1;
					//fill(255);
					//text(""+this.transs,.5*w,.5*h);
					}
					if(this.sound==true){
						this.transs=2;
					}
					this.click()
				}
						
				this.dsoundok=true;
			}else{
				this.isoundok=true;
				if(this.dsoundok){
					//PLAYDSOUND
					this.dsoundok=false;
				}
				if(this.swell>1){
					if(this.swell>=1.3 && gosounds){
						shrink.stop();
						shrink.play();
						shrink.setVolume(evol);
					}
					this.swell-=.03;
					
				}
			}
		
		}else if(this.swell>1){
			if(this.swell>=1.3 && gosounds){
						//shrink.stop();
						//shrink.play();
						//shrink.setVolume(evol);
			}
			this.swell-=.03;
		}
		
		
		image(this.pic,this.x*w,this.y*h,this.wi*this.mm*this.swell,this.hi*this.mm*this.swell);
		if(this.sound==1 && currentsong==this.ourmenu && this.ourmenu!=0)image(mute2,this.x*w,this.y*h,this.wi*this.mm*this.swell,this.hi*this.mm*this.swell);
		if(this.ourmenu==0 && mute==1)image(mute2,this.x*w,this.y*h,this.wi*this.mm*this.swell,this.hi*this.mm*this.swell);
		return this.transs;
	};
	
	
	this.dosound = function(){

			if(this.ourmenu==0){
				if(ok2click==0){
					mute=1-mute;
					prevmute=mute;
					ok2lick=4;
				}
			}else{
			//	songs[currentsong.stop();
				if(currentsong==this.ourmenu){
					music[currentsong].stop();
					currentsong=0;
	
					music[currentsong].loop();
				}else{
					music[currentsong].stop();
					currentsong=this.ourmenu;
					music[currentsong].play();
					//need to set mute to prevmute when do music in draw function
				//	songs[currentsong].play();
				}
			}
		
		
	};
}





function Disptext(ss,xx,yy,si){
	this.x=xx;
	this.y=yy;
	this.size=si;
	this.t=ss;
	
	this.updateanddraw = function(){
		textAlign(CENTER);
		textFont("Times",this.size*w*.1);
		text(this.t,this.x*w,this.y*h);
		return 0;
	};

}

var div;
var div2;
function Vid(youtube,ss){
	this.t=ss;
	this.running=false;
	
	this.updateanddraw = function(){
		
		if(this.running==false&&menu>6){
			if(youtube==true) div = createDiv("<iframe  src='https://www.youtube.com/embed/"+this.t+"' frameborder='0' allowfullscreen></iframe>");
  			else div=createDiv("<iframe src=https://bandcamp.com/EmbeddedPlayer/album="+this.t+"/size=large/bgcol=333333/linkcol=0687f5/tracklist=true/artwork=small/transparent=true/' seamless></iframe>");
  			this.running=true;
  		}
  		if(this.running==true){
			div2=createDiv("<style> iframe{ width: "+min(w*.7,700)+"px; height: "+(h*.5)+"px; } </style>");
  			if(menu>6)
  				div.position((.15+trans)*w,.2*h);
  			else
  				div.position((.15+(trans-1))*w,.2*h);
  		}
	
	};
	
	this.close = function(){
		if(this.running==true){
			this.running=false;
			div.remove();
		}
	};
}




/////MENU///////////

function Menu(){
	this.buttons=new Array(20);
	//this.strings;
	this.numb=0;
	//this.nums=0;
	this.t=0;
	this.kk=0;
	
	this.close = function(){
		this.buttons[0].close();
	
	};
	
	this.domenu= function(){
		this.t=0;
		for(var i=0;i<this.numb;i++){ 
			this.kk=this.buttons[i].updateanddraw()
			if(this.kk>this.t){
				this.t=this.kk;
			//	fill(255);
			//	text(""+this.t,.5*w,.5*h);
			}
		}
		return this.t;
				
		
	};

	this.add=function(a){
		this.buttons[this.numb]=a;
		this.numb++;
	};
}




function populatemenus(){
	for(var i=0;i<23;i++) menus[i]=new Menu();
	
	//main menu
	menus[1].add(new Disptext("harry rubin-falcone's portfolio",.5,.35,.3));
	
	
	//full time menu
	menus[0].add(new Button(true,1,.125,.1,.23,.15,false,"home"));
	menus[0].add(new Button(true,2,.375,.1,.23,.15,false,"animation"));
	menus[0].add(new Button(true,3,.625,.1,.23,.15,false,"interactive"));
	menus[0].add(new Button(true,4,.875,.1,.23,.15,false,"music"));
	menus[0].add(new Button(true,5,.25,.87,.12,.12,false,"contact"));
	menus[0].add(new Button(false,"http://hrfart.github.io/home.html",.5,.87,.12,.12,false,"mathart"));
	menus[0].add(new Button(true,0,.75,.87,.12,.12,true,"mute"));
	menus[0].add(new Button(false,"https://www.youtube.com/channel/UCedqcMJnznhrbnWOLWwdUbA",.125,.92,.12,.12,false,"youtube"));
	menus[0].add(new Button(false,"https://harryrubin-falcone.bandcamp.com/",.375,.92,.12,.12,false,"bandcamp"));
	menus[0].add(new Button(true,6,.625,.92,.12,.12,false,"festivals"));
	menus[0].add(new Button(false,"https://www.ncbi.nlm.nih.gov/pubmed/?term=harry+rubin-falcone",.875,.92,.12,.12,false,"science"));
	
	
	var asize=.18;
	var asizeb=.12;
	//animation
	menus[2].add(new Button(true,7,.1,.3,asize,asize,false,"ndop"));
	menus[2].add(new Button(true,8,.275,.3,asize,asize,false,"ld"));
	menus[2].add(new Button(true,9,.45,.3,asize,asize,false,"rdort"));
	menus[2].add(new Button(true,10,.625,.3,asize,asize,false,"three"));
	
	menus[2].add(new Button(true,11,.55,.5,asize,asize,false,"ep1"));
	menus[2].add(new Button(true,12,.725,.5,asize,asize,false,"ep2"));
	menus[2].add(new Button(true,13,.9,.5,asize,asize,false,"ep3"));
	//menus[2].add(new Button(true,22,.9,.5,asize,asize,false,"leaf1"));
	
	menus[2].add(new Button(true,14,.175,.65,asize,asize,false,"kite"));
	menus[2].add(new Button(true,15,.4,.65,asize,asize,false,"ship"));
	menus[2].add(new Button(true,16,.65,.73,asizeb,asizeb,false,"cows"));
	menus[2].add(new Button(true,17,.75,.73,asizeb,asizeb,false,"train"));
	menus[2].add(new Button(true,18,.85,.73,asizeb,asizeb,false,"hello"));
	
	//interactive
	menus[3].add(new Button(false,"http://hrfart.github.io/star_drawer/index.html",.5,.4,.3,.3,false,"stardrawer"));
	menus[3].add(new Button(false,"http://hrfart.github.io/SomeSchlubScalesCity.zip",.75,.6,.3,.3,false,"schlub"));
	menus[3].add(new Button(false,"http://hrfart.github.io/app/index.html",.25,.6,.3,.3,false,"staycation"));
	
	//music
	menus[4].add(new Disptext("harry rubin-falcone is a new york city-based upright and electric bass player, primarily interested",.5,.25,.18));
	menus[4].add(new Disptext("in jazz, funk, fusion, rock, and classical music. he also plays guitar and composes. ",.5,.28,.18));
	menus[4].add(new Disptext("soundtrack",.1,.45,.2));
	menus[4].add(new Disptext("compositions",.1,.48,.2));
	menus[4].add(new Disptext("bass",.2,.65,.2));

	var mussize=.2
	menus[4].add(new Button(true,20,.5,.45,mussize,mussize,false,"dancersst"));
	menus[4].add(new Button(true,19,.3,.45,mussize,mussize,false,"mmsst"));
	menus[4].add(new Button(true,21,.7,.45,mussize,mussize,false,"schlubst"));

	menus[4].add(new Button(true,1,.4,.65,mussize,mussize,true,"tric"));
	menus[4].add(new Button(true,2,.6,.65,mussize,mussize,true,"aut"));
	menus[4].add(new Button(true,3,.8,.65,mussize,mussize,true,"mys"));
	
	//contact
	menus[5].add(new Disptext("harry rubin-falcone: animation, bass, composition",.5,.35,.2));
	menus[5].add(new Button(false,"mailto:harryrubinfalcone@gmail.com",.5,.6,.25,.25,false,"contact2"));
	
	
	//festivals
	menus[6].add(new Button(false,"http://airport-anifes.jp/en/competition/awards/",.3,.4,.3,.3,false,"chiose"));
	menus[6].add(new Button(false,"http://www.festivalcinemadarte.com/film-eng",.7,.4,.3,.3,false,"darte"));

	menus[6].add(new Button(false,"http://gallery.bridgesmathart.org/exhibitions/2013-joint-mathematics-meetings/hrubinfa",.5,.6,.3,.3,false,"bridges"));
	
	//videos
	menus[7].add(new Vid(true,"oBvd2DjFr60"));
	menus[8].add(new Vid(true,"1Mih9U_q-lY"));
	menus[9].add(new Vid(true,"xE3bz0Vx6dc"));
	menus[10].add(new Vid(true,"C-Bp3IprUw4"));
	
	menus[11].add(new Vid(true,"pAygnhump5s"));
	menus[12].add(new Vid(true,"qBegtnZOXCg"));
	menus[13].add(new Vid(true,"LYrup9h3goo"));
	
	menus[14].add(new Vid(true,"TnrMlbZKZLQ"));
	menus[15].add(new Vid(true,"0cEVwoQqgG4"));
	menus[16].add(new Vid(true,"qXU2-0r18Sg"));
	menus[17].add(new Vid(true,"AEZ6qmHFGYk"));
	menus[18].add(new Vid(true,"nHd89kA6Utc"));
	
	//albums
	menus[19].add(new Vid(false,"1696192640"));
	menus[20].add(new Vid(false,"387913001"));
	menus[21].add(new Vid(false,"3372271177"));


	menus[22].add(new Vid(false,"1696192640"));
	//add back buttons
	for(var i=7;i<19;i++)menus[i].add(new Button(true,2,.5,.75,.1,.1,false,"back"));
	for(var i=19;i<22;i++)menus[i].add(new Button(true,4,.5,.75,.1,.1,false,"back"));
	menus[22].add(new Button(true,2,.5,.8,.2,.1,false,"back"));
}






//leaves



var framesbetweenleaves=80;
var likelyhoodofleaf=.05;
var leafgentime=0;
var wleaves=[];


function frontleaves(){
  

  
    if(leafgentime>0)leafgentime-=1+25*(.5-abs(.5-trans));
    else if(random(1)<likelyhoodofleaf){
       leafgentime= framesbetweenleaves;
       append(wleaves,new Windleaf());
    }
    
    for(var i=wleaves.length-1;i>=0;i--){
 	   if(wleaves[i].updateanddraw()==1){ //remove(wleaves[i]);//shorten(wleaves);
   			var sub1=subset(wleaves,0,i);
   			var sub2=subset(wleaves,i+1);
   			for(var j=0;j<sub2.length;j++)
   				append(sub1,sub2[j]);
   			wleaves=sub1;
   			}
   }
}



function Windleaf(){


    //variables
    this.angle=0;
    this.lt=floor(random(9));
    this.x=1.1;
    this.y=-.4+random(1.2);
    this.speed=(.0005+random(.001))*.4;
    this.size=.05+random(.1);
	this.yv=0;
	this.ya=1;
      

  
  //returns true if off screen
   this.updateanddraw=function(){
    
    //update position
   this.x-=3*(this.speed+random(this.speed*2))+.05*(.5-abs(.5-trans));;  
     //this.y+=3*(this.speed*4.5-random(this.speed*8))*1.2;
     this.yv+=random(this.speed)*this.ya*.5;
     if(abs(this.yv)>.005){
     	this.ya=-this.ya;
     	this.yv=.0049*this.yv/abs(this.yv);
     }
     this.y+=this.yv+.001;
     this.angle+=.5*(this.speed/15.0+random(this.speed)/10.0+.1);
     
   
     
     //draw
    // pushMatrix();
     translate(w*this.x,h*this.y);
     rotate(this.angle);
     image(leaves[this.lt],0,0,this.size*abs(cos(this.angle))*w,this.size*sin(this.angle)*w);
     rotate(-this.angle);
     translate(-w*this.x,-h*this.y);
     
     
     if(this.x<-.1)return 1;
     return 0;
  }
}
