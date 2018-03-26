var perScre=30;
var Speed=50;
var heigh=100;
var Scheme=[70,20,255];

$( function() {
  $( "#slider-vertical" ).slider({
    orientation: "vertical",
    range: "min",
    min: 5,
    max: 200,
    value: 97,
    slide: function( event, ui ) {
      heigh = ui.value;
      d=new Dna(Speed,perScre,heigh,Scheme);
    }
  });
  var spinner = $( "#spinner" ).spinner();
  $( "#getvalue" ).button();
  $( "#getvalue" ).on( "click", function() {
    Speed = $("#spinner").spinner( "value" );
    console.log(Speed);
    d=new Dna(Speed,perScre,heigh,Scheme);
  });
  $( function() {
    function hexFromRGB(r, g, b) {
      var hex = [
        r.toString( 16 ),
        g.toString( 16 ),
        b.toString( 16 )
      ];
      $.each( hex, function( nr, val ) {
        if ( val.length === 1 ) {
          hex[ nr ] = "0" + val;
        }
      });
      return hex.join( "" ).toUpperCase();
    }
    function refreshSwatch() {
      var red = $( "#red" ).slider( "value" ),
        green = $( "#green" ).slider( "value" ),
        blue = $( "#blue" ).slider( "value" ),
        hex = hexFromRGB( red, green, blue );
        var Scheme=[red,green,blue];
        d=new Dna(Speed,perScre,heigh,Scheme);
      $( "#swatch" ).css( "background-color", "#" + hex );
    }
 
    $( "#red, #green, #blue" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 127,
      slide: refreshSwatch,
      change: refreshSwatch

    });
    $( "#red" ).slider( "value", 70 );
    $( "#green" ).slider( "value", 20 );
    $( "#blue" ).slider( "value", 255 );
  } );
    $("#slider").slider();
    $("#sumnum-button").button();
    $("#sumnum-button").click( function() {
      var perScre = $("#slider").slider( "value" );
      d=new Dna(Speed,perScre,heigh,Scheme);
    });
     
});

function setup(){
  W=windowWidth;
  H=windowHeight;
  createCanvas(W,H);
  
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
  var pair =function(x,y,pos,h,speed,scheme){
    this.x=x;
    this.y=y;
    this.h=h;
    this.pos=pos;
    this.speed=PI/speed
    this.next=function(){
      this.pos=((this.pos+this.speed)%(2*PI));
      if(this.pos>=PI/2&&this.pos<=3*PI/2){
        stroke(0);
        fill(scheme[0],scheme[1],scheme[2],(cos(this.pos)+1)*128);
        ellipse(this.x,this.y+(sin(this.pos))*h,20,20);
        fill(scheme[0],scheme[1],scheme[2],255-((cos(this.pos)+1)*128));
        ellipse(this.x,this.y+(sin(this.pos))*h*-1,20,20);
      }else{
        stroke(0);
        fill(scheme[0],scheme[1],scheme[2],255-((cos(this.pos)+1)*128));
        ellipse(this.x,this.y+(sin(this.pos))*h*-1,20,20);
        fill(scheme[0],scheme[1],scheme[2],(cos(this.pos)+1)*128);
        ellipse(this.x,this.y+(sin(this.pos))*h,20,20);
      }
      if((sin(this.pos))*h>10 ||(sin(this.pos))*h<-10){

        var top=color(scheme[0],scheme[1],scheme[2],(cos(this.pos)+1)*128);
        var bot=color(scheme[0],scheme[1],scheme[2],255-(cos(this.pos)+1)*128);
        if(this.pos>=PI){
          setGradient(this.x-1,this.y+(sin(this.pos))*h+15,1,h*-2*(sin(this.pos))-30,top,bot,0);
        }else{
          setGradient(this.x-1,this.y-(sin(this.pos))*h+15,1,h*2*(sin(this.pos))-30,bot,top,0);
        }
      }
    }

  }
  Dna=function(Sped,perS,hei,scheme){
    this.hei=hei;
    this.p=[]
    for(var i=0;i<perS;i++){
      this.p.push(new pair(W/2+(i-(perS/2))*(W/perS),H/2,i*PI/10,this.hei,Sped,scheme));
    }
    this.next=function(){
      for(var i=0;i<perS;i++){
        this.p[i].next()
      }
    }
  }
  d=new Dna(Speed,perScre,heigh,Scheme);

}
var Dna;
var d;
var W;
var H;
function draw(){
  background(0);
  d.next();

}