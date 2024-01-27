
let colors = ['#FFEB3B', '#418DFF', '#9F53FF', '#FF4747', '#FF9B26'];
let containerId = 'add-away';
let P5 = new p5;




function clearDupes(){
  
}

function startDupes(){
  
}


function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}




class Zoomer {
	constructor(id){
    this.container = $('#' + id);
		this.isZooming = false;
    this.isScrambling = false;
    this.timerDuration = 100;
    this.scaleAmt = 0.05;
    this.colorStepAmt = 0.1;
    this.translateAmt = 12; // in pixels 
    this.count = 1;
    
    // this.startScrambling();
	}
  
  startScrambling(){
    this.update();
		this.timerId = setInterval((function(){ this.update() }).bind(this), this.timerDuration);
  }

	startZooming(){
		this.isZooming = true;

		this.update();
		this.timerId = setInterval((function(){ this.update() }).bind(this), this.timerDuration);
	}

	stopZooming(){
		this.isZooming = false;
    this.isScrambling = false;

    clearInterval(this.timerId);
    this.count = 1
    $('#add-away').html('');
    $('.friendly-link').text('https://hangouts.google.com/hangouts/_/calendar/bWF0dGllb2hhQGdtYWlsLmNvbQ.3dvnkm44kggpbru2a28rgut1qm');
	}

	update(){
    
    let linkBase = 'https://hangouts.google.com/hangouts/_/calendar/';
    let linkCode = 'bWF0dGllb2hhQGdtYWlsLmNvbQ.3dvnkm44kggpbru2a28rgut1qm';
    
    if(this.isZooming){
      let classname ='friendly-link';
      let scaleAmt = 1 - (this.count * this.scaleAmt);
      if (scaleAmt < 0) { scaleAmt = 0; this.isZooming = false; this.isScrambling = true;}
      let moveDown = this.count *  this.translateAmt;
      
      
      // let perlinNoise = P5.noise(this.count * 20);
      // let mappedNum = parseInt(P5.map(perlinNoise, 0, 1, 0, colors.length, true));
      // let color = colors[mappedNum];
      // debugger;
      let color = colors[this.count % colors.length];
      // color = "#000000"
      
      let linkScramble = linkBase + linkCode.shuffle();
      
      
      
      
      let styleString = `color: ${color}; transform: translateY(${moveDown}px) scale(${scaleAmt});`
      let linkHtml = `
          <a class="${classname}" style="${styleString}" href="https://hangouts.google.com/hangouts/_/calendar/bWF0dGllb2hhQGdtYWlsLmNvbQ.3dvnkm44kggpbru2a28rgut1qm?authuser=0' class='link-to-dup">
            ${linkScramble}
          </a>
          `;
      
      let newLinkElement = $.parseHTML(linkHtml);
      $('#add-away').prepend(newLinkElement);
      // debugger;
      this.count++;
    }
    
    if(this.isScrambling) {
      // let linkScramble = linkBase + linkCode.shuffle();
      // 'friends, last tuesday friends, last tuesday friends, last tuesday friends, last tuesday friends, last'
      // 'https://hangouts.google.com/hangouts/_/calendar/bWF0dGllb2hhQGdtYWlsLmNvbQ.3dvnkm44kggpbru2a28rgut1qm'
      let linkBase = 'https://hangouts.google.com/hangouts/_/calendar/';
      let linkCode = 'bWF0dGllb2hhQGdtYWlsLmNvbQ.3dvnkm44kggpbru2a28rgut1qm';
      let link = linkBase + linkCode
      
      // zoink, intercepted
      // link = 'friends, last tuesday friends, last tuesday friends, last tuesday friends, last tuesday friends, last'
      // link = 'friends,friends,friends,friends,friends,friends,friends,friends,friends,friends,friends,friends,frien'
      
      let linkScramble = link.shuffle();
      $('.friendly-link').text(linkScramble);
      
      // $('.friendly-black-hole').addClass('show');
    }
    
	}
}




let zoomer = new Zoomer('containerId');

let container = document.getElementById(containerId);

container.addEventListener('mouseover', function(e){
    zoomer.startZooming();
});

container.addEventListener('touchstart', function(e){
    zoomer.startZooming();
});

container.addEventListener('mouseout', function(e){
    zoomer.stopZooming();
});

container.addEventListener('touchend', function(e){
    zoomer.stopZooming();
});

