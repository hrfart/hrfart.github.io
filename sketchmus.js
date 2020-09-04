var menu=4;

var monurl="4QHjH7irm7E";
var hawkfull="RDIF2s0oFig";
var hawkurl="EMJP3AHmMx4";
var hoourl="f5YsAUwXSHQ";
var pimurl="x17ZTdi26ek";
var hrfurl="3892272952";
var chi2="http://site2018.airport-anifes.jp/en/showcase_item/my_mother/";
//background variables
var numstars=100;
var stars=[];


//main enviornment vairables
var w;
var h;
var fr;

var basepath="";//"http://hrfart.github.io/";

//management of buttons and menus
var trans;

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
var mute=0;
var songmute=0;
var musicplaying=false;
var mute2;
var ok2click=0;
var musicloaded=false
var fade=0;

var leaves=[];

var gosounds=true;
var evol=1;//.05;
var wvol=.5;

var omobile=false;
var lasttouchX=999999;
var lasttouchY=999999;

var silentm;
var silentpm;
var justremoved=false;

var opening;
var normmenu;
var normprev;

var pngs=".png"
var goforit=false

var touchGood=false
//var opening2;
function preload(){
pngs=".png"
if(deviceOrientation=='landscape' || deviceOrientation=='portrait') omobile=true;


if(isMobileDevice()) pngs=".small.png"

var ds=min(windowWidth,windowHeight);
opening=createDiv("<img src='loadingscreen.png'  width = '"+windowWidth+"' height = '"+windowHeight+"'>");
opening.position(0,0);
//opening2=createDiv("<iframe src='sitepre/index.html'  width = '"+windowWidth+"' height = '"+windowHeight+"'  frameborder='0'></iframe>");
//opening2.position(0,0);

//"<iframe src='"+this.t+"' frameborder='0'></iframe>

tthappy=loadImage(basepath+"tt_happy"+pngs);
ttnot=loadImage(basepath+"tt_not"+pngs);
openhand=loadImage(basepath+"handopen"+pngs);
openhandnt=loadImage(basepath+"handopennt"+pngs);
closedhand=loadImage(basepath+"handclosed"+pngs);
mute2=loadImage(basepath+"mute2"+pngs);
mute3=loadImage(basepath+"mute3"+pngs);
//image(mute2,0,0,w,h);
//  wind=loadSound("http://hrfart.github.io/wind.mp3");
// hand=loadImage("http://hrfart.github.io/hand.png"); 

music[0]=loadSound(basepath+"floating.mp3");
//music[1]=loadSound(basepath+"Trictotrism.m4a");
//music[2]=loadSound(basepath+"Autumn.m4a");
//music[3]=loadSound(basepath+"Mystery.m4a");

wind=loadSound(basepath+"wind.mp3");
swells=loadSound(basepath+"swell.mp3");
shrink=loadSound(basepath+"shrink.mp3");


minty=loadSound(basepath+"minty.mp3");
//load in sounds here
for(var i=0;i<9;i++)leaves[i]=loadImage(basepath+"leaf"+i+pngs);
populatemenus();

}
var numtoidstars=20
var toidstars=[]
function setup(){
	opening.remove();
	//opening2.remove();

	trans=0;

	prevmenu=2;
	imageMode(CENTER);
	fullscreen();
  	 frameRate(30);
	
	//if(deviceOrientation=='undefined') omobile=false;
	
	if(isMobileDevice()){
		evol=0;
		numstars=50;
		sm=1.5
		
	}else{
	
	goforit=true
	}
	for(var i=0;i<numstars;i++)stars[i]=new Star();
	for(var i=0;i<numtoidstars;i++)toidstars[i]=new toidStar();

}




