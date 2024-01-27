let baseUrl = 'https://api.are.na/v2/channels/';
let friendsChannelUrl = 'index-vzyt1nt6hz4';
let sharedChannelUrl = 'shared-instances';
let rotatingTimer;
let shapes = ['square', 'oval', 'diamond', 'tv', 'triangle'];

$(document).ready(function(){
  let friendsImageSet = new FriendlyImageSet(friendsChannelUrl, '#shapes-large-top', '#shapes-small-top');
  let sharedImageSet = new FriendlyImageSet(sharedChannelUrl, '#shapes-large-bottom', '#shapes-small-bottom');
  
  rotateText();
  
  // allow :active states on mobile 
  document.addEventListener("touchstart", function(){}, true);
});

function rotateText(){
  rotatingTimer = setInterval(function(){
    $('#text').toggleClass('show-click-message');
  }, 3000);
}

function clearRotation(){
  $('#text').attr('class', 'text-messages');
  clearInterval(rotatingTimer);
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// to handle and run through images on each button click 
class FriendlyImageSet {
  constructor(url, buttonId, smallShapeId){
    this.imageCount = 0;
    let _this = this;
    
    // get all blocks from an are.na channel and filter down to images / their url 
    $.get(baseUrl + url, function( data ) {
      console.log(data);
      _this.images = data.contents
        .filter(block => block.class == 'Image')
        .map(block => block.image.large.url);
      console.log(_this.images);
    });
    
    
    // set button listener 
    $(buttonId).click(function(e){
      clearRotation();
      
      // get next image url 
      console.log(_this.images);
      let nextImage = _this.images[_this.imageCount++];
      if(_this.imageCount > _this.images.length - 1) {
        _this.imageCount = 0;
      }
      
      // set background image of shape-section 
      $(this).parent().css('background-image', 'url(' + nextImage + ')');
      
      // set new shape 
      let randShape = shapes[getRandom(0, shapes.length - 1)];
      $(this).attr('class', 'shape-button shape--is-' + randShape);
      $(smallShapeId).attr('class', 'shape--is-' + randShape);
    });
    
    
  }
  
  
}