
var squareWidth = 30;
var playChecker = false;
var speed = 30;
var val = 0;
var printArr;
var trees
$( function() {
  $(window).on('scroll', function() {
    if($(window).scrollTop()) {
        $('nav').addClass('black');
    }
    else {
        $('nav').removeClass('black');
    }
  });
  $("#reset").button();
  $("#reset").click( function () {
    setup();
    playChecker = false;
    $("#pause").text("Play");
    //g.reset();
  });
  $( "#spinner" ).spinner({
    min: 10, 
    max: 100
  }); 
  $( "#spinner" ).spinner( "value", squareWidth );
  $("#getvalue").button();
  $("#getvalue").click(function() {
    squareWidth = $( "#spinner" ).spinner( "value" );
    if (squareWidth < 10) {
      squareWidth = 10;
      $( "#spinner" ).spinner( "value", 10 );
    } else if (squareWidth > 100) {
      squareWidth = 100;
      $( "#spinner" ).spinner( "value", 100 ); 
    }
    rows=W/squareWidth;
    cols=H/squareWidth;
    setup();
    console.log(squareWidth); 
  });
  $("#pause").button();
  $("#pause").click( function(){
    if (!playChecker){
      playChecker = true;
      $("#pause").text("Pause");
      g.play();
    }else{
      playChecker = false;
      $("#pause").text("Play");
      g.pause()
    }

  });
  $("#next").button();
  $("#next").click( function(){
    g.lifeIt(true);
    g.update();
  });
  
  var handle = $( "#custom-handle" );
  $( "#slider" ).slider({
    value: 30,
    max: 60,
    min: 1,
    create: function() {
      handle.text( $( this ).slider( "value" ) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      speed = ui.value;
    }
  });
  $("#save").button();
  $("#save").click( function(){
    save();

  });
  $("#load").button();
  $("#load").click( function(){
    $.getJSON("/tgol/data.json", function(data) {
      g.load(data.loads.glider);
    });
  });
  
});
var save;
var load;
var fc;
function setup(){
  fc=frameCount;
  frameRate(60);
  createCanvas(windowWidth,windowHeight);
  W=windowWidth;
  H=windowHeight-180;
  save=function(){
    printArr(g.grid)
  }
  load=function(){
    g.load(g.loadstr)
  }
  printArr=function(arr){
    printstr='['
    for(var r=0;r<arr.length;r++){
      var rowstr="[";
      for(var c=0;c<arr[0].length;c++){
        if(c==0){
          rowstr=rowstr+String(arr[r][c])
        }else{
          rowstr=String(rowstr+","+String(arr[r][c]))
        }
      }
      rowstr=String(rowstr+"],")
      printstr=(printstr+(rowstr));
      
    }
    printstr=printstr+']'
    console.log(printstr);
  }
  grid = function(rows,cols,yoffset,playing){
    this.loadstr=[[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false],[false,false,false,false,true,false,false,false,true,false,false,false,false,false,false,false,false],[false,false,false,true,false,false,false,false,false,true,false,false,false,false,false,false,false],[false,false,false,true,false,false,false,false,false,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,true,false,false,false,true,false,false,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false],[false,false,true,false,false,false,true,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,true,true,false,false,false,true,true,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]
    this.playing=playing;
    this.yoffset=yoffset;
    this.rows=rows;
    this.cols=cols;
    this.grid=[]
    this.Xint=floor(W/this.rows);
    this.Yint=floor(H/this.cols);
    this.lastX=-1;
    this.lastY=-1;
    for(var i=0;i<this.rows;i++){
      var row=[];
      for(var j=0;j<this.cols;j++){
        row.push(false);
      }
      this.grid.push(row)
    }
    this.update=function(){
      for(var i=0;i<this.rows;i++){
        for(var j=0;j<this.cols;j++){
          if(this.grid[i][j]){
            fill(0);
          }else{
            fill(255);
          }
          stroke(128);
          strokeWeight(1);
          rect((this.Xint*i),(this.Yint*j)+this.yoffset,this.Xint,this.Yint);
        }
      }

    }
    this.adjcellcount=function(x,y){
      var cc=0;
      for(var i=0;i<8;i++){

        var xincr=(((i+3)%4)==0)?0:(((i+2)%8)<3)?1:-1
        var yincr=(((i+1)%4)==0)?0:(i<3)?1:-1
        if(this.isVal(x+xincr,y+yincr)){
          if(this.cVal(x+xincr,y+yincr)){cc++}
        }
      }
      return(cc);

    }
    this.lifeIt=function(playing){
      if(playing==true){
        var newg=[]
        for(var i=0;i<this.rows;i++){
          var row=[]
          for(var j=0;j<this.cols;j++){
              if(this.adjcellcount(i,j)>3||this.adjcellcount(i,j)<2){
                row.push(false);
              }else if(this.adjcellcount(i,j)==3){
                row.push(true);
              }else if(this.cVal(i,j)){
                row.push(true);
              }else{
                row.push(false);
              }
          }

          newg.push(row);
        }
        this.grid=concat([],newg);
      }
    }
    this.changeCell=function(c,x,y){
      if(c=="no"){
        this.lastX=-1; this.lastY=-1;
      }else if((x==this.lastX)&&(y==this.lastY)){
        this.lastX=x; this.lastY=y;
      }else{

        var newg=[]
        for(var i=0;i<this.rows;i++){
          var row=[]
          for(var j=0;j<this.cols;j++){
            if(!(i==x&&j==y)){
              row.push(this.grid[i][j]);
            }else{
              row.push(c);
            }
          }
          newg.push(row);
        }
        this.grid=concat([],newg);
        this.lastX=x; this.lastY=y;
      }


    }
    this.cVal=function(x,y){
      return(this.grid[x][y]);
    }
    this.reset =function(){
      this.playing=false;
      var newg=[]
      for(var i=0;i<this.rows;i++){
        var row=[];
        for(var j=0;j<this.cols;j++){
          row.push(false);
        }
        newg.push(row)
      }
      this.grid=concat([],newg)
    }
    this.isVal=function(x,y){
      if(x<0||x>=rows||y<0||y>=cols){
        return false;
      }else{
        return true;
      }
    }
    
    this.pause=function(){
      this.playing=false;
    }
    this.play=function(){
      this.playing=true;
    }
    this.state=function(){
      return this.playing
    }
    this.load=function(preset){
      var newa=[];
      var arr=concat([],preset);
      for(var i=0;i<this.rows;i++){
        var tb=floor((this.cols-preset[0].length)/2)
        var lb=floor((this.rows-preset.length)/2)
        var row=[];
        for(var j=0;j<this.cols;j++){
          if(0<=(i-lb)&&(i-lb)<preset.length&&(j-tb)<preset[0].length&&0<=(j-tb)){
            console.log("hi");
             row.push(preset[i-lb][j-tb])
          }else{
            row.push(false);   
          }
          
        }
          newa.push(row);
      
      }
      
      this.grid=concat([],newa);
    }
  }
  var lo=[[false,false],[false,false]]
  g = new grid(floor(W/squareWidth),floor(H/squareWidth),180,false);
  //g.load(longstr);
  g.update()
  
}
var grid;
var g;
var W;
var H;
function draw(){
  if(frameCount%(floor(60/speed))==0){  // i think it's working now
    g.lifeIt(g.playing);
  }
  g.update();
 
  if(mouseIsPressed){
    Xpos=floor(mouseX/squareWidth);
    Ypos=floor((mouseY-180)/squareWidth);
    if(g.cVal(Xpos,Ypos)){
      g.changeCell(false,Xpos,Ypos);
    }else{
      g.changeCell(true,Xpos,Ypos);
    }
  }else{
    g.changeCell("no",0,0);
  }
}