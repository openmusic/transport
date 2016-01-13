(function() {
	var proto = Object.create(HTMLElement.prototype);

	var OpenMusicSlider = require('openmusic-slider');

	try {
		OpenMusicSlider.register('openmusic-slider');
	} catch(e) {
		// The slider might have been registered already, but if we register again
		// it will throw. So let's catch it and silently shut up.
	}
	
	proto.createdCallback = function() {
		
		var that = this;
		this.values = {};

		// making web components MWC framework proof.
		this.innerHTML = '';

		var templateContents = 
			'<button class="play">Play</button>' +
			'<button class="stop" disabled>Stop</button>' +
			'<label>BPM <openmusic-slider min="1" max="300" value="125"></openmusic-slider></label>';
		var template = document.createElement('template');
		template.innerHTML = templateContents;

		var liveHTML = document.importNode(template.content, true);
		var div = document.createElement('div');
		div.appendChild(liveHTML);
		
		var playButton = div.querySelector('[class=play]');
		var stopButton = div.querySelector('[class=stop]');

		playButton.addEventListener('click', function() {
			setEnabled(playButton, false);
			setEnabled(stopButton, true);
			dispatchEvent('play', that);
		});

		stopButton.addEventListener('click', function() {
			setEnabled(playButton, true);
			setEnabled(stopButton, false);
			dispatchEvent('stop', that);
		});

		var slider = div.querySelector('openmusic-slider');
		slider.addEventListener('input', function() {
			dispatchEvent('bpm', that, { value: slider.value * 1.0 });
		});

		this.appendChild(div);
		this.readAttributes();
		
	};

	
	function dispatchEvent(type, element, detail) {
		detail = detail || {};
		
		var ev = new CustomEvent(type, { detail: detail });
		element.dispatchEvent(ev);
	}

	function setEnabled(button, enabled) {
		if(!enabled) {
			button.setAttribute('disabled', 'disabled');
		} else {
			button.removeAttribute('disabled');
		}
	}

	
	proto.attachedCallback = function() {
	};


	proto.detachedCallback = function() {
	};


	proto.readAttributes = function() {
		var that = this;
		[].forEach(function(attr) {
			that.setValue(attr, that.getAttribute(attr));		
		});
	};

	
	proto.setValue = function(name, value) {

		if(value !== undefined && value !== null) {
			this.values[name] = value;
		}

		// TODO: Potential re-draw or DOM update in reaction to these values
	};


	proto.getValue = function(name) {
		return this.values[name];
	};

	
	proto.attributeChangedCallback = function(attr, oldValue, newValue, namespace) {
		
		this.setValue(attr, newValue);
		
		// var e = new CustomEvent('change', { detail: this.values } });
		// this.dispatchEvent(e);
		
	};


	// Optional: for components that represent an audio node
	proto.attachTo = function(audioNode) {
		audioNode.addEventListener('someevent', function(e) {
			// ...
		});
	};


	//


	var component = {};
	component.prototype = proto;
	component.register = function(name) {
		document.registerElement(name, {
			prototype: proto
		});
	};

	if(typeof define === 'function' && define.amd) {
		define(function() { return component; });
	} else if(typeof module !== 'undefined' && module.exports) {
		module.exports = component;
	} else {
		component.register('openmusic-transport'); // automatic registration
	}

}).call(this);

