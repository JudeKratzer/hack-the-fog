var haspressed=false;
$( function() {
  $( "#continent" ).selectmenu({
  
  change: function(event, data) {
    var LOtype = data.item.value;
    console.log(typeof(LOtype));
    grid.newc(LOtype);
    console.log(LOtype);
    haspressed=true;
    grid.init()
    noStroke();
    grid.hexs();
    grid.gen(2,2,4);
    }
  });
  $("#refresh").button();
  $("#refresh").click( function(){
    grid.newc(grid.colors);
    haspressed=true;
    grid.init()
    noStroke();
    grid.hexs();
    grid.gen(2,2,4);
  });
  $( "#dmf" ).selectmenu({ 
  change: function(event, data) {
    var DMFtype = data.item.value;
    console.log(typeof(DMFtype));
    grid.newp(DMFtype);
    console.log(DMFtype);
    haspressed=true;
    grid.init()
    noStroke();
    grid.hexs();
    grid.gen(2,2,4);
    }
  
  });
                   
  
});
function setup(){
  //noLoop();
  createCanvas(windowWidth,windowHeight);
  function Hexagon(x,y,sidelength,color){
    this.color=color;
    this.x=x;
    this.y=y;

    this.make=function(){
      fill(this.color);
      beginShape();
      vertex(sidelength*cos(2*PI/3)+x,sidelength*sin(2*PI/3)+y);
      vertex(sidelength*cos(PI/3)+x,sidelength*sin(PI/3)+y);
      vertex(sidelength*cos(0)+x,sidelength*sin(0)+y);
      vertex(sidelength*cos(5*PI/3)+x,sidelength*sin(5*PI/3)+y);
      vertex(sidelength*cos(4*PI/3)+x,sidelength*sin(4*PI/3)+y);
      vertex(sidelength*cos(PI)+x,sidelength*sin(PI)+y);
      endShape(CLOSE);
    }
    this.colorChange=function(newColor){
      this.color=newColor;
    }
    this.getColor=function(){
      return(this.color);
    }
  }

  //Colors
  var Forest=color(0,120,0);
  var Desert=color(255,255,100);
  var Mountain=color(150,150,150);
  var Green=color(0,255,0);
  var Blue=color(0,0,255);
  var Red=color(255,0,0);
  //Land ocean types
  var OceansOnly=[Blue];
  var Oceans=[Green,Green,Blue,Blue,Blue];
  var Continents=[Green,Green,Green,Green,Green,Blue,Blue,Blue,Blue];
  var Equal=[Green,Blue];
  var LandOnly=[Green];
  var types={"OceansOnly":OceansOnly,"Oceans":Oceans,"Continents":Continents,"Equal":Equal,"LandOnly":LandOnly}
  //Desert forest mountain types
  var Normal=[Desert,Desert,Forest,Forest,Mountain];
  var Plain=[Green]
  
  var DMFs={"Normal":Normal,"Plain":Plain}

  
  var Hexlength=20;

  function Grid(Hl,colors,type){
    this.type=type;
    this.n=false;
    this.hexs1=[];
    this.hexs2=[];
    this.colors=colors;
    this.Hl=Hl;
    this.should=0;
    this.init=function(col){
      this.hexs1=[];
      this.hexs2=[];
      for(var i=-1;i<windowWidth/this.Hl+1;i++){
      var x=[];
      for(var j=-1;j<windowHeight/this.Hl+1;j++){
        x.push(new Hexagon(this.Hl*(j*3+1),((i+1/2)*sqrt(3))*this.Hl,this.Hl,
                random(this.colors)));

      }
      this.hexs1.push(x);
    }
      for(var i=-1;i<windowWidth/this.Hl+1;i++){
      var y=[];

      for(var j=-1;j<windowHeight/this.Hl+1;j++){
        y.push(new Hexagon(this.Hl*(j*3-1/2),i*sqrt(3)*this.Hl,this.Hl,
                random(this.colors)));
      }
      this.hexs2.push(y);
    }
    }
    this.init();
    this.hexs = function(){
      for(var i=0;i<windowWidth/this.Hl+1;i++){
        for(var j=0;j<windowHeight/this.Hl+1;j++){
          this.hexs1[i][j].make();
          this.hexs2[i][j].make();

        }
      }
    }
    this.clean = function(c,c1,c2){
      var check=0;
      this.cleans1=[];
      this.cleans2=[];
      this.C=c
      for(var i=0;i<windowWidth/this.Hl-1;i++){
        for(var j=0;j<windowHeight/this.Hl-1;j++){
          if(i>0){
            if(j>0){
              check1=0;
              check2=0;
              thisColor1=this.hexs1[i][j].getColor();
              thisColor2=this.hexs2[i][j].getColor();
              if(thisColor1==c1||thisColor1==c2){
                if(this.hexs1[i-1][j].color==thisColor1){
                 check1++;
                }
                if(this.hexs1[i+1][j].color==thisColor1){
                 check1++;
                }
                if(this.hexs2[i][j].color==thisColor1){
                  check1++;
                }
                if(this.hexs2[i][j+1].color==thisColor1){
                  check1++;
                }
                if(this.hexs2[i+1][j].color==thisColor1){
                  check1++;
                }
                if(this.hexs2[i+1][j+1].color==thisColor1){
                  check1++;
                }
                if(check1<=this.C){
                  this.cleans1.push(this.hexs1[i][j]);
                }
              }
              if(thisColor2==c1||thisColor2==c2){
                if(this.hexs2[i-1][j].color==thisColor2){
                  check2++;
                }
                if(this.hexs2[i+1][j].color==thisColor2){
                  check2++;
                }
                if(this.hexs1[i-1][j-1].color==thisColor2){
                  check2++;
                }
                if(this.hexs1[i-1][j].color==thisColor2){
                  check2++;
                }
                if(this.hexs1[i][j-1].color==thisColor2){
                  check2++;
                }
                if(this.hexs1[i][j].color==thisColor2){
                  check2++;
                }
                if(check2<=this.C){
                  this.cleans2.push(this.hexs2[i][j]);
                }
              }

            }
          }

        }
      }

      this.cleans1.forEach(function(tile){
        if(tile.getColor()==c1){
          tile.colorChange(c2);
          check+=1;
        }else if(tile.getColor()==c2){
          tile.colorChange(c1);
          check+=1;
        }

      });
      this.cleans2.forEach(function(tile){
        if(tile.getColor()==c1){
          tile.colorChange(c2);
          check+=1;
        }else if(tile.getColor()==c2){
          tile.colorChange(c1);
          check+=1;
        }
      });
      if(check==0){
        this.should++;

      }

    }
    this.neatClean=function(c){

        var check=0;
        this.cleans1=[];
        this.cleans2=[];
        this.C=c
        for(var i=0;i<windowWidth/this.Hl-1;i++){
          for(var j=0;j<windowHeight/this.Hl-1;j++){
            if(i>0){
              if(j>0){
                check1=0;
                check2=0;
                thisColor1=this.hexs1[i][j].getColor();
                thisColor2=this.hexs2[i][j].getColor();
                if(true){
                  if(this.hexs1[i-1][j].color==thisColor1){
                   check1++;
                  }
                  if(this.hexs1[i+1][j].color==thisColor1){
                   check1++;
                  }
                  if(this.hexs2[i][j].color==thisColor1){
                    check1++;
                  }
                  if(this.hexs2[i][j+1].color==thisColor1){
                    check1++;
                  }
                  if(this.hexs2[i+1][j].color==thisColor1){
                    check1++;
                  }
                  if(this.hexs2[i+1][j+1].color==thisColor1){
                    check1++;
                  }
                  if(check1<=this.C){
                    this.cleans1.push([this.hexs1[i][j],
                      ((random(2)<1) ? (random(2)<1) ? this.hexs1[i+1][j].getColor():
                      this.hexs1[i-1][j].getColor():
                      (random(2)<1) ? this.hexs2[i+1][j].getColor():
                      this.hexs2[i][j+1].getColor()
                      )]);
                  }
                }
                if(true){
                  if(this.hexs2[i-1][j].color==thisColor2){
                    check2++;
                  }
                  if(this.hexs2[i+1][j].color==thisColor2){
                    check2++;
                  }
                  if(this.hexs1[i-1][j-1].color==thisColor2){
                    check2++;
                  }
                  if(this.hexs1[i-1][j].color==thisColor2){
                    check2++;
                  }
                  if(this.hexs1[i][j-1].color==thisColor2){
                    check2++;
                  }
                  if(this.hexs1[i][j].color==thisColor2){
                    check2++;
                  }
                  if(check2<=this.C){
                    this.cleans2.push([this.hexs2[i][j],
                      ((random(2)<1) ? (random(2)<1) ? this.hexs2[i+1][j].getColor():
                      this.hexs2[i-1][j].getColor():
                      (random(2)<1) ? this.hexs1[i-1][j].getColor():
                      this.hexs1[i][j-1].getColor()
                      )]);
                  }
                }

              }
            }

          }
        }

        this.cleans1.forEach(function(tile){
          tile[0].colorChange(tile[1]);

        });
        this.cleans2.forEach(function(tile){
          tile[0].colorChange(tile[1]);
        });
        if(check==0){
          this.should++;

        }


    }
    this.forest=function(p){
      for(var i=1;i<windowWidth/this.Hl-1;i++){
        for(var j=1;j<windowHeight/this.Hl-1;j++){
          r=random(100);
          v=random(100);
          if(this.hexs1[i][j].getColor()==Green&&r<p){
            var type=random(this.type);
            if(this.hexs1[i-1][j].color==Green){
              this.hexs1[i-1][j].colorChange(type);
            }
            if(this.hexs1[i+1][j].color==Green){
              this.hexs1[i+1][j].colorChange(type);
            }
            if(this.hexs2[i][j].color==Green){
              this.hexs2[i][j].colorChange(type);
            }
            if(this.hexs2[i][j+1].color==Green){
              this.hexs2[i][j+1].colorChange(type);
            }
            if(this.hexs2[i+1][j].color==Green){
              this.hexs2[i+1][j].colorChange(type);
            }
            if(this.hexs2[i+1][j+1].color==Green){
              this.hexs2[i+1][j+1].colorChange(type);
            }
            this.hexs1[i][j].colorChange(type);

          }
          if(this.hexs2[i][j].getColor()==Green&&v<p){
            var type=random(this.type);
            if(this.hexs2[i-1][j].color==Green){
              this.hexs2[i-1][j].colorChange(type);
            }
            if(this.hexs2[i+1][j].color==Green){
              this.hexs2[i+1][j].colorChange(type);
            }
            if(this.hexs1[i-1][j-1].color==Green){
              this.hexs1[i-1][j-1].colorChange(type);
            }
            if(this.hexs1[i-1][j].color==Green){
              this.hexs1[i-1][j].colorChange(type);
            }
            if(this.hexs1[i][j-1].color==Green){
              this.hexs1[i][j-1].colorChange(type);
            }
            if(this.hexs1[i][j].color==Green){
              this.hexs1[i][j].colorChange(type);
            }
            this.hexs2[i][j].colorChange(type);
          }
        }

      }
      for(var i=0;i<windowWidth/this.Hl;i++){
        for(var j=0;j<windowHeight/this.Hl;j++){

        }

      }

    }
    this.gen=function(c,p,d){
      var down=d;
      if(this.should==0){
        this.clean(c,Green,Blue);
      }else if(this.should==1){
        while(down>0){
          down--;
          this.forest(p);
        }
        this.should++;

      }else if(this.should==2){
        for(var k=0;k<20;k++){
          this.neatClean(2);
        }

      }else if(this.should==3){
        this.hexs();
        this.should++;
      }

    }
    this.newc=function(newc){
      if(typeof(newc)=="string"){
        newc=types[newc]
      }
      console.log(typeof(newc))
      this.colors=newc;
      this.should=0;
      if(this.should==0){
        this.clean(2,Green,Blue);
      }
    }
    this.newp=function(newp){
      if(typeof(newp=="string")){
        newp=DMFs[newp]
      }
      console.log(typeof(newp))
      this.type=newp;
      this.should=0;
      if(this.should==0){
        this.clean(2,Green,Blue);
      }
    }


  }
  if(!haspressed){
    grid=new Grid(7,Continents,Normal);
  }
}


var grid;

function draw(){

  noStroke();
  grid.hexs();
  grid.gen(2,2,4);


}
