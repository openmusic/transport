require('../').register('openmusic-transport');

var ac = new AudioContext();
var componentElement = document.querySelector('openmusic-transport');
var textLog = document.querySelector('textarea');

componentElement.addEventListener('play', function() {
	log('play');
});

componentElement.addEventListener('stop', function() {
	log('stop');
});


function log(text) {
	textLog.innerHTML += text + '\n';
}
