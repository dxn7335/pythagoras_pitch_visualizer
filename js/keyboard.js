/*

Z:C3
S:C#3
X:D3
D:Eb3
C:E3
V:F3
G:F#3
B:G3
H:G#3
N:A3
J:Bb3
M:B3

,:C4
L:C#4
.:D4
;:Eb4
/:E4

Q:C4
2:C#4
W:D4
3:Eb4
E:E4
R:F4
5:F#4
T:G4
6:G#4
Y:A4
7:Bb4
U:B4

I:C5
9:C#5
O:D5
0:Eb5
P:E5
[:F5
=:F#5
]:G5

Base Frequency According to
http://www.phy.mtu.edu/~suits/notefreqs.htmlnoteFreqs
*/
var Keyboard = (function () {

	// private variables and functions
	var c3_freq = 131;
	var audio;
	var oscillators = []; // one oscillator for each note?
	var gainNodes = []; // and one gainNodes per oscillator to control "playing
	var mix;
	var compressor;

	// constructor
	var Keyboard = function () {
		// Initialize webAudio oscillator
		audio = new webkitAudioContext();
		// Master Gain
		mix = audio.createGain();
		for (var i=0; i<pythaRatios.length; i++)
		{
			oscillators[i] = audio.createOscillator();
			gainNodes[i] = audio.createGain();
			oscillators[i].type = 3; // triangle wave
			var freq = c3_freq + c3_freq * (pythaRatios[i][0] / pythaRatios[i][1]);
			oscillators[i].frequency.value = freq;
			gainNodes[i].gain.value = 0;
			oscillators[i].connect(gainNodes[i]);
			gainNodes[i].connect(mix);
			oscillators[i].noteOn && oscillators[i].noteOn(0);
		}
		// dat top C
		oscillators[12] = audio.createOscillator();
		gainNodes[12] = audio.createGain();
		oscillators[12].type = 3; // triangle wave
		var freq = c3_freq + c3_freq * 1;
		oscillators[12].frequency.value = freq;
		gainNodes[12].gain.value = 0;
		oscillators[12].connect(gainNodes[12]);
		gainNodes[12].connect(mix);
		// Compression. Only works in Chrome by May 2014
		compressor = audio.createDynamicsCompressor();
		mix.connect(compressor);
		compressor.connect(audio.destination);

		oscillators[12].noteOn && oscillators[12].noteOn(0);
		//console.log(gainNodes);
	};
	// prototype
	Keyboard.prototype = {
		constructor: Keyboard,
		play: function (i) {
			//console.log(i);
			gainNodes[i].gain.value = 1;
		},
		stop: function (i) {
			gainNodes[i].gain.value = 0;
		},
	};

	return Keyboard;
})();
