var RT =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Add 3rd party scripts in a pinch
	var AddScript = __webpack_require__(1);

	AddScript.add("//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0");
	AddScript.add("//platform.twitter.com/widgets.js");
	AddScript.add("//apis.google.com/js/platform.js");

	exports.state = __webpack_require__(2);

	/* COMPONENTS */

	exports.linktag2 = __webpack_require__(3).attach;
	exports.fileInput = __webpack_require__(4).attach;
	exports.imagePreview = __webpack_require__(10).attach;
	exports.videoTrigger = __webpack_require__(11).attach;
	exports.docUpload = __webpack_require__(12).attach;
	exports.imagePicker = __webpack_require__(13).attach;
	exports.youtube = __webpack_require__(14);
	exports.jwplayer = __webpack_require__(16);
	exports.modControls = __webpack_require__(18).attach;
	exports.popupShare = __webpack_require__(19).share;
	exports.forumControls = __webpack_require__(20).attach;
	exports.ajaxFormControls = __webpack_require__(21).attach;
	exports.commentControls = __webpack_require__(22).attach;
	exports.ajaxToggle = __webpack_require__(23).attach;
	exports.ajaxPagination = __webpack_require__(25).attach;
	exports.flashMessage = __webpack_require__(9).flashMessage;
	exports.dynamicForm = __webpack_require__(26).attach;
	exports.fbAuth = __webpack_require__(27).attach;

	/* PAGE WORKFLOWS */

	exports.pages = {};
	exports.pages.sponsorship = __webpack_require__(29).run;
	exports.chat = __webpack_require__(31).attach;
	exports.pages.notifications = __webpack_require__(33).run;

	/* FROM LIBRARIES */

	exports.datepicker = __webpack_require__(34).datepicker;
	exports.datetimepicker = __webpack_require__(34).datetimepicker;
	exports.redactor = __webpack_require__(36);
	exports.usabilla = __webpack_require__(37).enable;
	exports.umbel = __webpack_require__(38).umbel;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
		add: function(scriptUrl, scriptId) {
		  var fjs, js;
		  if (scriptId === null) {
		    scriptId = "added-script-" + (document.getElementsByTagName('script').length);
		  }
		  js = fjs = document.getElementsByTagName('script')[0];
		  if (document.getElementById(scriptId)) {
		    return;
		  }
		  js = document.createElement('script');
		  js.id = scriptId;
		  js.src = scriptUrl;
		  return fjs.parentNode.insertBefore(js, fjs);
		}
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		set: set,
		expect: expect,
		has: has,
		get: get
	};

	var g = {};

	function set(name, value) {
		if (has(name)) {
			throw new Error('"'+name+'" has already been set in the state module.');
		} else {
			g[name] = value;
		}
	}

	function expect(name) {
		if (!has(name)) {
			throw new Error('"'+name+'" must be set in state.');
		}
	}

	function has(name) {
		return g[name] !== undefined;
	}

	function get(name) {
		return g[name];
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
		attach: buildLinktag
	};

	function buildLinktag(profile, network, csid) {
	    if (window._fw_linktag_params === undefined) {
	        window._fw_linktag_params = {
	            scan_delay: 0,
	            allow_rescan_after: 15000,
	            server: "5fd75.v.fwmrm.net",
	            network_id: network,
	            profile: "g_linktag2_html",
	            other_global_params: "csid="+csid
	        };

	        var e = function () {
	            if (document.addEventListener) document.removeEventListener('DOMContentLoaded', e, false);
	            else window.detachEvent('onload', e);
	            window._fw_page_ready = true;
	        };
	        if (document.addEventListener) document.addEventListener('DOMContentLoaded', e, false);
	        else if (window.attachEvent) window.attachEvent('onload', e);

	        var lt = document.createElement('script');  
	        lt.type = 'text/javascript';   
	        lt.async = true;  
	        // PRODUCTION
	        lt.src = window.location.protocol == 'http:' ? 
	           "http://adm.fwmrm.net/p/" + profile + "/LinkTag2.js" :
	           "https://mssl.fwmrm.net/p/" + profile + "/LinkTag2.js";
	        // DEMO AND TEST ONLY
	        // lt.src = "LinkTag2.js";
	        var s = document.getElementsByTagName('script')[0];
	        s.parentNode.insertBefore(lt, s); 
	    }
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5),
		Events = __webpack_require__(6),
		State = __webpack_require__(2),
		Evaporate = __webpack_require__(8),
		flashMessage = __webpack_require__(9).flashMessage,
		list = Function.prototype.call.bind(Array.prototype.slice);

	module.exports = {
		attach: attach
	};

	function attach(fileInputs, allowedTypes, listName, options) {
		State.expect('aws');

		fileInputs = Array.isArray(fileInputs) ? fileInputs : [ fileInputs ];
		allowedTypes = Array.isArray(allowedTypes) ? allowedTypes : [ allowedTypes ];
		listName = listName || 'pictures';
		options = options || {};

		var config = State.get('aws'),
			bucket = config.bucket || 'uploader.roosterteeth.com',
			// Don't require a user - This blows up unregistered applications on /about/careers
			userId = State.get('user') ? State.get('user').id : -1;

		var evaporate = new Evaporate({
				signerUrl: config.signerUrl,
				aws_key: config.awsKey,
				bucket: bucket,
				logging: false
			});

		$(function() {

			fileInputs.map($).forEach(function($fileInput) {
				$fileInput.change(function(evt) {
					var files = evt.target.files,
						remoteFiles = [],
						$submit = $fileInput.closest('form').find(':submit');

					$submit.attr('disabled', true);
					list(files).filter(function(file) {
						var ext = file.name.split('.').pop();
						var chk = allowedTypes.length > 0 ? allowedTypes.map(function(extension) { return extension.toLowerCase(); }).indexOf(ext.toLowerCase()) !== -1 : true;
						if (!chk) {
							flashMessage('Uploaded files have the wrong extension', 'danger');
							return false;
						}
						return chk;
					}).forEach(function(file) {
						var srcFilename = file.name.split(' ').join('_').replace('\'','');
						var filename = userId + '-' + (new Date()).getTime() + '-' + srcFilename;

						Events.emit('upload-start:'+$fileInput.attr('name'), srcFilename);
						evaporate.add({
							name: filename,
							file: file,
							xAmzHeadersAtInitiate: {
								'x-amz-acl':'public-read'
							},
							signParams: {
								file_type: file.type,
								file_size: file.size
							},
							complete: function() {
								var remoteFile = 'http://'+bucket+'.s3.amazonaws.com/'+filename;
								if (options.multiple) {
									$fileInput.after('<input type="hidden" name="'+listName+'[]" value='+remoteFile+' />');
								} else {
									if ($("input[name='"+listName+"']").val() === undefined) {
										$fileInput.after('<input type="hidden" name="'+listName+'" value='+remoteFile+' />');
									} else {
										$("input[name='"+listName+"']").val(remoteFile);
									}
								}
								Events.emit('upload-file-complete:'+$fileInput.attr('name'), srcFilename, remoteFile, options);

								remoteFiles.push(remoteFile);
								if (remoteFiles.length === files.length) {
									$(evt.target).val('');
									Events.emit('upload-files-complete:'+$fileInput.attr('name'), srcFilename, remoteFiles);

									// IE11 sees changing the file input target as a change (ln 34), which redisables the
									// submit button after upload.  Moving the process to remove disabled from the submit
									// button below the change fixes upload problems for IE11.
									if (listName !== 'video') {
										$submit.attr('disabled', false);
									}
								}
							},
							progress: function(progress){
								Events.emit('upload-progress:'+$fileInput.attr('name'), srcFilename, progress*100);
							}
						});
					});
				});
			});

		});
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = new (__webpack_require__(7).EventEmitter)();


/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = Evaporate;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(5);

	module.exports.flashMessage = function (message, level, container) {
	    var $container = container ? $(container) : $('#error-container');
	    $container.append(message);
	    $container.addClass('alert-' + level);
	    $container.removeClass('hidden');
	    location.href = '#' + $container.attr('id')
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5),
	    Events = __webpack_require__(6);

	module.exports = {
		attach: attach
	};

	function attach(ul, uploaderName) {
		Events.on('upload-start:'+uploaderName, started.bind(undefined, $(ul)));
		Events.on('upload-progress:'+uploaderName, progress.bind(undefined, $(ul)));
		Events.on('upload-file-complete:'+uploaderName, completed.bind(undefined, $(ul)));
	}

	function started($ul, filename) {
		console.log(filename + ' started');
		$ul.append('<li data-filename="'+filename+'">'+
				'<div class="progress">'+
				  '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">'+
				    filename+
				  '</div>'+
				'</div>'+
			'</li>');
	}

	function progress($ul, filename, pct) {
		console.log(filename + ' at ' + pct + '%');
		var $progressBar =$ul.find('li[data-filename="'+filename+'"] div.progress-bar');
		$progressBar.attr('aria-valuenow', pct);
		$progressBar.css('width', pct+'%');
	}

	function completed($ul, filename, remoteFile, options) {
		console.log(filename + ' completed');

		var metaAppend = options.metadataEnabled ? '<div class="img-metadata"><input type="text" name="'+filename+'-title" placeholder="Enter title here..." /><textarea name="'+filename+'-description" placeholder="Enter description here..."></textarea></div>' : '';
		if (options.multiple) {
			$ul.find('li[data-filename="'+filename+'"]').html('<img src="'+remoteFile+'" width="100" />'+metaAppend);
		} else {
			$ul.html('<img src="'+remoteFile+'" width="100" />'+metaAppend);
		}
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5),
	    Events = __webpack_require__(6);

	module.exports = {
		attach: attach
	};

	function attach(ul, uploaderName) {
		Events.on('upload-start:'+uploaderName, started.bind(undefined, $(ul)));
		Events.on('upload-progress:'+uploaderName, progress.bind(undefined, $(ul)));
		Events.on('upload-file-complete:'+uploaderName, completed.bind(undefined, $(ul)));
	}

	function started($ul, filename) {
		console.log(filename + ' started');
		$ul.append('<li data-filename="'+filename+'">'+
				'<div class="progress">'+
				  '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">'+
				    filename+
				  '</div>'+
				'</div>'+
			'</li>');
	}

	function progress($ul, filename, pct) {
		console.log(filename + ' at ' + pct + '%');
		var $progressBar =$ul.find('li[data-filename="'+filename+'"] div.progress-bar');
		$progressBar.attr('aria-valuenow', pct);
		$progressBar.css('width', pct+'%');
	}

	function completed($ul, filename, remoteFile, multiple) {
		$ul.parent().submit();
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5),
	Events = __webpack_require__(6);

	module.exports = {
		attach: attach
	};

	function attach(ul, uploaderName) {
		Events.on('upload-start:'+uploaderName, started.bind(undefined, $(ul)));
		Events.on('upload-progress:'+uploaderName, progress.bind(undefined, $(ul)));
		Events.on('upload-file-complete:'+uploaderName, completed.bind(undefined, $(ul)));
	}

	function started($ul, filename) {
		console.log(filename + ' started');
		$ul.append('<i class="icon ion-load-a"></i>');
	}

	function progress($ul, filename, pct) {
		console.log(filename + ' at ' + pct + '%');
	}

	function completed($ul, filename, remoteFile, multiple) {
		console.log('Upload Complete: '+ filename);
		$ul.attr('disabled');
		$ul.children('i').removeClass('ion-load-a').addClass('ion-checkmark').html(' '+ filename +' uploaded successfully.');
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);

	module.exports = {
		attach: attach
	};

	function attach(el) {
		$(el).imagepicker({
			'show_label': true
		}).data('picker').sync_picker_with_select();

		var $container = $(el).next('ul.thumbnails');
		$container.imagesLoaded(function() {
			$container.masonry({
				itemSelector:   "li",
			});
		});
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);

	var g = {
	    options: null,
	    player: null,
	    duration: null
	};

	module.exports.player = function buildPlayer(options) {
	    g.options = options;
	};

	module.exports.onReady = function onYoutubeReady() {
	    var YT = __webpack_require__(15);

	    g.player = new YT.Player(g.options.iframeId, {
	        videoId: g.options.youtubeKey,
	        events: {
	            onReady: onPlayerReady,
	            onStateChange: onPlayerStateChange
	        }
	    });

	    function onPlayerReady(event) {
	        if (g.options.autoplay){
	            event.target.playVideo();
	        }
	        g.duration = g.player.getDuration();
	    }

	    function onPlayerStateChange(event) {
	        if (event.data == YT.PlayerState.ENDED) {
	            ytMarkAsWatched();
	        }
	    }
	};

	function ytMarkAsWatched(){
	    var $watchedForm = $('#' + g.options.markWatchedForm);
	    $.ajax({
	        url: $watchedForm.attr('action'),
	        type: 'PUT',
	        data: $watchedForm.serialize()
	    });
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = YT;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);
	var State = __webpack_require__(2);

	module.exports.player = function buildPlayer(containerId, videoImage, videoTitle, advertConfig, related, options) {
	    State.expect('jwplayer');

	    var jwplayer = __webpack_require__(17);
	    jwplayer.key = State.get('jwplayer').jwKey;

	    if (advertConfig) {
	      var baseUrl = window.location.protocol + '//5fd74.v.fwmrm.net/ad/g/1';

	      // Preroll ad slot
	      var advertising = {
	        client: 'vast',
	        schedule: {
	          'preRoll': {
	            offset: "pre",
	            tag: configToTag(baseUrl, advertConfig)
	          }
	        }
	      };

	      // Midroll ad slots
	      advertConfig.tpcl = 'MIDROLL';
	      for(var i = options.adFrequency; i <= options.epLength; i += options.adFrequency) {
	        advertConfig.pvrn = Math.floor(Math.random() * 1000000000);
	        advertConfig.tpos = i;
	        advertConfig.slid = 'mid-slot-'+(i / options.adFrequency);
	        advertising.schedule['adBreak'+(i / options.adFrequency)] = {
	          offset: i,
	          tag: configToTag(baseUrl, advertConfig)
	        };
	      }
	    }

	    var jwConfig = {
	      androidhls : true,
	      primary: 'html5',
	      image: videoImage,
	      title: videoTitle,
	      autostart: options.autoPlay,
	      advertising: advertising,
	      related : related,
	      width: '100%',
	      aspectratio: '16:9',
	      skin: {
	        name: "seven",
	        active: "#9e1d22"
	      },
	      displaytitle: false,
	      displaydescription: false,
	      sharing: options.sharing,
	      mediaid: options.slug,
	      ga: {
	        label: 'mediaid',
	        trackingobject: 'ga'
	      }
	    };

	    jwConfig.sources = options.sources;
	    jwConfig.file = options.file;
	    jwConfig.dash = options.dash;

	    if(options.menuText) {
	      jwConfig.abouttext = options.menuText;
	      jwConfig.aboutlink = options.menuLink;
	    }

	    var jw = jwplayer(containerId).setup(jwConfig);

	    if (options.preview && !options.sponsor) {
	        jw.onComplete(jwSponsorGateReplace);
	    } else {
	        jw.onComplete(jwMarkAsWatched);
	    }

	    function jwMarkAsWatched(){
	        var $watchedForm = $('#' + options.markWatchedForm);
	        if ($watchedForm.attr('data-guest') != 1) {
	            $.ajax({
	                url: window.location.origin + $watchedForm.attr('data-watched-link'),
	                type: 'PUT',
	                data: $watchedForm.serialize()
	            });
	        }
	    }

	    function jwSponsorGateReplace() {
	        $('.non-sponsor').removeClass('hidden');
	        $('#' + containerId).hide();
	    }

	    function configToTag(baseUrl, config) {
	      return baseUrl + '?' + Object.keys(config).map(function(key) {
	                return key + '=' + config[key];
	            }).join('&')
	    }
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = jwplayer;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);

	module.exports.attach = function attachModControls(form) {
	    $(form).find('.reaction').on('change', handleModChange);
	};

	function handleModChange(e) {
	    var $select = $(e.currentTarget);

	    var $form = $select.closest('form');
	    var $display = $form.siblings('.overall-mod');
	    var data = $form.serialize();
	    
	    $select.prop('disabled', true);

	    $.ajax({
	        url: $form.attr('action'),
	        type: $form.attr('method'),
	        data: data
	    })
	    .done(function modSuccess() {
	        var text = $display.data('reaction');
	        var value = parseInt($display.data('value'), 10) || 0;

	        if (!text) {
	            text = $select.val();
	        }

	        var newValue = parseInt($select.find('option:selected').data('value'), 10);

	        // Handle user switching mod
	        value = value + newValue - (parseInt($form.data('prev-value'), 10) || 0);

	        $display.text((value >= 0 ? '+' : '') + value + ' ' + text);
	        $display.data('value', value);

	        $form.data('prev-value', newValue);
	    })
	    .fail(function modError() {
	        return alert('An error occurred - please try again.');
	    })
	    .always(function modCleanup() {
	        $select.prop('disabled', false);
	    });
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);

	module.exports = {
		share: share
	};

	function share(hoverSelector, shareSelector) {
	    $(hoverSelector).hover(function() {
	            $(this).children("ul").stop(true,true).fadeIn(400);
	        }, function(){
	            $(this).children("ul").fadeOut(400);
	        }).click(function(event) {
	            event.preventDefault();
	        });
	    $(shareSelector).click(function(event) {
	        event.preventDefault();
	        window.open($(this).attr('href'), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	    });
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);

	var g = {
	    commentBox: null
	};

	module.exports.attach = function attachForumControls(selector) {
	    g.commentBox = $(selector).find('.redactor');

	    $(selector).on('click', '.post-reply', handlePostReply)
	        .on('click', '.post-quote', handlePostQuote);
	};

	function handlePostReply(e) {
	    var data = $(e.currentTarget).data();

	    var message = buildReplyString(data);

	    addMessageToCommentBox(message);

	    scrollToCommentBox();
	}

	function handlePostQuote(e) {
	    var data = $(e.currentTarget).data();

	    var post = $('#post-' + data.postid).siblings('.media-content').find('.post-body').html();

	    var message = buildReplyString(data) +
	        '<blockquote>' + post + '</blockquote>';

	    addMessageToCommentBox(message);

	    scrollToCommentBox();
	}

	function buildReplyString(data) {
	    // Posts are marked with 'post-#' as an id. This can be used as a link
	    // when we figure out how to link to a post on a different page.

	    return '<p><a href="' + data.postlink + '"><i>In reply to ' + data.user + '</i></a></p>';
	}

	function addMessageToCommentBox(message) {
	    var currentContent = g.commentBox.redactor('code.get');

	    g.commentBox.redactor('code.set', message + '<br>' + currentContent);
	}

	function scrollToCommentBox() {
	    var form = g.commentBox.closest('form');

	    var formTop = form.offset().top;
	    var formHeight = form.outerHeight();

	    var windowHeight = $(window).height();
	    var currentScroll = $(document).scrollTop();

	    var scrollToPos = null;

	    if (windowHeight + currentScroll < formTop + formHeight) {
	        // Scroll is above form
	        scrollToPos = formTop + formHeight - windowHeight;

	    } else if (currentScroll > formTop) {
	        // Scroll is below form
	        scrollToPos = formTop;
	    }

	    if (scrollToPos !== null) {
	        // Smooth scroll rather than quick jump. TODO: Add easing
	        $('html,body').animate({
	            scrollTop: scrollToPos
	        }, 650, 'easeInOutCubic');
	    }
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);

	module.exports.attach = function attachAjaxFormControls() {

	    // Capture all forms until we have something more elegant
	    // Attaching to document also captures any forms created after page load
	    $(document).on('submit', 'form', handleFormSubmit);
	};

	function handleFormSubmit(e) {
	    $(e.currentTarget)
	        .find(':submit').prop('disabled', true).end()
	        .find('input,textarea').prop('readonly', true);

	    // Unfortunately, redactor doesn't have a locked/read-only mode
	    // Hoping textarea readonly will be sufficient
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);

	module.exports.attach = function attachCommentControls(selector) {
	    $(document).on('submit', selector, handleCommentSubmit);
	};

	function handleCommentSubmit(e) {
	    // stop the form from submitting the normal way and refreshing the page
	    e.preventDefault();

	    var $form = $(e.currentTarget);

	    var formData = {};

	    // Capture all the inputs
	    $form.find('input,textarea').each(function(i, elem) {
	        var $elem = $(elem);

	        if ($elem.attr('name')) {
	            formData[$elem.attr('name')] = $elem.val();
	        }
	    });

	    // ensure they actually MADE a comment
	    if (formData['body'].length < 1) {
	        $form.find(':submit').prop('disabled', false).end()
	            .find('.redactor-editor').focus();
	        return false;
	    }

	    $.ajax({
	        method: $form.attr('method') || 'POST',
	        url: $form.attr('action'),
	        data: formData,
	        dataType: 'json',
	        encode: true
	    }).done(function handleCommentDone(data) {
	        if (data.success) {
	            if ($form.data('comment')) {
	                // Comment reply
	                $('#comment-' + $form.data('comment') + ' .comment-replies').append('<li>'+data.rendered+'</li>');
	                $form.addClass('hide');
	            } else {
	                // Top-level comment
	                $('#comments .comments-list').prepend('<li>'+data.rendered+'</li>');

	            }
	        } else {
	            window.alert(data.error);
	        }

	        // Unlock form elements
	        $form.find(':submit').prop('disabled', false).end()
	            .find('.redactor-editor').html('').end()
	            .find('input').prop('readonly', false).end()
	            .find('textarea').prop('readonly', false).val('');
	    });
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);
	var submit = __webpack_require__(24);

	module.exports = {
		attach: attach
	};

	function attach(form) {
		$(form).submit(function(e) {
			e.preventDefault();

			submit(form, function success(data) {
				if (data.success) {
					form.dataset.isActive = !form.dataset.isActive;
					var texts = form.dataset.texts.split(',');
					$(form).find(':submit').toggleClass(form.dataset.classes.replace(',',' '));
					$(form).find(':submit').html(form.dataset.isActive ? texts[1] : texts[0]);
				} else {
					alert('Something went wrong - please try again.');
				}
				$(form).find(':submit').attr('disabled', false);
			});
		});
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var $, defaultErrorCallback;

	$ = __webpack_require__(5);

	module.exports = function(form, success, error) {
	  var $form, data;
	  $form = $(form);
	  data = $form.serialize();
	  if (document.activeElement !== null) {
	    data += "&" + document.activeElement.name + "=" + document.activeElement.value;
	  }
	  return $.ajax({
	    url: $form.attr('action'),
	    type: $form.attr('method'),
	    data: data,
	    success: success,
	    error: error !== null ? error : defaultErrorCallback
	  });
	};

	defaultErrorCallback = function() {
	  return alert('An error occurred - please try again.');
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);

	module.exports.attach = function attachAjaxPagination(targetSelector) {

	    var pageControls = $('.controls');
	    var contentListBlock = $(targetSelector);

	    pageControls.on('click', 'li a', function(event){
	        event.preventDefault();

	        contentListBlock.fadeOut();
	        pageControls.html('<h3 class="loading-message">Loading...</h3>');
	        scrollToPaginatedResults();

	        var targetUrl = $(this).attr('href');
	        $.get(targetUrl, function(data){
	            var newContent = $(data).find(targetSelector + ' li');
	            var newPageControls = $(data).find('.controls');

	            pageControls.fadeOut();
	            contentListBlock.html(newContent);
	            pageControls.html(newPageControls.html());
	            contentListBlock.fadeIn();
	            pageControls.fadeIn();
	            if (history && history.pushState){
	                var stateObj = { item: "paginated-content" };
	                history.pushState(stateObj, "paginated content", targetUrl);
	            }

	        });
	    });

	    function scrollToPaginatedResults()
	    {
	        $('html, body').animate({
	            scrollTop: $("a[name=paginated-results]").offset().top - 40
	        }, 500);
	    }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(5);
	module.exports = {
	    attach: attach
	};

	function attach($form) {
	    var $fields = $form.find('[type=text][required]');
	    var $button = $form.find('.button[type=submit]');
	    for (var i = 0; i < $fields.length; i++) {
	        $($fields[i]).bind("change", function() {
	            var _disable = $fields.toArray().reduce(function(disabled, field) {
	                return disabled || $(field).val().length < 1 || null
	            }, null);
	            $button.attr('disabled', _disable)
	        });
	    }
	}



/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);

	module.exports = {
		attach: authenticate
	};

	function authenticate(target, appId) {
		var FB = __webpack_require__(28);

		$(target).click(function(event) {
			event.preventDefault();

			var _this = $(this);
			FB.login(function(response) {
				FB.api('/me', function(response) {
					if (response.id) {
						$('#oauth-uid').val(response.id);
						_this.closest('form').trigger('fb-auth-success');
					}
				});
			}, { auth_type: 'reauthenticate' });
		});
	}


/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = FB;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5)
		, State = __webpack_require__(2);

	module.exports = {
		run: run
	};

	function run(options) {
		var Stripe = __webpack_require__(30)
			, $finalForm = $('#final-form')
			, $registerForm = $('#register-form')
			, $paymentForm = $('#payment-form');

		if (options.type !== 'card-update') {
			// handle initial state (pre-clicked first option)
			$(document).ready(function() {
				if ($('.sponsor-form').is(':visible')) {
					$('.sponsor-form input[name="plan-selectors"]:first').trigger('click');
				}
			});

			Stripe.setPublishableKey(State.get('stripe').publicKey);

			// show the first workflow
			$('ol#sponsorship-steps').find('li').first().removeClass('hide');

			// handle registration form
			$registerForm.on('submit', function(evt) {
				evt.preventDefault();

				$.ajax({
					url: $registerForm.attr('action'),
					type: $registerForm.attr('method'),
					data: $registerForm.serialize(),
					context: this,
					success: function(response) {
						getInput('user_id', $finalForm).val(response.userId);
						$registerForm.find(':submit').addClass('hide');
						getInput('username', $registerForm).prop('disabled', true);
						getInput('email', $registerForm).prop('disabled', true);
						getInput('password', $registerForm).prop('disabled', true);
						getInput('password_confirmation', $registerForm).prop('disabled', true);
						$(this).trigger('finish_registration');
						$('#sponsor-details').removeClass('hide');
						$('.sponsor-form input[name="plan-selectors"]:first').trigger('click');
					},
					error: function(xhr, message, status) {
						showError($registerForm, xhr.responseJSON.message);
						$registerForm.children('input').prop('disabled', false).prop('readonly', false);
					}
				});
			});

			// handle sponsor form
			$('.sponsorship-plan').children('input').on('change', function() {
				getInput('plan', $finalForm).val(($(this).val()));
				if (options.type == 'gift') {
					$('#recipient-details').removeClass('hide');
				} else {
					$('#payment-details').removeClass('hide');
				}
			});

			$('input[name="recipient"]').on('input', function() {
				getInput('sponsorship_recipient', $finalForm).val(($(this).val()));
				$('#payment-details').removeClass('hide');
			});

			if ($('input[name="card-object"]').length) {
				$('div.payment-field').addClass('hide');
				$('div.payment-field').children('input').attr('disabled', true);
			}

			$('input[name="card-object"]').on('change', function() {
				if ($(this).val() != 'new-card') {
					$('div.payment-field').addClass('hide');
					$('div.payment-field').children('input').attr('disabled', true);
				} else {
					$('div.payment-field').children('input').removeAttr('disabled');
					$('div.payment-field').removeClass('hide');
				}
			});
		}

		// handle payment form
		$finalForm.find(':submit').on('click', function(evt) {
			evt.preventDefault();
			var submitBtn = $finalForm.find(':submit');
			submitBtn.prop('disabled', true).text('Working...');

			if (!$('input[name="card-object"]').val() || $('input[name="card-object"]:checked').val() == 'new-card') {
				Stripe.card.createToken({
					number: getCardInput('number').val(),
					cvc: getCardInput('cvc').val(),
					exp_month: getCardInput('expiry-month').val(),
					exp_year: getCardInput('expiry-year').val(),
					address_zip: getCardInput('zip').val()
				}, function(status, response) {
					if (status === 200) {
						$finalForm.trigger('finish_payment');
						if (options.type == 'gift') {
							getInput('sponsorship_recipient', $finalForm).val($('input[name="recipient"]').val());
							getInput('plan', $finalForm).val(($('input[name="plan-selectors"]:checked').val()));
							getInput('anonymous', $finalForm).val(($('input[name="anonymous-gift"]:checked').val()));
						}
						getInput('stripe_token', $finalForm).val(response.id);
						$finalForm.submit();
					} else {
						showError($paymentForm, response.error.message);
						if (options.type == 'update-card') {
							submitBtn.prop('disabled', false).text('Update Card');
						} else {
							submitBtn.prop('disabled', false).text(options.type == 'gift' ? 'Gift Sponsorship' : 'Become a Sponsor');
						}
					}
				});
			} else {
				$finalForm.trigger('existing_card');
				if (options.type == 'gift') {
					getInput('sponsorship_recipient', $finalForm).val($('input[name="recipient"]').val());
					getInput('plan', $finalForm).val(($('input[name="plan-selectors"]:checked').val()));
					getInput('anonymous', $finalForm).val(($('input[name="anonymous-gift"]:checked').val()));
				}
				$('input[name="stripe_token"]').val($('input[name="card-object"]:checked').val());
				$finalForm.submit();
			}
		});
	}

	function getCardInput(name) {
		return getInput('card-'+name);
	}

	function getInput(name, container) {
		return $('input[name="'+name+'"]', container);
	}

	function showError($form, message) {
		$form.find('p.error').html(message);
	}


/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = Stripe;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);
	var State = __webpack_require__(2);

	module.exports.attach = function attachChat(options) {
	    State.expect('pusher');
	    State.expect('chatUser');

	    var Pusher = __webpack_require__(32);
	    var pusher = new Pusher(State.get('pusher').pusherKey, {
	        encrypted: true,
	        authEndpoint: '/chat/'+ options.channel +'/auth'
	    });

	    var user = State.get('chatUser');
	    var chatType = options.chatType ? options.chatType +'-' : '';
	    var channel = pusher.subscribe(chatType + options.channel);
	    var scrolled = false;
	    var submitting = false;

	    // Initial setup
	    $(document).ready(function () {
	        refresh_members(channel.members);
	        refresh_bans();
	    });

	    // Configure Redactor
	    $(function() {
	        if ($.fn.redactor) {

	            // Callbacks
	            var pasteCallback = function(html) {
	                var editedHtml = html;

	                if (/(&lt;iframe).*(&gt;)/g.test(html)) {
	                    editedHtml = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

	                    var iframes = editedHtml.match(/(<iframe)[^<]*(<\/iframe>)/g);
	                    for (var i = 0; i < iframes.length; i++) {
	                        var srcLayer = iframes[i].match(/src=('|")[^'|"]*('|")/g)[0];
	                        var src = srcLayer.split(/('|")/)[2];

	                        editedHtml = editedHtml.replace(iframes[i], src + "\n");
	                    }
	                }

	                return editedHtml;
	            };

	            var linkifyCallback = function(elements)
	            {
	                $.each(elements, function(i,s)
	                {
	                    switch(s.nodeName) {
	                        case 'IFRAME':
	                            $(s).wrap("<p class='embed-responsive embed-responsive-16by9'></p>'");
	                            break;
	                        case 'IMG':
	                            $(s).wrap("<p class='embed-image-wrapper'></p>'");
	                            break;

	                    }
	                });
	            };

	            var enterCallback = function(e)
	            {
	                if (e.which == this.keyCode.ENTER) {
	                    $('form.chat-message').submit();
	                    $('form.chat-message div.redactor-editor').empty();
	                    return false;
	                }
	            };

	            // Custom Buttons
	            $.Redactor.prototype.spoiler = function() {
	                return {
	                    init: function() {
	                        var button = this.button.add('spoiler', 'Spoiler');
	                        this.button.addCallback(button, this.spoiler.spoilerButton);

	                        // Newest version of Redactor allows for setting a generic icon class, but setting with the
	                        // setAwesome (for FontAwesome) works for now.
	                        this.button.setAwesome('spoiler', 'ion-eye-disabled"');
	                    },
	                    spoilerButton: function() {
	                        this.inline.format('span', 'class', 'spoiler');
	                    }
	                };
	            };

	            var config = {
	                tabKey: false,
	                preSpaces: false,
	                enterKey: false,
	                pasteCallback: pasteCallback,
	                keyupCallback: enterCallback,
	                linkifyCallback: linkifyCallback,
	                plugins: ['spoiler']
	            };

	            if (!user.mod) {
	                config.buttons = ['bold', 'italic', 'image', 'link'];
	                config.convertVideoLinks = false;
	            } else {
	                config.buttons = ['html', 'formatting', 'bold', 'italic', 'deleted', 'image', 'link'];
	            }

	            return $('textarea[name="chat-message"]').redactor(config);
	        }
	    });

	    // Fix for IE
	    if (!window.location.origin) {
	        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	    }

	    // AJAX
	    $('.chat-message').submit(function(e) {
	        e.preventDefault();

	        if (submitting === true) {
	            return false;
	        } else {
	            submitting = true;

	            $.ajax({
	                type: "POST",
	                url: $(this).attr('action'),
	                dataType: "json",
	                data: {
	                    "message": $('textarea[name="chat-message"]').val(),
	                    "_token": $('input[name=_token]').val()
	                },
	                success: function() {
	                    submitting = false;
	                },
	                error: function(response) {
	                    if (JSON.parse(response.responseText).message == 'banned') {
	                        window.location.reload();
	                    }
	                }
	            });

	            $('.chat-body').animate({ scrollTop: 0 });
	            scrolled = false;
	        }
	    });

	    $('.chat-body').on('click', '.reply', function(e) {
	        e.preventDefault();

	        $('form.chat-message div.redactor-editor').removeClass('redactor-placeholder').focus().html('<p>@'+ $(this).attr('username') +'&nbsp;</p>');
	        $('textarea[name="chat-message"]').redactor('caret.setEnd', $('form.chat-message div.redactor-editor p'));
	    });

	    $('.chat-body').on('click', '.delete-message', function(e) {
	        e.preventDefault();

	        submitCallback($(this), {}, {"confirm": true}, null, function(msg) {
	            console.log(msg);
	        });
	    });

	    $('.chat-body').on('click', '.kick-user', function(e) {
	        e.preventDefault();

	        submitCallback($(this), {
	            "username": $('form[name='+ $(this).attr('form') +']').children('input[name=username]').val()
	        }, {"confirm": true}, null, function(msg) {
	            console.log(msg);
	        });
	    });

	    $('.chat-body').on('click', '.ban-user', function(e) {
	        e.preventDefault();

	        submitCallback($(this), {
	            "username": $('form[name='+ $(this).attr('form') +']').children('input[name=username]').val()
	        }, {"confirm": true}, null, function(msg) {
	            console.log(msg);
	        });
	    });

	    $('.banned-users').on('click', '.unban-user', function(e) {
	        e.preventDefault();

	        submitCallback($(this), {
	            "username": $('form[name='+ $(this).attr('form') +']').children('input[name=username]').val()
	        }, {"confirm": true}, null, function(msg) {
	            console.log(msg);
	        });
	    });

	    $('.admin-embed').submit(function(e) {
	        e.preventDefault();

	        submitCallback($(this), {
	            "html": $('input[name=admin-embed]').val()
	        }, {}, function() {
	            $('.admin-embed').children('input').removeAttr('readonly').removeAttr('disabled');
	        }, function(msg) {
	            console.log(msg);
	        });
	    });

	    $('.admin-toggle-moderator').submit(function(e) {
	        e.preventDefault();

	        submitCallback($(this), {
	            "username": $('input[name=admin-toggle-moderator]').val()
	        }, {}, function() {
	            $('.admin-toggle-moderator').children('input').removeAttr('readonly').removeAttr('disabled');
	            $('input[name=admin-toggle-moderator]').val('');
	        }, function(msg) {
	            console.log(msg);
	        });
	    });

	    // Events
	    $('.chat-body').scroll(function() {
	        if ($(this).scrollTop() > $(this).find('> :first-child').height()) {
	            scrolled = true;
	        } else {
	            scrolled = false;
	            $('.more-messages').hide();
	        }
	    });

	    channel.bind('new-message', function(data) {
	        var pattern = new RegExp("@"+user.username, 'ig');
	        var baseMessage = '<div class="chat-sent-message '+ (data.body.match(pattern) ? 'mentioned ' : '') + (data.mod ? 'admin ' : '') + data.userId +'" id="msg-'+ data.messageId +'" style="display: none;">\n\t<div class="image-container">\n\t\t<a href="'+ data.userProfile +'" target="_blank"><img src="'+ data.userAvatar +'" align="left" class="chat-avatar"></a>\n\t</div>\n\t<div class="chat-content">\n\t\t<strong class="chat-username">\n\t\t\t<a href="'+ data.userProfile +'" '+ (data.mod ? 'style="color: #5d1618" ' : '') +'target="_blank">'+ data.username +'</a>'+ (data.sponsor ? '\n\t\t\t<i class="icon ion-star"></i>' : '') +'\n\t\t</strong>\n\t\t<p>'+ data.body +'</p><br>';

	        if (user.mod) {
	            if (data.mod) {
	                $('.chat-body').prepend(baseMessage + '<span class="post-stamp"><span data-livestamp="'+ data.createdAt +'">a few seconds ago</span> | <a href="#" class="reply" username="'+ data.username +'">Reply</a> | <a href="#" class="delete-message" form="msg-'+ data.messageId +'-delete">DELETE</a><form method="POST" action="'+ window.location.origin +'/chat/'+ options.channel +'/chat-message/'+ data.messageId +'" accept-charset="UTF-8" class="delete-message-form" name="msg-'+ data.messageId +'-delete"><input name="_method" type="hidden" value="DELETE"><input name="_token" type="hidden" value="'+ $('input[name="_token"]').val() +'"></form></span></div></div>');
	            } else {
	                $('.chat-body').prepend(baseMessage + '<span class="post-stamp"><span data-livestamp="'+ data.createdAt +'">a few seconds ago</span> | <a href="#" class="reply" username="'+ data.username +'">Reply</a> | <a href="#" class="delete-message" form="msg-'+ data.messageId +'-delete">DELETE</a><form method="POST" action="'+ window.location.origin +'/chat/'+ options.channel +'/chat-message/'+ data.messageId +'" accept-charset="UTF-8" class="delete-message-form" name="msg-'+ data.messageId +'-delete"><input name="_method" type="hidden" value="DELETE"><input name="_token" type="hidden" value="'+ $('input[name="_token"]').val() +'"></form> | <a href="#" class="kick-user" form="user-'+ data.userId +'-kick-'+ data.messageId +'">KICK</a><form method="POST" action="'+ window.location.origin +'/chat/'+ options.channel +'/kick" accept-charset="UTF-8" class="kick-user-form" name="user-'+ data.userId +'-kick-'+ data.messageId +'"><input name="_token" type="hidden" value="'+ $('input[name="_token"]').val() +'"><input name="username" type="hidden" value="'+ data.username +'"></form> | <a href="#" class="ban-user" form="user-'+ data.userId +'-ban-'+ data.messageId +'">BAN</a><form method="POST" action="'+ window.location.origin +'/chat/'+ options.channel +'/ban" accept-charset="UTF-8" class="ban-user-form" name="user-'+ data.userId +'-ban-'+ data.messageId +'"><input name="_token" type="hidden" value="'+ $('input[name="_token"]').val() +'"><input name="username" type="hidden" value="'+ data.username +'"></form></span></div></div>');
	            }
	        } else {
	            $('.chat-body').prepend(baseMessage + '<span class="post-stamp"><span data-livestamp="'+ data.createdAt +'">a few seconds ago</span> | <a href="#" class="reply" username="'+ data.username +'">Reply</a></div></div>');
	        }
	        $('div#msg-'+ data.messageId).show(0, function() {
	            if ($('#messageAlert').is(':checked') || ($('#mentionAlert').is(':checked') && data.body.match(pattern))) {
	                $('#chat-chime')[0].play();
	            }
	        });

	        if ($('.chat-body').children('.chat-sent-message').length > 300) {
	            $('.chat-body').children('.chat-sent-message').slice(300).remove();
	        }

	        if (scrolled) {
	            $('.chat-body').scrollTop($('.chat-body').scrollTop() + $('.chat-body > :first-child').height() + 1);
	            $('.more-messages').show();
	        }
	    });

	    channel.bind('deleted-message', function(data) {
	        $('.chat-body').children('#msg-'+ data.messageId).remove();
	    });

	    channel.bind('embed', function(data) {
	        $.ajax({
	            type: "GET",
	            url: "/chat/"+ options.channel +"/embed",
	            success: function(response) {
	                $('.chat-embed').html(response.output);
	                $('input[name=admin-embed]').val(response.output);
	            },
	            error: function(msg) {
	                console.log(msg);
	            }
	        });
	    });

	    channel.bind('client-mod-toggle', function(member) {
	        remove_member(member.id);
	        add_member(member.id, member.info);
	        if (member.id == user.id) {
	            window.location.reload();
	        }
	    });

	    channel.bind('client-kick', function(member) {
	        remove_member(member.id);
	        refresh_bans();
	        if (member.id == user.id) {
	            window.location.reload();
	        }
	    });

	    channel.bind('client-ban', function(member) {
	        remove_member(member.id);
	        refresh_bans();
	        $('.chat-body').children('.'+ member.id).remove();
	        if (member.id == user.id) {
	            window.location.reload();
	        }
	    });

	    channel.bind('client-unban', function(member) {
	        refresh_bans();
	    });

	    channel.bind('pusher:subscription_succeeded', function(members) {
	        refresh_members(members);
	        refresh_bans();
	    });

	    channel.bind('pusher:member_added', function(member) {
	        refresh_members(channel.members);
	    });

	    channel.bind('pusher:member_removed', function(member) {
	        refresh_members(channel.members);
	    });

	    // Helpers
	     function submitCallback(context, data, options, success, error) {
	        data._token = $('input[name="_token"]').val();
	        var confirmed = options.confirm ? confirm("Are you sure?") : true;

	        if (confirmed) {
	            $.ajax({
	                type: $('form[name='+ context.attr('form') +']').children('input[name="_method"]').val() || context.children('input[name="_method"]').val() || 'POST',
	                url: $('form[name='+ context.attr('form') +']').attr('action') || context.attr('action'),
	                dataType: "json",
	                data: data,
	                success: success,
	                error: error
	            });
	        }
	    };
	    var refresh_members = function(members) {
	        $('.chat-members ul').empty();
	        members.each(function(member) {
	            add_member(member.id, member.info);
	        });
	    };
	    var refresh_bans = function() {
	        if (user.mod) {
	            $.ajax({
	                type: "GET",
	                url: "/chat/"+ options.channel +"/bans",
	                success: function(response) {
	                    if (response.output != null) {
	                        $('.banned-users').html('<h4>Banned Users</h4><ul class="media-list-sm">'+response.output+'</ul>');
	                    } else {
	                        $('.banned-users').html('<p>There are no banned users for this channel.</p>');
	                    }
	                },
	                error: function(msg) {
	                    console.log(msg);
	                }
	            });
	        }
	    };
	    var add_member = function(memberId, memberInfo) {
	        if (!$('.chat-members ul').children('li.user-'+ memberId).length) {
	            if (memberInfo.mod) {
	                $('.chat-members ul.mods').prepend('<li id="user-'+ memberId +'"><a href="'+ memberInfo.profileLink +'" target="_blank"><div class="block-container"><div class="image-container"><img src="'+ memberInfo.avatar +'" align="left" class="chat-avatar" /></div><strong'+ (memberInfo.mod ? ' style="color: #5d1618"' : '') +'>'+ memberInfo.username + (memberInfo.mod ? '' : '<a href="#"') +'</strong></a></div></li>');
	            } else {
	                $('.chat-members ul.users').prepend('<li id="user-'+ memberId +'"><a href="'+ memberInfo.profileLink +'" target="_blank"><div class="block-container"><div class="image-container"><img src="'+ memberInfo.avatar +'" align="left" class="chat-avatar" /></div><strong'+ (memberInfo.mod ? ' style="color: #5d1618"' : '') +'>'+ memberInfo.username + (memberInfo.mod ? '' : '<a href="#"') +'</strong></a></div></li>');
	            }
	        }
	        $('.chat-members h4').html("Users in the chat room ("+ channel.members.count +")");
	    };
	    var remove_member = function(memberId) {
	        $('.chat-members ul').children('li#user-'+memberId).remove();
	        $('.chat-members h4').html("Users in the chat room ("+ channel.members.count +")");
	    };
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = Pusher;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);

	module.exports = {
	    run: run
	};

	function run() {
	    var $form = $('#dismiss-notifications');
	    $form.on('submit', function(event){
	        event.preventDefault();
	        $.ajax({
	            method: 'POST',
	            url: $form.attr('action'),
	            data: $form.serializeArray(),
	            dataType: 'json',
	            encode: true
	        }).done(function(data){
	            var $menu = $('#notification-menu').find('ul');
	            $menu.find('li').hide();
	            $menu.find('form').hide();
	            $menu.append('<li><a href="'+ $form.attr('data-link') +'">View Dismissed Notifications</a></li>');
	            $('#notification-count-toggle').toggleClass('open');
	            $('#notification-menu').toggleClass('visible');
	            $('.notification-count').removeClass('active').text('0');
	        });
	    });
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5), 
	  mergeOptions = __webpack_require__(35);

	exports.datepicker = function(element, options) {
		if ($.fn.datetimepicker) {
			return $(element).datetimepicker(mergeOptions(options, { pickTime: false }));
		} else {
			console.error('You need to add datetime-picker to the markup.');
			return null;
		}
	};

	exports.datetimepicker = function(element, options) {
		return exports.datepicker(element, { pickTime: true });
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);

	module.exports = function(options, defaults) {
	  if (typeof options === 'object') {
	    return $.extend(defaults, options);
	  } else {
	    return defaults;
	  }
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);

	module.exports = function(element, fullAccess) {
	    $(function() {
	        if ($.fn.redactor) {

	            // Callbacks
	            var linkify = function(elements) {
	                var _this = this;
	                $.each(elements, function(i,s)
	                {
	                    if (s.nodeName == 'IFRAME') {
	                        $(s).wrap("<p class='embed-responsive embed-responsive-16by9'></p>'");
	                    }
	                });
	            };

	            var paste = function(html) {
	                var patterns = [
	                    '(\\w+\.)?youtube\.com\/embed\/',
	                    'player\.vimeo\.com\/embed\/',
	                    '(\\w+\.){0,3}roosterteeth\.com(\:\\d+)?\/episode\/'
	                ];
	                var pattern = new RegExp("(http\:|https\:)?\/\/("+ patterns.join('|') +")[\\w\-]+", "g");
	                if (pattern.test(html)) {
	                    var match = html.match(pattern)[0];
	                    var splitMatch = match.split('/');

	                    if (/youtube/.test(splitMatch)) {
	                        return "<p class=\"embed-responsive embed-responsive-16by9\">https://www.youtube.com/watch?"+ splitMatch[splitMatch.length - 1] +"</p>";
	                    } else if (/vimeo/.test(splitMatch)) {
	                        return "<p class=\"embed-responsive embed-responsive-16by9\">https://vimeo.com/"+ splitMatch[splitMatch.length - 1] +"</p>";
	                    } else if (/roosterteeth\.com/.test(splitMatch)) {
	                        return "<p class=\"embed-responsive embed-responsive-16by9\"><iframe src=\""+ (splitMatch[splitMatch.length - 1] == 'embed' ? match : match +'/embed') +"\"></iframe></p>";
	                    }
	                } else {
	                    return html;
	                }
	            };

	            // Custom Buttons
	            $.Redactor.prototype.spoiler = function() {
	                return {
	                    init: function() {
	                        var button = this.button.add('spoiler', 'Spoiler');
	                        this.button.addCallback(button, this.spoiler.spoilerButton);

	                        // Newest version of Redactor allows for setting a generic icon class, but setting with the
	                        // setAwesome (for FontAwesome) works for now.
	                        this.button.setAwesome('spoiler', 'ion-eye-disabled"');
	                    },
	                    spoilerButton: function() {
	                        this.inline.format('span', 'class', 'spoiler');
	                    }
	                };
	            };

	            var config = {
	                tabKey: false,
	                preSpaces: false,
	                linkifyCallback: linkify,
	                pasteCallback: paste,
	                plugins: ['spoiler']
	            };

	            if (!fullAccess) {
	                config.buttons = ['formatting', 'bold', 'italic', 'deleted', 'unorderedlist', 'orderedlist', 'outdent', 'indent', 'image', 'link'];
	            }

	            return $(element).redactor(config);
	        }
	        else {
	            console.error('You need to add redactor to the markup.');
	            return null;
	        }
	    });
	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = {
	    enable: enable
	};

	function enable(hash) {
			prepareLightningJs();
	    window.usabilla_live = lightningjs.require("usabilla_live", "//w.usabilla.com/" + hash + ".js");
	}

	// all the embed stuff
	/* jshint ignore:start */
	function prepareLightningJs() {
		window.lightningjs || function(c) {
		    function g(b, d) {
		        d && (d += (/\?/.test(d) ? "&" : "?") + "lv=1");
		        c[b] || function() {
		            var i = window,
		                h = document,
		                j = b,
		                g = h.location.protocol,
		                l = "load",
		                k = 0;
		            (function() {
		                function b() {
		                    a.P(l);
		                    a.w = 1;
		                    c[j]("_load")
		                }
		                c[j] = function() {
		                    function m() {
		                        m.id = e;
		                        return c[j].apply(m, arguments)
		                    }
		                    var b, e = ++k;
		                    b = this && this != i ? this.id || 0 : 0;
		                    (a.s = a.s || []).push([e, b, arguments]);
		                    m.then = function(b, c, h) {
		                        var d = a.fh[e] = a.fh[e] || [],
		                            j = a.eh[e] = a.eh[e] || [],
		                            f = a.ph[e] = a.ph[e] || [];
		                        b && d.push(b);
		                        c && j.push(c);
		                        h && f.push(h);
		                        return m
		                    };
		                    return m
		                };
		                var a = c[j]._ = {};
		                a.fh = {};
		                a.eh = {};
		                a.ph = {};
		                a.l = d ? d.replace(/^\/\//, (g == "https:" ? g : "http:") + "//") : d;
		                a.p = {
		                    0: +new Date
		                };
		                a.P = function(b) {
		                    a.p[b] = new Date - a.p[0]
		                };
		                a.w && b();
		                i.addEventListener ? i.addEventListener(l, b, !1) : i.attachEvent("on" + l, b);
		                var q = function() {
		                    function b() {
		                        return ["<head></head><", c, ' onload="var d=', n, ";d.getElementsByTagName('head')[0].", d, "(d.", g, "('script')).", i, "='", a.l, "'\"></", c, ">"].join("")
		                    }
		                    var c = "body",
		                        e = h[c];
		                    if (!e) return setTimeout(q, 100);
		                    a.P(1);
		                    var d = "appendChild",
		                        g = "createElement",
		                        i = "src",
		                        k = h[g]("div"),
		                        l = k[d](h[g]("div")),
		                        f = h[g]("iframe"),
		                        n = "document",
		                        p;
		                    k.style.display = "none";
		                    e.insertBefore(k, e.firstChild).id = o + "-" + j;
		                    f.frameBorder = "0";
		                    f.id = o + "-frame-" + j;
		                    /MSIE[ ]+6/.test(navigator.userAgent) && (f[i] = "javascript:false");
		                    f.allowTransparency = "true";
		                    l[d](f);
		                    try {
		                        f.contentWindow[n].open()
		                    } catch (s) {
		                        a.domain = h.domain, p = "javascript:var d=" + n + ".open();d.domain='" + h.domain + "';", f[i] = p + "void(0);"
		                    }
		                    try {
		                        var r = f.contentWindow[n];
		                        r.write(b());
		                        r.close()
		                    } catch (t) {
		                        f[i] = p + 'd.write("' + b().replace(/"/g, String.fromCharCode(92) + '"') + '");d.close();'
		                    }
		                    a.P(2)
		                };
		                a.l && setTimeout(q, 0)
		            })()
		        }();
		        c[b].lv = "1";
		        return c[b]
		    }
		    var o = "lightningjs",
		        k = window[o] = g(o);
		    k.require = g;
		    k.modules = c
		}({});
	}
	/* jshint ignore:end */

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = {
	    umbel: umbel
	};

	var g = {
	    hasRun: false
	};

	function umbel(tag, value) {
	    if (!g.hasRun){
	        init();
	    }
	    _umbel.push({"type": "send", "name": tag, "value":value});
	}

	function init(){
	    window._umbel = window._umbel || [];
	    (function() {
	        var u = document.createElement('script');
	        u.type = 'text/javascript';
	        u.async = true;
	        u.src = document.location.protocol + '//tags.api.umbel.com/gnxtlkugeaszqppm/w.js?d=' + new Date().getMonth() + '-' + new Date().getDate();
	        var s = document.getElementsByTagName('script')[0];
	        s.parentNode.insertBefore(u, s);
	        g.hasRun = true;
	    })();
	}


/***/ }
/******/ ]);
