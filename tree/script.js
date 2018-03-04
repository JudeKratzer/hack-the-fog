var t;
$(function() {
  $("#build-tree").button();
  $("#build-tree").click( function() {
    background(255);
    for(var i=0;i<20;i++){
      t.tree(10,200,PI/7);
    }
  })
  $("#binary-tree").button();
  $("#binary-tree").click( function() {
    background(255);
      t.tree(11,200,PI/7);
    
  })
});

var tree;
var W;
var H;

function setup(){
  W=windowWidth;
  H=windowHeight;
  createCanvas(W,H);
  treeMaker=function(x,y,rad){
    this.x=x;
    this.y=y;
    this.rad=rad;
    this.weight=0;
    this.mforward =function(f){
      strokeWeight(this.weight)
      newx=this.x+f*cos(this.rad);
      newy=this.y+f*sin(this.rad);
      line(this.x,this.y,newx,newy);
      this.x=newx;
      this.y=newy;
    }
    this.mbackward=function(b){
      newx=this.x+b*cos(this.rad+PI);
      newy=this.y+b*sin(this.rad+PI);
      line(this.x,this.y,newx,newy);
      this.x=newx;
      this.y=newy;
    }
    this.width=function(neww){
      this.weight=neww;
    }
    this.update =function(){
      ellipse(this.x,this.y,5,5);
    }

    this.tright=function(Th){this.rad-=Th};this.tleft=function(Th){this.rad+=Th};
    this.posX=function(){return this.x};this.posY=function(){return this.y};

    this.tree=function(levels,length,angle,Master=1){
      p=Master/(levels);
      this.width(2*levels*levels/9);
      var b=color(100,70,54);
      var g=color(0,100,0);
      var c=lerpColor(g,b,Master);
      stroke(c);
      if (levels == 1){
         this.mforward(length)
         this.mbackward(length)
      }
      else{
         this.mforward(length);
         this.tleft(angle);
         stroke(c)
         this.tree(levels-1,random(.5,.8)*length,random(.9999,1.0001)*angle,p*(levels-1))
         this.tright(2*angle)
         stroke(c)
         this.tree(levels-1,random(.5,.8)*length,random(.95,1.05)*angle,p*(levels-1))
         stroke(c)
         this.tleft(angle)
         this.mbackward(length)
      }
    }


  }
  t=new treeMaker(W/2,H,PI/2);
  t.tleft(PI);
  t.tree(11,200,PI/7)
}

function draw(){

}