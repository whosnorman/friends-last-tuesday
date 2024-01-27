// find LAST TUESDAY and add span tags 

$("p:contains('LAST TUESDAY')").html(function(_, html) {
   return html.replace(/(LAST TUESDAY)/g, '<span>FRIENDS, LAST TUESDAY</span>');
});

let targetHeight = $(document).height() / 4;
let targetLeft = $(document).width() * 0.1;

// let baseLeft = 50;
// let targetLeft = $(document.body).position().left + baseLeft;


/* Code to eventually use for getting mose position? */ 

// $("#divA").mousemove(function(e){
//   var pageCoords = "( " + e.pageX + ", " + e.pageY + " )";
//   var clientCoords = "( " + e.clientX + ", " + e.clientY + " )";
//   console.log(e.clientY, e.clientX);
//   targetHeight = e.clientY;
//   targetLeft = e.clientX;
// });


$(document).ready(function(){
  $('.container p span').each(function(index){
    // reference element as this 
    let pos = $(this).position();

    // pos.left and pos.top are available 
    let parentPos = $(this).parent().position();

    let newTop = targetHeight - pos.top - parentPos.top; 
    let newLeft = targetLeft - pos.left - parentPos.left;

    $(this).parent().css({top: newTop + 'px', left: newLeft + 'px'});
  });

  let paragraphs = $('.container p').toArray();

  // loop
  let counter = 0;
  setInterval(function(){
    let lastCounter = counter - 1;

    if (counter > paragraphs.length - 1){
      counter = 0;
      lastCounter = paragraphs.length - 1;
    }

    $(paragraphs[counter]).toggleClass('show');
    $(paragraphs[lastCounter]).toggleClass('show');
    
    let newTop = Math.sin(counter / 10) * $(document).height() / 5;
    // console.log(newTop);
    
    $('#container').css('top', newTop + 'px');

    counter++;
  }, 700);
  
});




//
// PLANT GROWTH
// 


// function grow() {
//   console.log(leaf.cloneNode());
//   plant.appendChild(leaf.cloneNode());
// }

// const plant = document.getElementById('plant');
// const leaf = document.getElementsByClassName('leaf');

// grow();

let today = new Date().getDay();
// sunday: 0, monday: 1, etc. 
let branchAmt = 0;

// higher branch number creates a smaller tree 
switch(today){
  case 0:
    branchAmt = 3;
    break;
  case 1:
    branchAmt = 2;
    break;
  case 2:
    branchAmt = 1; // peak tree size on tuesday
    break;
  case 3:
    branchAmt = 8; // restart size on wednesday
    break;
  case 4:
    branchAmt = 7;
    break;
  case 5:
    branchAmt = 6;
    break;
  case 6:
    branchAmt = 5;
    break;
  case 7:
    branchAmt = 4;
    break;
  default: 
    branchAmt = 4;
    break;
}

// create P5.js instance
let treeSketchFunction = function(p){
  p.setup = function(){ 
    p.createCanvas(600,600); 
    p.noLoop(); 
  } 

  p.draw = function(){ 
    // p.background(255);    
    p.strokeWeight(8); 
    p.translate(p.width/2,p.height); 
    branch(branchAmt); 
    let hello = p.height;
    // console.log(hello)
    // debugger;
  } 

  function branch(depth){ 
    if (depth < 10) { 
      p.line(0,0,0,-p.height/15); // draw a line going up
      if(depth > 7 && branchAmt != 8 && branchAmt != 9 && p.random(1.0) < 0.6){
        p.push();
        p.strokeWeight(0);
        // p.fill('rgba(255, 71, 71, 1)'); 
        p.fill(`rgba(255, 102, 212, ${p.random(0.2, 1.0)})`); 
        // p.fill('#FC5DEC'); 
        p.circle(0, -p.height/15, p.random(40, 80));
        p.pop();
      }
      { 
        p.translate(0,-p.height/15); // move the space upwards
        // p.rotate(p.random(-0.05,0.05));  // random wiggle
        p.rotate(0.02);  // wiggle to the right

        if (p.random(1.0) < 0.6){ // branching   
          p.rotate(0.3); // rotate to the right
          p.scale(0.8); // scale down

          p.push(); // now save the transform state
          branch(depth + 1); // start a new branch!
          p.pop(); // go back to saved state

          p.rotate(-0.6); // rotate back to the left 

          p.push(); // save state
          branch(depth + 1);   // start a second new branch 
          p.pop(); // back to saved state        
       } 
        else { // no branch - continue at the same depth  
          branch(depth);
        } 
      } 
    }

  }
  
  // p.mouseReleased = function(){ 
  //   p.redraw();  
  // } 
}


let treeSketch = new p5(treeSketchFunction, 'friendly-tree'); 