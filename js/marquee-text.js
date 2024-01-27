
// MOVING TEXT 
let so = 0
let speed = 0.07;
function Marquee(){
  requestAnimationFrame(Marquee)
  tp.setAttributeNS(null,"startOffset",so+"%");
  if(so >= 105){so = 0;}
  so+= speed
}

Marquee()