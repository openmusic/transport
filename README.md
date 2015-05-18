# openmusic-transport

> A transport control web component

[![Install with NPM](https://nodei.co/npm/openmusic-transport.png?downloads=true&stars=true)](https://nodei.co/npm/openmusic-transport/)

## Installation

Grab `index.js` from the repo or do `npm install openmusic-transport`.

### If not using any package manager

Include `index.js` before you use the component:

```javascript
<script src="index.js"></script>
```

It will be registered automatically as `openmusic-transport`, so you can `document.createElement('openmusic-transport')` or just have `<openmusic-transport>` elements in your HTML source.

### If using npm

You need to load the module and then register it--it is not automatically registered!

```javascript
require('openmusic-transport').register('openmusic-transport');
```

But you could even register it with other name, for example:

```javascript
require('openmusic-transport').register('mega-transport');
```

Up to you.

## Usage

Have a look at `demo/demo.js` for an example that does things in order to things.

<!--
### Attributes

#### `attribute`

Explanation of attribute.

Examples:

```javascript
<openmusic-transport attribute="-1"></openmusic-transport>
```
-->

### Events

#### `play`

This event will be dispatched when the `play` button is clicked. To listen for `play` events on this component, add an event listener:

```javascript
component.addEventListener('play', function(ev) {
	// do something
});
```

#### `stop`

This event will be dispatched when the `stop` button is clicked. To listen for `stop` events on this component, add an event listener:

```javascript
component.addEventListener('stop', function(ev) {
	// do something
});
```

#### `bpm`

This event will be dispatched when the user interacts with the `bpm` slider. To listen for `bpm` events on this component, add an event listener:

```javascript
component.addEventListener('bpm', function(ev) {
	// do something with the bpm value
	console.log('new bpm value', ev.detail.value);
});