var mobilebad=0
function draw(){

	

	createCanvas(windowWidth, windowHeight);
	
	w=windowWidth;
	h=windowHeight;

	

  	

  	
  	
  	
 
   
 	
	silentm=false;
	silentpm=false;
	
	//up to 6 are standards, 33-35 are animation subcategories, 38 is more page
	normmenu=(menu<=6  || menu==33   || menu==34   || menu==35 || menu==38);
	normprev=(prevmenu<=6  || prevmenu==33   || prevmenu==34   || prevmenu==35 || prevmenu==38);
	
	//22 and 23 are math art and staycation which should be like videos by not silent.
	if(!normmenu)silentm=true;
	if(menu==22 || menu==23)silentm=false;
	if(!normprev)silentpm=true;
	if(prevmenu==22 || prevmenu==23)silentpm=false;
	
	gosounds=true;
	if(mute==0 || currentsong>0 || silentm)gosounds=false;
	
	fr=getFrameRate();
	sitebackground();
	
	 domusic();
	
	   if(!normmenu && !normprev) fade=1;
   else if(!normprev)fade=trans;
   else if (!normmenu)fade=(1-trans);
   else fade=0;
   
   
 	cursor(ARROW);
 	var k=5;
	k=menus[0].domenu();
   if( k>0){
    ok2click=clickwait;
   	if(k==1){
   		trans=1;
   		if(gosounds||(mute==1 )){
   			//swells.stop();
			wind.play();
			wind.setVolume(wvol);
   		}
   	}
   	
   	
  
   }

	
	

 
   var drewleaves=false;
	if(!normmenu || !normprev){
		frontleaves()	
		drewleaves=true;
	}
	
	     
	
   fill(0,180*fade);
   rect(0,0,w,h);
   // trans.setit();
  //  var oldm=menu;
  	fill(155);
    if(trans>0){
    	 
	
    	trans=trans-.008*(5-9*abs(trans-.5))*30/fr;
    	//pushMatrix();
    	translate((trans-1)*w,0);
    	
    	if(justremoved==true)justremoved=false;
    	if(prevmenu>6&&(trans<.1||menu==22) && (!normprev ||prevmenu==23)) menus[prevmenu].close();
    	else menus[prevmenu].domenu();
    	
    	 

	
    	
    	translate(w,0);
    	menus[menu].domenu();
    	if(trans<=.005)trans=0;
    	translate(-trans*w,0);
    	//popMatrix();
    }else{
    	k=menus[menu].domenu();
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
    }
    
    
  
	
    	
    if(mouseIsPressed==false && touchIsDown==false && ok2click>0)ok2click--;
   // if(oldm!=menu)trans.doit();
    if(!drewleaves)frontleaves()

  touchGood=false

}


function domusic(){
	var hush=.8;
	
	
	//silentm=false;
	//silentpm=false;
	//if(menu>6 && menu!=22 && menu!=23 && menu!=33 && menu!=34 && menu!=35)silentm=true;
	//if(prevmenu>6 && prevmenu!=22 && prevmenu!=23 && prevmenu!=33 && prevmenu!=34 && prevmenu!=35)silentpm=true;
	
	if(musicplaying==false){
			currentsong=0;
			music[currentsong].loop();
			musicplaying=true;
	}
		
	if(menu!=4 && currentsong!=0){
		music[currentsong].stop();
		currentsong=0;
		music[currentsong].loop();
	}
	
	if(currentsong!=0)music[currentsong].setVolume(5);
	else if(silentm)music[currentsong].setVolume(trans*mute*hush);
//	else if(silentpm&&trans==0)music[currentsong].setVolume(trans*mute*hush);
	else if(silentpm&&trans>0)music[currentsong].setVolume((1-trans)*mute*hush);
	else music[currentsong].setVolume(mute*hush);
	

}




//var thelink;

	
//function butt(){
//	window.open(thelink,"_hrf")
//}
	
	
//////////////////BUTTON/////////////////////

