// create a reference to our element
var element = document.querySelector('#char');
// create our Motio sprite
var sprite = new Motio(element, {fps: 4, frames: 4});
// start animation
sprite.play();
