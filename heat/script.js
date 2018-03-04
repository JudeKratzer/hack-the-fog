var temp = 72;
var W;
var H;
function setup(){
  frameRate(60);
  W=windowWidth;
  H=windowHeight;
  createCanvas(W,H);
  Ball=function(x,y,rad,speed){
    this.x=x;
    this.y=y;
    this.rad=rad;
    this.speed=speed;
    this.directionx=1;
    this.directiony=1;
    this.next=function(){
      newx=this.x+cos(rad)*this.directionx*this.speed
      newy=this.y+sin(rad)*this.directiony*this.speed
      this.x=newx;
      this.y=newy;
      if(this.x>=W||this.x<=0){
        this.directionx*=-1
      }
      if(this.y>=H||this.y<=0){
        this.directiony*=-1
      }
      fill(0);
      ellipse(newx,newy,30,30);
    }
    this.speedchange=function(news){
      this.speed=news;
    }
  }
  for(var i=0;i<W*H/13000;i++){
    var x=new Ball(random(0,W),random(0,H),random(0,2*PI),36);
    bs.push(x)
  }
}


var Ball;
var bs=[];
var bcolor=[255,255-((temp-72)*128/48),255-(2*(temp-72)*128/48)]

function rgbtoHex(red, green, blue) {
  var rgb = blue | (green << 8) | (red << 16);
  return '#' + (0x1000000 + rgb).toString(16).slice(1)
}
var backcolor=rgbtoHex(bcolor[0], bcolor[1], bcolor[2])
function draw(){
  if(temp>=72){
    bcolor=[255,255-((temp-72)*128/48),255-(2*(temp-72)*128/48)]
  }else{
    bcolor=[255-(2*(72-temp)*128/72),255-((72-temp)*128/72),255]
  }
  background(bcolor[0],bcolor[1],bcolor[2]);
  for(var i=0;i<W*H/16000;i++){
    bs[i].speedchange(temp/3);
    bs[i].next();
  }
}

function updateTemp(newTemp) {
  temp = 1.8 * (newTemp - 273) + 32; 
  console.log(temp);
  if(temp>=72){
    bcolor=[255,255-((temp-72)*128/48),255-(2*(temp-72)*128/48)]
  }else{
    bcolor=[255-(2*(72-temp)*128/72),255-((72-temp)*128/72),255]
  }
  var bcol= rgbtoHex(bcolor[0],bcolor[1],bcolor[2]);
  console.log(bcolor)
  $('body').css('background', bcol);
}

$( function() {
  $("#zip-button").button();
  $("#zip-button").click( function() {
    var zip = $("#zip-input").val();
    
    // weather api says "Your account is temporary blocked due to exceeding of requests limitation of your subscription type. " 
    // you might need to create another account and get another key
    
    // temporarily just update temp with value from zip box (remember it's in kelvin)
    //updateTemp(parseInt(zip, 10));
    
    // uncomment this if the key starts working or you get another key
    $.get("https://api.openweathermap.org/data/2.5/weather?q=" + zip + "&appid=1a72577e4d8839d7db17f72c983053b2", function(data) {
      updateTemp(data.main.temp);
    });
  });  
});