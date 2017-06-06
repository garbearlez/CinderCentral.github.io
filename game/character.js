// create a reference to our element
var element = document.querySelector('#char');
// create our Motio sprite
var sprite = new Motio(element, {fps: 2, frames: 2});
// start animation
sprite.play();
