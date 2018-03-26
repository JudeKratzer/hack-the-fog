
function setup(){
  W=windowWidth;
  H=windowHeight;
  createCanvas(W,H*2);
  function setGradient(x, y, w, h, c1, c2, axis) {

    noFill();

    if (axis == 0) {  // Top to bottom gradient
      for (var i = y; i <= y+h; i++) {
        var inter = map(i, y, y+h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x+w, i);
      }
    }
    else if (axis == 11) {  // Left to right gradient
      for (var i = x; i <= x+w; i++) {
        var inter = map(i, x, x+w, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y+h);
      }
    }
  }
  var pair =function(x,y,pos,h,speed){
    this.x=x;
    this.y=y;
    this.h=h;
    this.pos=pos;
    this.speed=PI/speed
    this.next=function(){
      this.pos=((this.pos+this.speed)%(2*PI));
      if(this.pos>=PI/2&&this.pos<=3*PI/2){
        stroke(0);
        fill(255,(cos(this.pos)+1)*128);
        ellipse(this.x,this.y+(sin(this.pos))*h,20,20);
        fill(255,255-((cos(this.pos)+1)*128));
        ellipse(this.x,this.y+(sin(this.pos))*h*-1,20,20);
      }else{
        stroke(0);
        fill(255,255-((cos(this.pos)+1)*128));
        ellipse(this.x,this.y+(sin(this.pos))*h*-1,20,20);
        fill(255,(cos(this.pos)+1)*128);
        ellipse(this.x,this.y+(sin(this.pos))*h,20,20);
      }
      if((sin(this.pos))*h>10 ||(sin(this.pos))*h<-10){

        var top=color(255,(cos(this.pos)+1)*128);
        var bot=color(255,255-(cos(this.pos)+1)*128);
        if(this.pos>=PI){
          setGradient(this.x-1,this.y+(sin(this.pos))*h+15,1,h*-2*(sin(this.pos))-30,top,bot,0);
        }else{
          setGradient(this.x-1,this.y-(sin(this.pos))*h+15,1,h*2*(sin(this.pos))-30,bot,top,0);
        }
      }
    }

  }
  p=[]
  for(var i=0;i<n;i++){
    p.push(new pair(W/2+(i-15)*(W/n),300,i*PI/10,100,50));
  }

}
var n=30;
var p;
var W;
var H;
function draw(){
  background(0);
  for(var i=0;i<30;i++){
    p[i].next()
  }

}
