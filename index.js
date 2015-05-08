(function() {
	var proto = Object.create(HTMLElement.prototype);
	
	proto.createdCallback = function() {
		
		var that = this;
		this.values = {};

		// making web components MWC framework proof.
		this.innerHTML = '';

		var templateContents = 
			'<button class="play">Play</button>' +
			'<button class="stop" disabled>Stop</button>';
		var template = document.createElement('template');
		template.innerHTML = templateContents;

		var liveHTML = document.importNode(template.content, true);
		var div = document.createElement('div');
		div.appendChild(liveHTML);
		
		/*['play', 'stop'].forEach(function(className) {
		
			var actionButton = div.querySelector('[class=' + className + ']');
			actionButton.addEventListener('click', function() {
				dispatchEvent(className, that);
			});

		});*/
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

		this.appendChild(div);
		this.readAttributes();
		
	};

	
	function dispatchEvent(type, element) {
		var ev = new CustomEvent(type);
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
		component.register('openmusic-web-component-template'); // automatic registration
	}

}).call(this);