function Button(inter,i,xx,yy,wii,hii,soundt,picc){
	this.pic=loadImage(basepath+picc+pngs);
	this.picname=picc;
	this.internal=inter;
	this.link=i;
	this.ourmenu=i;
	this.sound=soundt;
	this.x=xx;
	this.y=yy;
	this.wi=wii;
	this.hi=hii;
	this.picis=picc;
	this.swell=1;
	this.issoundok=true;
	this.dsoundok=true;
	

	this.transs=0;
	this.t=1;
	this.pm=1;
	this.mm=1;
	this.kool=0;
	this.linkup=false;
	
	
	this.mouseover = function(){
		
		//if(touchX==lasttouchX && touchY==lasttouchY && omobile){
		//	 return false;
		//}
		
		if(abs(this.x-mouseX/w)<this.wi/2*this.mm/w*sm&&abs(this.y-mouseY/h)<this.hi/2*this.mm/h*sm) return true;
		else if(abs(this.x-touchX/w)<this.wi/2*this.mm/w*sm&&abs(this.y-touchY/h)<this.hi/2*this.mm/h*sm) return true;

		else return false;
	};
	
	this.click = function(){
		if(touchX){
			lasttouchX=touchX;
			lasttouchY=touchY;
		}
		//mobilebad=200
		if(this.sound) this.dosound();
		else{
			if(this.internal){
				
					mouseIsPressed=false;
					touchIsDown=false;
					if(!(this.ourmenu==22 && menu==22)){
						prevmenu=menu;
						menu=this.ourmenu;
					}

				
			}
		
		}
		return 0;
	};
	
	this.updateanddraw = function(){
		this.mm=min(h,w);
		this.transs=0;
		//this.transs=0;
		if(isMobileDevice()&&!this.internal){
			if(trans==0&&menu!=23&menu!=24&&menu!=25){
				if(!this.linkup || justremoved){
						if(this.picname=="stardrawer"||this.picname =="recsong")this.kool= createA(this.link,"<img src='blank.png' width='"+this.wi*w*1.3+"' height='"+this.hi*h*1.3+"'>");
						else this.kool= createA(this.link,"<img src='blank.png' width='"+this.wi*w*1.3+"' height='"+this.hi*h*1.3+"'>","_"+this.link);
						this.kool.position(this.x*w-this.wi*w/2,this.y*h-this.hi*h/2);
						this.linkup=true;
				}
			}else{
				if(this.linkup){
					this.linkup=false;
					this.kool.remove();
				}
			}
		}else {
		if(trans==0){
			if(this.mouseover()==true){

				if((!this.linkup || justremoved)&& !this.internal){
						if(this.picname=="stardrawer" ||this.picname =="recsong")this.kool= createA(this.link,"<img src='blank.png' width='"+this.wi*w*1.3+"' height='"+this.hi*h*1.3+"'>");
						else this.kool= createA(this.link,"<img src='blank.png' width='"+this.wi*w*1.3+"' height='"+this.hi*h*1.3+"'>","_"+this.link);
						this.kool.position(this.x*w-this.wi*w/2*1.3,this.y*h-this.hi*h*1.3/2);
						this.linkup=true;
				}
					if(!isMobileDevice()){
					cursor(HAND);
					if(this.swell<1.3){
					
						if(this.swell<=1 && gosounds==true){
					
							swells.stop();
						
							swells.play();
							swells.setVolume(evol);
						
						}
						this.swell+=.045*30/fr;
						this.swell=min(this.swell,1.3);
						}
				}
				

				if((mouseIsPressed && ok2click==0) || touchGood ){
					
					
					if( this.internal==true && this.sound == false && !(this.ourmenu==22 && menu==22)){
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
				if(!this.internal &&this.linkup){
					this.linkup=false;
					this.kool.remove();
				}
				if(this.swell>1){
					if(this.swell>=1.3 && gosounds){
						shrink.stop();
						
						shrink.play();
						shrink.setVolume(evol);
					}
					this.swell-=.045*30/fr;
					this.swell=max(1,this.swell);
				}
			}
		
		}else{
		 if(this.swell>1){
		  this.swell-=.045*30/fr;
		  this.swell=max(1,this.swell);
		  }
			if(!this.internal &&this.linkup){
					this.linkup=false;
					this.kool.remove();
				}
		 }	
		
		
		}
		image(this.pic,this.x*w,this.y*h,this.wi*this.mm*this.swell,this.hi*this.mm*this.swell);
		//if(this.sound==1 && currentsong==this.ourmenu && this.ourmenu!=0)image(mute2,this.x*w,this.y*h,this.wi*this.mm*this.swell,this.hi*this.mm*this.swell);
		//else if(this.sound==1)image(mute3,this.x*w,this.y*h,this.wi*this.mm*this.swell,this.hi*this.mm*this.swell);
		//if(this.sound==1)
		if(this.ourmenu==0 && mute==1)image(mute2,this.x*w,this.y*h,this.wi*this.mm*this.swell,this.hi*this.mm*this.swell);
		else if(this.sound==1)image(mute3,this.x*w,this.y*h,this.wi*this.mm*this.swell,this.hi*this.mm*this.swell);
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



function touchStarted(){
	touchGood=true
}

function Disptext(ss,xx,yy,si){
	this.x=xx;
	this.y=yy;
	this.size=si;
	this.t=ss;
	
	this.updateanddraw = function(){
		textAlign(CENTER);
		textFont("Times",this.size*(w*.1));
		text(this.t,this.x*w,this.y*h);
		return 0;
	};

}


function Vid(youtubes,ss,mmm){
	this.t=ss;
	this.running=false;
	this.div;
	this.div2;
	this.ourmenu=mmm;
	
	this.youtube=youtubes;	
	
	
	this.updateanddraw = function(){
		
		if(this.youtube==5){
			toidtuesday()
			return
		}
		if(this.running==false&&this.ourmenu>6){
		
			//ANDROID BUG IS HERE:
			
			if(this.youtube==1) this.div = createDiv("<iframe  src='https://www.youtube.com/embed/"+this.t+"' frameborder='0' allowfullscreen width=\""+w+"\" height=\""+h+"\" ></iframe>");
  			else if(this.youtube>1) this.div= createDiv("<iframe src='"+this.t+"' frameborder='0'></iframe>");
  			else this.div=createDiv("<iframe src=https://bandcamp.com/EmbeddedPlayer/album="+this.t+"/size=large/bgcol=333333/linkcol=0687f5/tracklist=true/artwork=small/transparent=true/' seamless></iframe>");
  			this.running=true;

  			
  		}
  		if(this.running==true){
			if(this.youtube==0)this.div2=createDiv("<style> iframe{ width: "+min(w*.7,700)+"px; height: "+(h*.5)+"px; } </style>");
  			else if(this.youtube==3) this.div2=createDiv("<style> iframe{ width: "+(w*.95)+"px; height: "+(h*.6)+"px; } </style>");
    		else if(this.youtube==4) this.div2=createDiv("<style> iframe{ width: "+(w*.9)+"px; height: "+(h)+"px; } </style>");
  			else this.div2=createDiv("<style> iframe{ width: "+(w*.7)+"px; height: "+(h*.5)+"px; } </style>");
  			
  			
  			if(this.youtube==4){
  				if(menu==this.ourmenu)
  					this.div.position((.05+trans)*w,0);
  				else
  					this.div.position((.05+(trans-1))*w,0);
  			
  			}else if(this.youtube==3){
  				if(menu==this.ourmenu)
  					this.div.position((.025+trans)*w,.2*h);
  				else
  					this.div.position((.025+(trans-1))*w,.2*h);
  			}else{
  				if(menu==this.ourmenu)
  					this.div.position((.15+trans)*w,.2*h);
  				else
  					this.div.position((.15+(trans-1))*w,.2*h);
  			}
  		}
	
	};
	
	this.close = function(){
		if(this.running==true){
			this.running=false;
			this.div.remove();
			this.div2.remove();
			 removeElements();
			 justremoved=true;
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

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


function populatemenus(){
	for(var i=0;i<50;i++) menus[i]=new Menu();
	
	//main menu
	menus[1].add(new Disptext("harry rubin-falcone: music and animation",.5,.35,.4));
	//menus[1].add(new Disptext("",.5,.65,.2));
	//menus[1].add(new Disptext("a mother and daughter discuss life on a terrace overlooking the city.",.5,.65,.2));
	//menus[1].add(new Disptext("a moving painting with fractal and hand drawn art, coming 2018",.5,.7,.2));
	menus[1].add(new Disptext("most recent:",.5,.5,.3));
	
	menus[1].add(new Button(true,32,.4,.62,.2,.2,false,"montauk"));
	//menus[1].add(new Button(true,39,.5,.62,.2,.2,false,"pimba"));
	//menus[1].add(new Button(true,40,.5,.62,.2,.2,false,"hoodoos"));
	//menus[1].add(new Button(true,41,.7,.62,.2,.2,false,"hrfep"));
	menus[1].add(new Button(true,44,.6,.62,.2,.2,false,"sugar"));

	menus[32].add(new Vid(1,monurl,32));
	menus[39].add(new Vid(1,pimurl,39));
	menus[40].add(new Vid(1,hoourl,40));
	menus[41].add(new Vid(0,hrfurl,41));
	menus[42].add(new Vid(0,hrfurl,42));
	menus[43].add(new Vid(1,"WEh_utcEjYU",43));
	menus[44].add(new Vid(1,"WEh_utcEjYU",44));
	
	menus[32].add(new Button(true,1,.5,.75,.1,.1,false,"back"));
	menus[39].add(new Button(true,1,.5,.75,.1,.1,false,"back"));
	menus[40].add(new Button(true,1,.5,.75,.1,.1,false,"back"));
	menus[41].add(new Button(true,1,.5,.75,.1,.1,false,"back"));
	menus[44].add(new Button(true,1,.5,.75,.1,.1,false,"back"));
	
	

	
	var mms=.18
	var mmy=.11
	//full time menu
	menus[0].add(new Button(true,1,.125,mmy,mms,mms,false,"home"));
	menus[0].add(new Button(true,2,.375,mmy,mms,mms,false,"animation"));
	menus[0].add(new Button(true,3,.625,mmy,mms,mms,false,"interactive"));
	menus[0].add(new Button(true,4,.875,mmy,mms,mms,false,"music"));
	menus[0].add(new Button(true,38,.75,.92,.12,.12,false,"more"));
	menus[0].add(new Button(true,5,.25,.92,.12,.12,false,"contact"));
	menus[0].add(new Button(true,0,.5,.92,.12,.12,true,"mute"));
	
	
	var nsize=.2;
	menus[38].add(new Button(false,"https://www.youtube.com/channel/UCedqcMJnznhrbnWOLWwdUbA",.625,.4,nsize,nsize,false,"youtube"));
	menus[38].add(new Button(false,"https://harryrubin-falcone.bandcamp.com/",.375,.4,nsize,nsize,false,"bandcamp"));
	menus[38].add(new Button(true,6,.3,.65,nsize,nsize,false,"festivals"));
	menus[38].add(new Button(false,"https://www.ncbi.nlm.nih.gov/pubmed/?term=rubin-falcone",.7,.65,nsize,nsize,false,"science"));
	menus[38].add(new Button(true,22,.5,.65,nsize,nsize,false,"mathart"));
	
	var asize=.18;
	var asizeb=.12;
	//animation
//	menus[2].add(new Button(true,7,.1,.3,asize,asize,false,"ndop"));
//	menus[2].add(new Button(true,8,.275,.3,asize,asize,false,"ld"));
//	menus[2].add(new Button(true,9,.45,.3,asize,asize,false,"rdort"));

	
		//menus[2].add(new Button(true,22,.9,.5,asize,asize,false,"leaf1"));
	menus[33].add(new Button(true,31,.2,.4,asize*1.8,asize*1.8,false,"hawk1"));
	menus[33].add(new Button(true,49,.5,.4,asize*1.8,asize*1.8,false,"mon"));
	menus[33].add(new Button(true,10,.8,.4,asize*1.8,asize*1.8,false,"three"));
	menus[33].add(new Button(true,14,.15,.68,asize,asize,false,"kite"));
	menus[33].add(new Button(true,15,.27,.68,asize,asize,false,"ship"));
	
	menus[33].add(new Button(true,16,.7,.68,asizeb,asizeb,false,"cows"));
	menus[33].add(new Button(true,17,.8,.68,asizeb,asizeb,false,"train"));
	menus[33].add(new Button(true,18,.9,.68,asizeb,asizeb,false,"hello"));
	menus[33].add(new Button(true,47,.6,.68,asizeb,asizeb,false,"dog"))
	
	menus[34].add(new Button(true,11,.5,.35,asize*1.5,asize*1.5,false,"ep1"));
	menus[34].add(new Button(true,12,.25,.55,asize*1.5,asize*1.5,false,"ep2"));
	menus[34].add(new Button(true,13,.74,.55,asize*1.5,asize*1.5,false,"ep3"));


	menus[35].add(new Button(true,43,.75,.5,asize*1.5,asize*1.5,false,"sugar"));
	menus[35].add(new Button(true,36,.25,.5,asize*1.5,asize*1.5,false,"hoodoos"));
	menus[35].add(new Button(true,37,.5,.5,asize*1.5,asize*1.5,false,"pimba"));
	
	menus[33].add(new Button(true,2,.5,.75,.1,.1,false,"back"));
	menus[34].add(new Button(true,2,.5,.75,.1,.1,false,"back"));
	menus[35].add(new Button(true,2,.5,.75,.1,.1,false,"back"));
	
	
	menus[2].add(new Button(true,33,.5,.4,asize*2,asize*2,false,"shorts"));
	menus[2].add(new Button(true,35,.25,.65,asize*1.5,asize*1.5,false,"collabs"));
	menus[2].add(new Button(true,34,.75,.65,asize*1,asize*1,false,"mms"));

	//interactive 
	menus[3].add(new Button(true,27,.75,.6,.3,.3,false,"schlub"));
	menus[3].add(new Button(true,23,.25,.6,.3,.3,false,"staycation"));
	if(isMobileDevice()||true)		menus[3].add(new Button(false,"star_drawer/indexm.html",.5,.4,.3,.3,false,"stardrawer"));
	else 		menus[3].add(new Button(true,24,.5,.4,.3,.3,false,"stardrawer"));
	menus[3].add(new Button(true,48,.5,.8,.05,.05,false,"tt_b"));
	//http://hrfart.github.io/
	
	
	
	//schlub
	menus[27].add(new Vid(1,"XY8F_tS6JKU",27));
	menus[27].add(new Button(false,"http://hrfart.github.io/SomeSchlubScalesCity.zip",.35,.75,.125,.125,false,"schlubdownload"));
	menus[27].add(new Button(false,"https://harryrubin-falcone.bandcamp.com/album/some-schlub-scales-sad-city",.65,.75,.125,.125,false,"schlubtrack"));
	menus[27].add(new Button(true,3,.5,.75,.1,.1,false,"back"));
	
	
	
	
	//music
	//menus[4].add(new Disptext("harry rubin-falcone is a new york city-based upright and electric bass player, primarily interested",.5,.27,.18));
	//menus[4].add(new Disptext("in jazz, funk, fusion, classical and new music. he also plays guitar, sings, and composes. ",.5,.31,.18));
	menus[4].add(new Disptext("soundtrack",.1,.66,.2));
	menus[4].add(new Disptext("compositions",.1,.7,.2));
//	menus[4].add(new Disptext("jazz",.2,.55,.2));
//	menus[4].add(new Disptext("math \"music\"",.1,.72,.2)


	var mussize=.15
	menus[4].add(new Button(true,30,.25,.68,mussize,mussize,false,"hawk2"));
	menus[4].add(new Button(true,20,.65,.68,mussize,mussize,false,"dancersst"));
	menus[4].add(new Button(true,19,.45,.68,mussize,mussize,false,"mmsst"));
	menus[4].add(new Button(true,21,.85,.68,mussize,mussize,false,"schlubst"));
	

	//menus[4].add(new Button(true,1,.4,.55,mussize,mussize,true,"tric"));
	//menus[4].add(new Button(true,2,.6,.55,mussize,mussize,true,"aut"));
	//menus[4].add(new Button(true,3,.8,.55,mussize,mussize,true,"mys"));
	
	menus[4].add(new Button(true,26,.35,.4,mussize,mussize,false,"tric"));
	menus[4].add(new Button(true,42,.55,.4,mussize,mussize,false,"hrfep"));

	menus[4].add(new Button(false,"recursive_songm.html",.75,.4,mussize,mussize,false,"recsong"));
	menus[4].add(new Button(false,"https://open.spotify.com/album/36DTTcJgcMrD7gNuCff03P",.95,.68,mussize*.7,mussize*.7,false,"tbc"));
	
	//contact
	menus[5].add(new Disptext("harry rubin-falcone: animation, bass, composition",.5,.35,.2));
	menus[5].add(new Button(false,"mailto:harryrubinfalcone@gmail.com",.5,.6,.25,.25,false,"contact2"));
	
	
	var fl2y=.72;
	
	//festivals
	var hfs=.15;
		menus[6].add(new Disptext("my mother and the hawk",.5,.25,.3));
	menus[6].add(new Button(false,"https://www.facebook.com/FestivalCortometrajesRadioCity/photos/pcb.1894092230625175/1894072910627107/?type=3&theater",.16667,.35,hfs,hfs,false,"radio"));
	//menus[6].add(new Button(false,"http://altff.org/onewebmedia/Winners%20AltFF%20Spring%202018%20.pdf",.3333,.35,hfs,hfs,false,"altff"));
	menus[6].add(new Button(false,"http://www.werthergermondari.com/oga/connessioni-interpersonali-/harry-rubin-falcone-my.html",.5,.35,hfs,hfs,false,"oga"));
	//menus[6].add(new Button(false,"http://ibestff.com/official-selection-2018/",.6666667,.35,hfs,hfs,false,"ibestff"));
	menus[6].add(new Button(false,"https://strasburgfilmfestival.eventive.org/films/5b5a653380886400145c2c85",.83333,.35,hfs,hfs,false,"shen"));
				menus[6].add(new Button(false,"http://kinomarshrut.wixsite.com/fest/umovi-uchasti",.58,.5,hfs,hfs,false,"cinemaway"));
				menus[6].add(new Button(false,"https://indd.adobe.com/view/b41e2b0a-1558-4299-a21e-1223c373542f",.75,.5,hfs,hfs,false,"odd"));
				menus[6].add(new Button(false,"http://festival.tiszamozi.hu/Documents/2018/VetitesiRend2018.pdf",.25,.5,hfs,hfs,false,"tiaf"));
				menus[6].add(new Button(false,chi2,.42,.5,hfs,hfs,false,"chi2"));
				menus[6].add(new Button(false,"https://www.facebook.com/orvietocinemafest/photos/a.181100475954382/291980524866376/?type=3&theater",.6666667,.35,hfs,hfs,false,"orv"));
				menus[6].add(new Button(false,"https://www.facebook.com/440651659706973/photos/a.639064316532372/639064813198989/?type=3&theater",.3333,.35,hfs,hfs,false,"yorca"));

	
	menus[6].add(new Disptext("three dancers",.14,fl2y-.1,.2));
	var dansi=.19;
	var fly2=.16;
	menus[6].add(new Button(false,"http://site2016.airport-anifes.jp/en/nominate_item/three_dancers/",.08,.72,dansi,fly2,false,"chiose"));
	menus[6].add(new Button(false,"http://www.festivalcinemadarte.com/film-eng",.2,.72,dansi,fly2,false,"darte"));
	//menus[6].add(new Button(false,"http://largofilmawards.com/november-2016/",.32,.72,.1,fly2,false,"largo"));
	//menus[6].add(new Button(false,"https://sites.google.com/view/hope-film-awards/home",.42,.72,.1,fly2,false,"hope"));


	//menus[6].add(new Disptext("me and the machine ",.6,fl2y-.1,.2));
	//menus[6].add(new Disptext("in space",.6,fl2y-.07,.2));

	//menus[6].add(new Button(false,"http://www.eafit.edu.co/fismed/",.6,fl2y+.03,.15,.13,false,"fismed"));
	
	//menus[6].add(new Disptext("the ship we built",.77,fl2y-.07,.2));
	//menus[6].add(new Button(false,"http://www.locomocionfest.com/festival/",.77,fl2y,.15,.13,false,"loco"));

	menus[6].add(new Disptext("math art",.9,fl2y-.07,.2));
	menus[6].add(new Button(false,"http://gallery.bridgesmathart.org/exhibitions/2013-joint-mathematics-meetings/hrubinfa",.9,fl2y+.01,.15,.15,false,"bridges"));

	
	
	
	//videos
	//menus[7].add(new Vid(1,"oBvd2DjFr60",7));
	//menus[8].add(new Vid(1,"1Mih9U_q-lY",8));
	//menus[9].add(new Vid(1,"xE3bz0Vx6dc",9));
	menus[10].add(new Vid(1,"C-Bp3IprUw4",10));
	
	
	menus[11].add(new Vid(1,"pAygnhump5s",11));
	menus[12].add(new Vid(1,"qBegtnZOXCg",12));
	menus[13].add(new Vid(1,"LYrup9h3goo",13));
	
	menus[14].add(new Vid(1,"TnrMlbZKZLQ",14));
	menus[15].add(new Vid(1,"0cEVwoQqgG4",15));
	menus[36].add(new Vid(1,hoourl,36));
	menus[37].add(new Vid(1,pimurl,37));
	menus[16].add(new Vid(1,"qXU2-0r18Sg",16));
	menus[17].add(new Vid(1,"AEZ6qmHFGYk",17));
	menus[18].add(new Vid(1,"nHd89kA6Utc",18));
	menus[47].add(new Vid(1,"ZMsiPa66dsE",47));
	
	
	//back button for machine
	menus[11].add(new Button(true,34,.5,.75,.1,.1,false,"back"));
	menus[12].add(new Button(true,34,.5,.75,.1,.1,false,"back"));
	menus[13].add(new Button(true,34,.5,.75,.1,.1,false,"back"));
	
	//back button for music videos
	menus[43].add(new Button(true,35,.5,.75,.1,.1,false,"back"));
	menus[36].add(new Button(true,35,.5,.75,.1,.1,false,"back"));
	menus[37].add(new Button(true,35,.5,.75,.1,.1,false,"back"));
		
	//back buttons for shorts
	menus[15].add(new Button(true,33,.5,.75,.1,.1,false,"back"));
	menus[10].add(new Button(true,33,.5,.75,.1,.1,false,"back"));
	menus[14].add(new Button(true,33,.5,.75,.1,.1,false,"back"));
	menus[16].add(new Button(true,33,.5,.75,.1,.1,false,"back"));
	menus[17].add(new Button(true,33,.5,.75,.1,.1,false,"back"));
	menus[18].add(new Button(true,33,.5,.75,.1,.1,false,"back"));
	menus[47].add(new Button(true,33,.5,.75,.1,.1,false,"back"));
	
	menus[31].add(new Vid(1,hawkfull,31));
	menus[49].add(new Vid(1,monurl,31));
	
	//albums
	menus[19].add(new Vid(0,"1696192640",19));
	menus[20].add(new Vid(0,"387913001",20));
	menus[21].add(new Vid(0,"3372271177",21));
	menus[26].add(new Vid(0,"2524251407",26));
	menus[30].add(new Vid(0,"1426352574",30));

	menus[22].add(new Vid(3,"http://hrfart.github.io/home.html",22));
	menus[23].add(new Vid(4,"http://hrfart.github.io/app",23));
	menus[24].add(new Vid(4,"http://hrfart.github.io/star_drawer",24));
	menus[21].add(new Vid(0,"3372271177",21));
	
	//menus[23].add(new Button(false,"http://hrfart.github.io/app/index.html",.97,.35,.1,.1,false,"newtab"));
	//menus[24].add(new Button(false,"http://hrfart.github.io/star_drawer/index.html",.97,.35,.1,.1,false,"newtab"));
	menus[23].add(new Button(true,3,.97,.65,.1,.1,false,"back2"));
	menus[24].add(new Button(true,3,.97,.65,.1,.1,false,"back2"));
	
	//menus[23].add(new Button(true,3,.97,.35,.1,.1,false,"newtab"));
	menus[25].add(new Vid(4,"recursive_song.html",25));
	menus[25].add(new Button(true,4,.97,.65,.1,.1,false,"back2"));
	
	//menus[22].add(new Vid(false,"1696192640"));
	//add back buttons
	//for(var i=7;i<19;i++)menus[i].add(new Button(true,2,.5,.75,.1,.1,false,"back"));
	for(var i=19;i<22;i++)menus[i].add(new Button(true,4,.5,.75,.1,.1,false,"back"));
	
	menus[26].add(new Button(true,4,.5,.75,.1,.1,false,"back"));
	menus[42].add(new Button(true,4,.5,.75,.1,.1,false,"back"));
	menus[30].add(new Button(true,4,.5,.75,.1,.1,false,"back"));
	menus[31].add(new Button(true,33,.5,.75,.1,.1,false,"back"));
	menus[49].add(new Button(true,33,.5,.75,.1,.1,false,"back"));
	
	
	//toid tuesday
	menus[48].add(new Vid(5,"",48))
	menus[48].add(new Button(true,3,.5,.8,.1,.1,false,"back"));
	
	//menus[25].add(new Button(true,4,.5,.75,.1,.1,false,"back"));
	//menus[22].add(new Button(true,2,.5,.8,.2,.1,false,"back"));
	
}






//leaves



var framesbetweenleaves=80;
var likelyhoodofleaf=.05;
var leafgentime=0;
var wleaves=[];


function frontleaves(){
  

  
    if(leafgentime>0)leafgentime-=30/fr+25*(.5-abs(.5-trans));
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
   this.x-=3*(this.speed+random(this.speed*2))*30/fr+.05*(.5-abs(.5-trans));;  
     //this.y+=3*(this.speed*4.5-random(this.speed*8))*1.2;
     this.yv+=random(this.speed)*this.ya*.5*30/fr;
     if(abs(this.yv)>.005){
     	this.ya=-this.ya;
     	this.yv=.0049*this.yv/abs(this.yv);
     }
     this.y+=this.yv*30/fr+.001;
     this.angle+=.5*(this.speed/15.0+random(this.speed)/10.0+.1)*30/fr;
     
   
     
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



function gmouseover(x,y,wi,hi){
		mm=1
		if(touchX==lasttouchX && touchY==lasttouchY && omobile){
			 return false;
		}
		
		if(abs(x-mouseX/w)<wi/2*mm/w*sm&&abs(y-mouseY/h)<hi/2*mm/h*sm) return true;
		else if(abs(x-touchX/w)<wi/2*mm/w*sm&&abs(y-touchY/h)<hi/2*mm/h*sm) return true;

		else return false;
	};
	

var handpos=-.3
var handdir=1
var altoidtaken=false
var toidsound

var toidtimer=0
	
//////toid tuesday
function toidtuesday(){

	 var jsdate = new Date();
 	var dayOfWeek = jsdate.getDay();
	if(dayOfWeek==2){
		if(handdir==1){
			if(handpos<1){
		    	handpos=min(handpos+.01*30/fr,1.01)
			}else{
			 if(altoidtaken==false){
			 if(gmouseover(.5,.5,.04*w,.06*h)){
			   cursor(HAND);
			   if(mouseIsPressed||touchIsDown){
			   	altoidtaken=true
			   	minty.setVolume(1);
			   	minty.play()
			   	minty.setVolume(1);
			   }
			 }
			 }
			}
			if(altoidtaken){
				image(openhandnt,.5*w,-.5*h+.8*h*handpos,h/3*handpos,h*handpos)
				toidtimer=toidtimer+1*30/fr
				if(toidtimer>70){
					handdir=-1
				}
			}else{
				image(openhand,.5*w,-.5*h+.8*h*handpos,h/3*handpos,h*handpos)
				if(handpos>=1)for(var i=0;i<numtoidstars;i++)toidstars[i].updatedraw();
			}
				
			}else{
				image(closedhand,.5*w,-.5*h+.8*h*handpos,h/3*handpos,h*handpos)
				if(handpos>0){
		    	handpos=handpos-.01*30/fr
		    	}
			}
			image(tthappy,w*.5,.25*h,w*.8,.8/3.0*h)
	}else{
		image(ttnot,.5*w,.5*h,.4*h,.4*h)
	}
	
}


//////////////////////BACKGROUND//////////////////////
function sitebackground(){
	background(0); 

 	if(!(menu==22&&trans==0))for(var i=0;i<numstars;i++)stars[i].updatedraw();
 	
 }
 
 

//stars
var srin=4;
function Star(){

	this.x=random(1.2); 
    this.y=random(1); 
    this.s=.002+random(.002);
    this.p=random(TWO_PI);
    this.os=(.6+random(1.2));
    this.b=150+random(55); 

    this.updatedraw = function(){
    //text(""+srin,w/2,h/2);
   // 	fill(255,0);
	
    noStroke();
    var ww=max(w,h*1280/720);

    if(fr<2){
    	fr=2
    }
	this.p = (this.p+this.os*1.2/fr)%TWO_PI;
    this.x-=this.s*.3*30/fr+.075*(.5-abs(.5-trans));
   // fill(255,255);
    //text(twop,w/2,h/2);
   // if(twop=="NaN")
	 //   text(twop,w*.6,h/2);

    if(this.x<0)this.x+=1.2;
    for(var j=srin;j>0;j--){
      fill(250,max(0,min(255,.6*(srin-j)/srin*this.b*(.2+.8*pow(sin(this.p),2)))));
    if(menu!=22||trans>0)  
  ellipse((this.x-.1)*w,this.y*h,this.s*ww*j/srin*2,this.s*ww*j/srin*2); 
    }
   // text(""+twop,w/2,h/2);
  //  return 0;
    };
    

}






function toidStar(){

	this.x=.477+random(.04); 
    this.y=.484+random(.04); 
    this.s=.002+random(.002);
    this.p=random(TWO_PI);
    this.os=(.6+random(1.2));
    this.b=150+random(55); 

    this.updatedraw = function(){
    //text(""+srin,w/2,h/2);
   // 	fill(255,0);
	
    noStroke();
    var ww=max(w,h*1280/720);
    var twop=30;
    for(var k=30;k>=1;k--)
    	if(fr<k)
    		twop=k;
    twop=1/twop;
	this.p = (this.p+this.os*1.2*twop)%TWO_PI;
    //this.x-=this.s*.3*twop*30+.075*(.5-abs(.5-trans));
   // fill(255,255);
    //text(twop,w/2,h/2);
   // if(twop=="NaN")
	 //   text(twop,w*.6,h/2);

    //if(this.x<0)this.x+=1.2;
    for(var j=srin;j>0;j--){
      fill(250,1.25*max(0,min(255,.6*(srin-j)/srin*this.b*(.2+.8*pow(sin(this.p),2)))));
    if(menu!=22||trans>0)  
  ellipse((this.x)*w,this.y*h,this.s*ww*j/srin*2,this.s*ww*j/srin*2); 
    }
   // text(""+twop,w/2,h/2);
  //  return 0;
    };
    

}