
var W;
var H;
function setup(){
  W=windowWidth;
  H=windowHeight;
  createCanvas(W,H);
  var Ball=function(x,y,rad,ang){
    this.cx=x;
    this.cy=y;
    this.x=this.rad*cos(this.ang)+this.cx;
    this.y=this.rad*sin(this.ang)+this.cy;
    this.rad=rad;
    this.ang=ang;
    this.update=function(){
      ellipse(this.x,this.y,20,20);
    }
    this.setpos=function(newa){
      this.x=this.rad*cos(newa)+this.cx;
      this.y=this.rad*sin(newa)+this.cy;
      this.ang=newa;
    }

  }
  circleC=function(x,y,radius,count,speed){
    this.arr=[]
    this.speed=speed
    this.radius=radius;
    this.x=x;
    this.y=y;
    this.count=count;
    for(var i=0;i<this.count;i++){
      var rad=i*2*PI/this.count
      this.arr.push(new Ball(this.x,this.y,this.radius,rad));
    }
    this.next=function(){
      for(var i=0;i<this.count;i++){
        this.arr[i].setpos(this.arr[i].ang+speed)
        this.arr[i].update()
      }
    }


  }
  var vals=[2,3,6,12,24,48,72,144,89,144,233]
  for(var i=0;i<8;i++){
    c.push(new circleC(W/2,H/2,65*i,vals[i],PI*vals[8-i]/(600*i)));
  }


}

var c=[];
var circleC;
function draw(){
  background(0);
  for(var i=0;i<8;i++){
    c[i].next()
  }

}
$( function() {
  $("#double-helix").button();
  $("#heat").button();
  $("#tree").button();
});


