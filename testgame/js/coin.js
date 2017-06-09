// create a reference to our element
var element = document.querySelector('#coin');
// create our Motio sprite
var sprite = new Motio(element, {fps: 12, frames: 19});
// start animation
sprite.play();
