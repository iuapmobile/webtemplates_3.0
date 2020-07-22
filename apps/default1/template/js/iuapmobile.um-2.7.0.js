var eventType;
if("onmousedown" in document) {
  eventType = ["mousedown","click"];
}else if("ontouchend" in document) {
 eventType = ["touchstart","touchend"];
}
var UM = {};
var getUid = function(){
	return "page"+(new Date()).getTime();
};
$(function() {
	// 远程调试 
	/*(function(e) {
		e.setAttribute("src", "http://10.2.112.94:8080/target/target-script-min.js#anonymous");
		document.getElementsByTagName("body")[0].appendChild(e);
	})(document.createElement("script"));
	document.body.addEventListener('touchstart', function() {});*/
	$(document).on("click",".um-list-left-icon",function(e){
		e.stopPropagation();
	});
	$(document).on("touchmove",".overlay",function(e){
		e.preventDefault();
		return false;
	});
});
window.addEventListener('load', function(){
   setTimeout(function(){ window.scrollTo(0, 1); }, 20);
});/* 折叠菜单 */
+function ($) {
    'use strict';
    $(function(){
        var openBtn = '.collapse-btn';
        var collapse = function (e) {
          var openList;
          var targetName = $(this).data("target");
          openList = targetName ? $("#" + targetName):$(this).siblings(".collapse-content");
          if(openList.is(":visible")) {
            openList.slideUp("fast");
            openList.parent().removeClass("um-open");
            openList.trigger("collapse.close");
          }else {
            openList.slideDown("fast");
            openList.parent().addClass("um-open");
            openList.trigger("collapse.open");
          }
          e.preventDefault();
        };
        $(document).on(eventType[0],openBtn,collapse);
    })
}(jQuery);/* 模态框 */
+ function($) {
  'use strict';
  $(function() {
    function _UModal() {
      var title = window.location.host || "";
      this.countWindow = 0;
      this.defaultOptions = {
        title: title,
        text: "觉得咋样？",
        btnText: ["确定", "取消"],
        cancle: function() {},
        ok: function(data) {}
      };
    }

    _UModal.prototype.modal = function(type, options) {
      var that = this;
      that.countWindow++;
      var overlay = $('<div class="overlay"></div>');
      var _opt = $.extend(that.defaultOptions);

      if (!!options) {
        _opt = $.extend(_opt, options);
      }

      var isStr = options.constructor === String,
        isTips = type === "tips";

      var html;
      if (isStr) {
        html = '<div class="um-modal"><div class="um-modal-content"><div class="um-modal-text">' +
          options + '</div>';
      } else {
        html = '<div class="um-modal"><div class="um-modal-content"><div class="um-modal-title">' +
          _opt.title + '</div><div class="um-modal-text">' +
          _opt.text + '</div>';
      }

      if (type === "prompt") {
        html += '<div class="um-modal-input"><input type="text" class="form-control"></div>';
      }
      if (type === "login") {
        html += '<div class="um-modal-input"><input type="text" class="form-control"><input type="text" class="form-control"></div>';
      }

      isTips ? html += '</div>' : html += '</div><div class="um-modal-btns">';

      if (type === "confirm" || type === "login") {
        html += '<a href="#" class="btn cancle">' + _opt.btnText[1] + '</a>';
      }

      if (isTips) {
        html += '</div>';
      } else {
        html += '<a href="#" class="btn ok">' + _opt.btnText[0] +
          '</a></div></div>';
      }

      if (type === "loading") {
        html = '<div class="um-modal" style="overflow:visible;"><div class="loading"><div></div><div></div></div></div>';
      }

      overlay = overlay.appendTo($('body'));
      var modal = $(html).appendTo($('body')),
        modalH = modal.outerHeight(),
        wh = window.innerHeight;
      modal.css('top', (wh - modalH - 20) / 2);
      setTimeout(function() {
        modal.addClass('um-modal-in');
      }, 0);
      that.destory = destory;
      if (type === 'tips' || type === 'loading') {
        var delay = arguments[2] || 500, callback;
          if (typeof arguments[3] == 'function') callback = arguments[3];
          setTimeout(function() {
            that.destory();
            callback && callback();
          }, delay);
        return;
      }
      modal.on(eventType[1], '.btn', function(e) {
        e.preventDefault();
        if ($(this).hasClass('cancle')) {
          _opt.cancle();
        }
        if ($(this).hasClass('ok')) {
          var input = modal.find('.form-control'),
            inputLen = input.length,
            data;
          if (inputLen) {
            if (inputLen == 1) data = modal.find('.form-control').val();
            else {
              data = [];
              $.each(input, function() {
                data.push(this.value);
              });
            }
          }
          _opt.ok(data);
        }
        destory();
      });

      function destory() {
        modal.removeClass('um-modal-in').addClass('um-modal-out');
        modal.on('webkitTransitionEnd transitionEnd', function() {
            modal.off('webkitTransitionEnd transitionEnd');
            modal.removeClass('um-modal-out');
            modal.remove();
            that.countWindow--;
          });
          // 避免遮罩闪烁
        if (that.countWindow > 0) {
          overlay.remove();
        }
      }
    };
    _UModal.prototype.alert = function(options) {
      this.modal("alert", options || this.defaultOptions);
      return this;
    };
    _UModal.prototype.tips = function(options, delay, callback) {
      this.modal("tips", options || this.defaultOptions, delay, callback);
      return this;
    };
    _UModal.prototype.confirm = function(options) {
      this.modal("confirm", options || this.defaultOptions);
      return this;
    };
    _UModal.prototype.prompt = function(options) {
      this.modal("prompt", options || this.defaultOptions);
      return this;
    };
    _UModal.prototype.loading = function(options, delay, callback) {
      this.modal("loading", options || this.defaultOptions, delay, callback);
      return this;
    };
    _UModal.prototype.login = function(options) {
      this.modal("login", options || this.defaultOptions);
      return this;
    };
    window.UModal = new _UModal();
  });
}(jQuery);function Progress(options) {
	var defaults = {
		start:0,// 起点
		end:100,// 终点
		duration: 10, // 进度时间秒数
		delay:0, // 完成后回调执行和重置的延迟时间
		bgcolors: ["progress-bar-success", "progress-bar-info", "progress-bar-warning", "progress-bar-danger"],
		barElement: ".progress-bar",// 进度条动画元素
		step:function(ele, progress, restime){
			ele.html(restime + "秒");
			console.log(progress)
		},// progress 0-100  restime剩余时间
		callback: function(ele){}
	}
	this.aniId = null;
	this.settings = $.extend(defaults, options);
	var progressbar = $(this.settings.barElement);
	progressbar.data({
		"originClass": progressbar.attr("class")//,
		//"originWidth": progressbar.width() 第一个总有bug
	});
	// console.log(progressbar,progressbar.width())
	this.progressbar = progressbar;
}
Progress.prototype = {
	constructor: Progress,
	start: function(){
		this.reset();
		var _this = this,
		    settings = _this.settings,
		    $ele = _this.progressbar,
    	    progress = settings.start,
    	    restTime,
    	    bgcolors = settings.bgcolors,
    	    time = settings.duration,
    	    every_step = +(0.0185 / time) * (settings.end - settings.start).toPrecision(3),
    		color_len = bgcolors.length;
    		_this.progressbar.css({transition:"none"});
    	function _step() {
    	  progress += every_step;
    	  $ele.width(progress.toPrecision(5) + "%");
    	  restTime = Math.floor(time - time * (progress - settings.start) / (settings.end - settings.start));
    	  _this.progressbar.addClass(bgcolors[parseInt(progress / (100 / color_len))]);
    	  if (progress <= settings.end) {
    	    _this.aniId = setTimeout(_step, 18);
    	    var _progress = progress.toPrecision(3);
    	    settings.step.call(null, $ele, _progress, restTime);
    	  } else {
    	  	settings.step.call(null, $ele, 100, 0);
    	    clearTimeout(_this.aniId);
    	    if(settings.delay) {
				setTimeout(function(){
    	      		_this.reset();
    	      		settings.callback($ele);
    	    	},settings.delay);
    	    }else {
    	    	_this.reset();
    	    	settings.callback($ele);
    	    } 
    	  }
    	}
    	_step();
	},
	stop: function(){
		clearTimeout(this.aniId);
	},
	reset: function(){
		clearTimeout(this.aniId);
		var progressbar = this.progressbar;
		progressbar.css({
			transition:"",
			width:0
			//,
			//width:100 * progressbar.data("originWidth") / progressbar.parent().width() + "%"
		}).attr("class", progressbar.data("originClass"));
		console.log(progressbar.data("originClass"))
	}
}
UM.progress = function(options) {
	return new Progress(options);
}/*
 * Swipe 2.0
 *
 * Brad Birdsall
 * Copyright 2013, MIT License
 *
*/

function Swipe(container, options) {

  "use strict";

  // utilities
  var noop = function() {}; // simple no operation function
  var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // offload a functions execution

  // check browser capabilities
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    transitions: (function(temp) {
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
      for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
      return false;
    })(document.createElement('swipe'))
  };

  // quit if no root element
  if (!container) return;
  var element = container.children[0];
  var slides, slidePos, width, length;
  options = options || {};
  var index = parseInt(options.startSlide, 10) || 0;
  var speed = options.speed || 300;
  options.continuous = options.continuous !== undefined ? options.continuous : true;

  function setup() {

    // cache slides
    slides = element.children;
    length = slides.length;

    // set continuous to false if only one slide
    if (slides.length < 2) options.continuous = false;

    //special case if two slides
    if (browser.transitions && options.continuous && slides.length < 3) {
      element.appendChild(slides[0].cloneNode(true));
      element.appendChild(element.children[1].cloneNode(true));
      slides = element.children;
    }

    // create an array to store current positions of each slide
    slidePos = new Array(slides.length);

    // determine width of each slide
    width = container.getBoundingClientRect().width || container.offsetWidth;

    element.style.width = (slides.length * width) + 'px';

    // stack elements
    var pos = slides.length;
    while(pos--) {

      var slide = slides[pos];

      slide.style.width = width + 'px';
      slide.setAttribute('data-index', pos);

      if (browser.transitions) {
        slide.style.left = (pos * -width) + 'px';
        move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
      }

    }

    // reposition elements before and after index
    if (options.continuous && browser.transitions) {
      move(circle(index-1), -width, 0);
      move(circle(index+1), width, 0);
    }

    if (!browser.transitions) element.style.left = (index * -width) + 'px';

    container.style.visibility = 'visible';

  }

  function prev() {

    if (options.continuous) slide(index-1);
    else if (index) slide(index-1);

  }

  function next() {

    if (options.continuous) slide(index+1);
    else if (index < slides.length - 1) slide(index+1);

  }

  function circle(index) {

    // a simple positive modulo using slides.length
    return (slides.length + (index % slides.length)) % slides.length;

  }

  function slide(to, slideSpeed) {

    // do nothing if already on requested slide
    if (index == to) return;

    if (browser.transitions) {

      var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward

      // get the actual position of the slide
      if (options.continuous) {
        var natural_direction = direction;
        direction = -slidePos[circle(to)] / width;

        // if going forward but to < index, use to = slides.length + to
        // if going backward but to > index, use to = -slides.length + to
        if (direction !== natural_direction) to =  -direction * slides.length + to;

      }

      var diff = Math.abs(index-to) - 1;

      // move all the slides between index and to in the right direction
      while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);

      to = circle(to);

      move(index, width * direction, slideSpeed || speed);
      move(to, 0, slideSpeed || speed);

      if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place

    } else {

      to = circle(to);
      animate(index * -width, to * -width, slideSpeed || speed);
      //no fallback for a circular continuous if the browser does not accept transitions
    }

    index = to;
    offloadFn(options.callback && options.callback(index, slides[index]));
  }

  function move(index, dist, speed) {

    translate(index, dist, speed);
    slidePos[index] = dist;

  }

  function translate(index, dist, speed) {

    var slide = slides[index];
    var style = slide && slide.style;

    if (!style) return;

    style.webkitTransitionDuration =
    style.MozTransitionDuration =
    style.msTransitionDuration =
    style.OTransitionDuration =
    style.transitionDuration = speed + 'ms';

    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
    style.msTransform =
    style.MozTransform =
    style.OTransform = 'translateX(' + dist + 'px)';

  }

  function animate(from, to, speed) {

    // if not an animation, just reposition
    if (!speed) {

      element.style.left = to + 'px';
      return;

    }

    var start = +new Date;

    var timer = setInterval(function() {

      var timeElap = +new Date - start;

      if (timeElap > speed) {

        element.style.left = to + 'px';

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

        clearInterval(timer);
        return;

      }

      element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

    }, 4);

  }

  // setup auto slideshow
  var delay = options.auto || 0;
  var interval;

  function begin() {

    interval = setTimeout(next, delay);

  }

  function stop() {

    delay = 0;
    clearTimeout(interval);

  }


  // setup initial vars
  var start = {};
  var delta = {};
  var isScrolling;

  // setup event capturing
  var events = {

    handleEvent: function(event) {

      switch (event.type) {
        case 'touchstart': this.start(event); break;
        case 'touchmove': this.move(event); break;
        case 'touchend': offloadFn(this.end(event)); break;
        case 'webkitTransitionEnd':
        case 'msTransitionEnd':
        case 'oTransitionEnd':
        case 'otransitionend':
        case 'transitionend': offloadFn(this.transitionEnd(event)); break;
        case 'resize': offloadFn(setup); break;
      }

      if (options.stopPropagation) event.stopPropagation();

    },
    start: function(event) {

      var touches = event.touches[0];

      // measure start values
      start = {

        // get initial touch coords
        x: touches.pageX,
        y: touches.pageY,

        // store time to determine touch duration
        time: +new Date

      };

      // used for testing first move event
      isScrolling = undefined;

      // reset delta and end measurements
      delta = {};

      // attach touchmove and touchend listeners
      element.addEventListener('touchmove', this, false);
      element.addEventListener('touchend', this, false);

    },
    move: function(event) {

      // ensure swiping with one touch and not pinching
      if ( event.touches.length > 1 || event.scale && event.scale !== 1) return

      if (options.disableScroll) event.preventDefault();

      var touches = event.touches[0];

      // measure change in x and y
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      }

      // determine if scrolling test has run - one time test
      if ( typeof isScrolling == 'undefined') {
        isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
      }

      // if user is not trying to scroll vertically
      if (!isScrolling) {

        // prevent native scrolling
        event.preventDefault();

        // stop slideshow
        stop();

        // increase resistance if first or last slide
        if (options.continuous) { // we don't add resistance at the end

          translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);

        } else {

          delta.x =
            delta.x /
              ( (!index && delta.x > 0               // if first slide and sliding left
                || index == slides.length - 1        // or if last slide and sliding right
                && delta.x < 0                       // and if sliding at all
              ) ?
              ( Math.abs(delta.x) / width + 1 )      // determine resistance level
              : 1 );                                 // no resistance if false

          // translate 1:1
          translate(index-1, delta.x + slidePos[index-1], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(index+1, delta.x + slidePos[index+1], 0);
        }

      }

    },
    end: function(event) {

      // measure duration
      var duration = +new Date - start.time;

      // determine if slide attempt triggers next/prev slide
      var isValidSlide =
            Number(duration) < 250               // if slide duration is less than 250ms
            && Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
            || Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width

      // determine if slide attempt is past start and end
      var isPastBounds =
            !index && delta.x > 0                            // if first slide and slide amt is greater than 0
            || index == slides.length - 1 && delta.x < 0;    // or if last slide and slide amt is less than 0

      if (options.continuous) isPastBounds = false;

      // determine direction of swipe (true:right, false:left)
      var direction = delta.x < 0;

      // if not scrolling vertically
      if (!isScrolling) {

        if (isValidSlide && !isPastBounds) {

          if (direction) {

            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index-1), -width, 0);
              move(circle(index+2), width, 0);

            } else {
              move(index-1, -width, 0);
            }

            move(index, slidePos[index]-width, speed);
            move(circle(index+1), slidePos[circle(index+1)]-width, speed);
            index = circle(index+1);

          } else {
            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index+1), width, 0);
              move(circle(index-2), -width, 0);

            } else {
              move(index+1, width, 0);
            }

            move(index, slidePos[index]+width, speed);
            move(circle(index-1), slidePos[circle(index-1)]+width, speed);
            index = circle(index-1);

          }

          options.callback && options.callback(index, slides[index]);

        } else {

          if (options.continuous) {

            move(circle(index-1), -width, speed);
            move(index, 0, speed);
            move(circle(index+1), width, speed);

          } else {

            move(index-1, -width, speed);
            move(index, 0, speed);
            move(index+1, width, speed);
          }

        }

      }

      // kill touchmove and touchend event listeners until touchstart called again
      element.removeEventListener('touchmove', events, false)
      element.removeEventListener('touchend', events, false)

    },
    transitionEnd: function(event) {

      if (parseInt(event.target.getAttribute('data-index'), 10) == index) {

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

      }

    }

  }

  // trigger setup
  setup();

  // start auto slideshow if applicable
  if (delay) begin();


  // add event listeners
  if (browser.addEventListener) {

    // set touchstart event on element
    if (browser.touch) element.addEventListener('touchstart', events, false);

    if (browser.transitions) {
      element.addEventListener('webkitTransitionEnd', events, false);
      element.addEventListener('msTransitionEnd', events, false);
      element.addEventListener('oTransitionEnd', events, false);
      element.addEventListener('otransitionend', events, false);
      element.addEventListener('transitionend', events, false);
    }

    // set resize event on window
    window.addEventListener('resize', events, false);

  } else {

    window.onresize = function () { setup() }; // to play nice with old IE

  }

  // expose the Swipe API
  return {
    setup: function() {

      setup();

    },
    slide: function(to, speed) {

      // cancel slideshow
      stop();

      slide(to, speed);

    },
    prev: function() {

      // cancel slideshow
      stop();

      prev();

    },
    next: function() {

      // cancel slideshow
      stop();

      next();

    },
    stop: function() {

      // cancel slideshow
      stop();

    },
    getPos: function() {

      // return current index position
      return index;

    },
    getNumSlides: function() {

      // return total number of slides
      return length;
    },
    kill: function() {

      // cancel slideshow
      stop();

      // reset element
      element.style.width = '';
      element.style.left = '';

      // reset slides
      var pos = slides.length;
      while(pos--) {

        var slide = slides[pos];
        slide.style.width = '';
        slide.style.left = '';

        if (browser.transitions) translate(pos, 0, 0);

      }

      // removed event listeners
      if (browser.addEventListener) {

        // remove current event listeners
        element.removeEventListener('touchstart', events, false);
        element.removeEventListener('webkitTransitionEnd', events, false);
        element.removeEventListener('msTransitionEnd', events, false);
        element.removeEventListener('oTransitionEnd', events, false);
        element.removeEventListener('otransitionend', events, false);
        element.removeEventListener('transitionend', events, false);
        window.removeEventListener('resize', events, false);

      }
      else {

        window.onresize = null;

      }

    }
  }

}


if ( window.jQuery || window.Zepto ) {
  (function($) {
    $.fn.Swipe = function(params) {
      return this.each(function() {
        $(this).data('Swipe', new Swipe($(this)[0], params));
      });
    }
  })( window.jQuery || window.Zepto )
}
/* 页面切换动画 */
$(function() {
	var $pages = $('.um-page'),
		endCurrPage = false,
		endNextPage = false,
		isReverse = 0,
		animEndEventName = "webkitAnimationEnd",
		outClass = '',
		inClass = '',
		hasAjax = sessionStorage.hasAjax;
		if(hasAjax) {
			sessionStorage.clear();
		}
	var initActivePageId = sessionStorage.initActivePageId,
		hashArr = sessionStorage.hashArr,
		hashArr = hashArr && JSON.parse(hashArr) || [];

	function init() {
		$pages.each(function() {
			var $page = $(this);
			$page.data('originalClassList', $page.attr('class'));
		});
		var act = $(initActivePageId);
		if(act.length) {
			act.addClass('active');
		}else {
			sessionStorage.clear();
			$pages.eq(0).addClass('active');
		}
	}

	function enterPage(e) {
		e.preventDefault();
		var $this = $(this),
        target = $this.attr("href");
		if(target.indexOf("##")>=0) {
    	  return;
    }
    var $currPage = $this.closest(".um-page"),
    $nextPage;
		var currId = $currPage.attr("id");
		var link = $this.data("href");

		if(!currId) {
			console.log("请填写page id");
		}
		var isback = $this.hasClass("um-back") || $this.data("reverse");
		var dataTarget = $(this).data("target");
		try {
			if(isback) {
				_back();
			}else if ($(target).length && $(target).hasClass("um-page")) {
				$nextPage = $(target);
				if(currId === $nextPage[0].id) return;
				hashArr.push(currId);
				sessionStorage.initActivePageId = target;
			}else if(dataTarget){
				var $dataTarget = $("#"+dataTarget);
				var overlay =$('<div class="overlay"></div>');
				overlay.add($dataTarget.find(".btn")).on("click", function(){
					$dataTarget.removeClass("active");
					overlay.remove();
				});
				$dataTarget.addClass("active");
				$currPage.append(overlay);
			} else if(link) {
                var uid;
                $.get(link).done(function(html){
                    if(!html) return;
                    var html = $(html);
                    	uid = html[0].id ;
                    if(!uid) {
                        uid = getUid();
                        html.attr("id", uid);
                    }
                    $("body").append(html);
                    html.data("originalClassList", html.attr("class"))
                    $nextPage = $("#" + uid);
                    isReverse = isback?1:0;
                    var trans = $(this).data("transition") || "um";
                    var options = {
                        transition: trans,
                        isReverse: isReverse,
                        currPage: $currPage,
                        nextPage: $nextPage
                    };
                    UModal.loading("正在加载...",500,function(){
                        transFun(options);
                    })
                    hashArr.push($currPage[0].id);
                    //if($this.data("cache") == true) {
                        $this.attr("href","#" + uid).data("href","");
                        link = null;
                    //}
                    sessionStorage.hasAjax = 1;
                }).fail(function(){
                	console.log("链接错误...");
                });
			} else {
				return false;
			}
		} catch (e) {
			console.log(e);
		}
		function _back(){
			var len = hashArr.length, lastHash;
			if(len) {
				lastHash = hashArr[len - 1];
				sessionStorage.initActivePageId = "#" + lastHash;
				$nextPage = $("#" + lastHash);
				hashArr.pop();
			}
		}
		if(!$nextPage || !$currPage) return false;
		isReverse = isback?1:0;
		/*  f7 door slide  slideup  fade  slidefade  slideupfade  slide_ease  pop  
		slide_scale  scale_pop  scale_down_up  scale_slide  fall  rotate  push_left  
		push_top  turn  cube  cube_pop  cube_slide  cube_  flow */
		var trans = $(this).data("transition") || "um";
		var options = {
			transition: trans,
			isReverse: isReverse,
			currPage: $currPage,
			nextPage: $nextPage
		};
		transFun(options);
		if(hashArr.length) {
			sessionStorage.hashArr = JSON.stringify(hashArr);
		}
	}

	function currPageTrans(options) {
		options.currPage.addClass(outClass).on(animEndEventName, function() {
			options.currPage.off(animEndEventName);
			endCurrPage = true;
			if (endNextPage) {
				onEndAnimation(options.currPage, options.nextPage);
			}
		});
	}

	function nextPageTrans(options) {
		options.nextPage.addClass(inClass).on(animEndEventName, function() {
			options.nextPage.off(animEndEventName);
			endNextPage = true;
			if (endCurrPage) {
				onEndAnimation(options.currPage, options.nextPage);
			}
		});
	}

	function transFun(options) {
		try {
			setTransitionClass(options.transition);
			options.nextPage.addClass("active");
			currPageTrans(options);
			nextPageTrans(options);
		} catch (e) {
			console.log(e);
		}
	}

	function onEndAnimation($outpage, $inpage) {
		endCurrPage = false;
		endNextPage = false;
		resetPage($outpage, $inpage);
	}

	function resetPage($outpage, $inpage) {
		$outpage.attr('class', $outpage.data('originalClassList'));
		$inpage.attr('class', $inpage.data('originalClassList') + ' active');
	}

	function setTransitionClass(flag) {
		switch (flag) {
			case "um":
				outClass = 'um-left-out';
				inClass = 'um-right-in';
				if (isReverse) {
					outClass = 'um-right-out';
					inClass = 'um-left-in';
				}
				break;
			case "door":// 开门旋转
				outClass = 'um-rotatePushLeft';
				inClass = 'um-rotatePullRight';
				if (isReverse) {
					outClass = 'um-rotatePushRight';
					inClass = 'um-rotatePullLeft';
				}
				break;
			case "f7" :
				outClass = 'page-from-center-to-left';
				inClass = 'page-from-right-to-center';
				if (isReverse) {
					outClass = 'page-from-center-to-right';
					inClass = 'page-from-left-to-center';
				}
				break;
			case "slide":
				outClass = 'um-moveToLeft';
				inClass = 'um-moveFromRight';

				if (isReverse) {
					outClass = 'um-moveToRight';
					inClass = 'um-moveFromLeft';
				}
				break;
			case "slideup": 
				outClass = 'um-moveToTop';
				inClass = 'um-moveFromBottom';
				if (isReverse) {
					outClass = 'um-moveToBottom';
					inClass = 'um-moveFromTop';
				}
				break;
			case "fade": // fade
				outClass = 'um-fadeOut';
				inClass = 'um-fadeIn';
				break;
			case "slidefade":
				outClass = 'um-moveToLeftFade';
				inClass = 'um-moveFromRightFade';
				if (isReverse) {
					outClass = 'um-moveToRightFade';
					inClass = 'um-moveFromLeftFade';
				}
				break;
			case "slideupfade":
				outClass = 'um-moveToTopFade';
				inClass = 'um-moveFromBottomFade';
				if (isReverse) {
					outClass = 'um-moveToBottomFade';
					inClass = 'um-moveFromTopFade';
				}
				break;
			case "slide_ease":
				outClass = 'um-moveToLeftEasing';
				inClass = 'um-moveFromRight';
				if (isReverse) {
					outClass = 'um-moveToRightEasing';
					inClass = 'um-moveFromLeft';
				}
				break;
			case "pop":
				outClass = 'um-noeffect';
				inClass = 'um-moveFromBottom';
				if (isReverse) {
					outClass = 'um-moveToBottomEasing';
					inClass = 'um-noeffect';
				}
				break;
			case "slide_scale":
				outClass = 'um-scaleDown';
				inClass = 'um-moveFromRight';
				if (isReverse) {
					outClass = 'um-scaleDown';
					inClass = 'um-moveFromLeft';
				}
				break;
			case "scale_pop":
				outClass = 'um-scaleDown';
				inClass = 'um-moveFromBottom';
				if (isReverse) {
					outClass = 'um-scaleDown';
					inClass = 'um-moveFromTop';
				}
				break;
			case "scale_down_up":
				outClass = 'um-scaleDownUp';
				inClass = 'um-scaleUp';
				if (isReverse) {
					outClass = 'um-scaleDown';
					inClass = 'um-scaleUpDown';
				}
				break;
			case "scale_slide":
				outClass = 'um-moveToLeft';
				inClass = 'um-scaleUp';
				if (isReverse) {
					outClass = 'um-moveToRight';
					inClass = 'um-scaleUp';
				}
				break;
			/*case 25:
				outClass = 'um-moveToTop';
				inClass = 'um-scaleUp';
				if (isReverse) {
					outClass = 'um-moveToBottom';
					inClass = 'um-scaleUp';
				}
				break;
			case 27:
				outClass = 'um-scaleDownCenter';
				inClass = 'um-scaleUpCenter';
				break;
			case 28:
				outClass = 'um-rotateRightSideFirst';
				inClass = 'um-moveFromRight';
				if (isReverse) {
					outClass = 'um-rotateLeftSideFirst';
					inClass = 'um-moveFromLeft';
				}
				break;
			case 30:
				outClass = 'um-rotateTopSideFirst';
				inClass = 'um-moveFromTop';
				if (isReverse) {
					outClass = 'um-rotateBottomSideFirst';
					inClass = 'um-moveFromBottom';
				}
				break;
			case 32:
				outClass = 'um-flipOutRight';
				inClass = 'um-flipInLeft';
				if (isReverse) {
					outClass = 'um-flipOutLeft';
					inClass = 'um-flipInRight';
				}
				break;
			case 34:
				outClass = 'um-flipOutTop';
				inClass = 'um-flipInBottom';
				if (isReverse) {
					outClass = 'um-flipOutBottom';
					inClass = 'um-flipInTop';
				}
				break;
			case 40:
				outClass = 'um-rotatePushTop';
				inClass = 'um-moveFromBottom';
				if (isReverse) {
					outClass = 'um-rotatePushBottom';
					inClass = 'um-moveFromTop';
				}
				break;*/
			case "fall":
				outClass = 'um-rotateFall';
				inClass = 'um-scaleUp';
				break;
			case "rotate":
				outClass = 'um-rotateOutNewspaper';
				inClass = 'um-rotateInNewspaper';
				break;
			case "push_left":
				outClass = 'um-rotatePushLeft';
				inClass = 'um-moveFromRight';
				if (isReverse) {
					outClass = 'um-rotatePushRight';
					inClass = 'um-moveFromLeft';
				}
				break;
			case "push_top":
				outClass = 'um-rotatePushTop';
				inClass = 'um-rotatePullBottom';
				if (isReverse) {
					outClass = 'um-rotatePushBottom';
					inClass = 'um-rotatePullTop';
				}
				break;
			case "turn":
				outClass = 'um-rotatePushLeft';
				inClass = 'um-rotatePullRight';
				if (isReverse) {
					outClass = 'um-rotatePushRight';
					inClass = 'um-rotatePullLeft';
				}
				break;
			case "cube":
				outClass = 'um-rotateFoldLeft';
				inClass = 'um-moveFromRightFade';
				if (isReverse) {
					outClass = 'um-rotateFoldRight';
					inClass = 'um-moveFromLeftFade';
				}
				break;
			case "cube_pop":
				outClass = 'um-rotateFoldTop';
				inClass = 'um-moveFromBottomFade';
				if (isReverse) {
					outClass = 'um-rotateFoldBottom';
					inClass = 'um-moveFromTopFade';
				}
				break;
			case "cube_slide":
				outClass = 'um-moveToLeftFade';
				inClass = 'um-rotateUnfoldRight';
				if (isReverse) {
					outClass = 'um-moveToRightFade';
					inClass = 'um-rotateUnfoldLeft';
				}
				break;
			case "cube_":
				outClass = 'um-rotateCubeLeftOut';
				inClass = 'um-rotateCubeLeftIn';
				if (isReverse) {
					outClass = 'um-rotateCubeRightOut';
					inClass = 'um-rotateCubeRightIn';
				}
				break;
			case "flow":
				outClass = 'um-rotateSlideOut';
				inClass = 'um-rotateSlideIn';
				if (isReverse) {
					outClass = 'um-moveToRight';
					inClass = 'um-moveFromLeft';
				}
				break;
			/*case 52:
				outClass = 'um-moveToBottomFade';
				inClass = 'um-rotateUnfoldTop';
				if (isReverse) {
					outClass = 'um-moveToTopFade';
					inClass = 'um-rotateUnfoldBottom';
				}
				break;
			case 54:
				outClass = 'um-rotateRoomLeftOut';
				inClass = 'um-rotateRoomLeftIn';
				if (isReverse) {
					outClass = 'um-rotateRoomRightOut';
					inClass = 'um-rotateRoomRightIn';
				}
				break;
			case 56:
				outClass = 'um-rotateRoomTopOut';
				inClass = 'um-rotateRoomTopIn';
				if (isReverse) {
					outClass = 'um-rotateRoomBottomOut';
					inClass = 'um-rotateRoomBottomIn';
				}
				break;
			case 60:
				outClass = 'um-rotateCubeTopOut';
				inClass = 'um-rotateCubeTopIn';
				if (isReverse) {
					outClass = 'um-rotateCubeBottomOut';
					inClass = 'um-rotateCubeBottomIn';
				}
				break;
			case 62:
				outClass = 'um-rotateCarouselLeftOut';
				inClass = 'um-rotateCarouselLeftIn';
				if (isReverse) {
					outClass = 'um-rotateCarouselRightOut';
					inClass = 'um-rotateCarouselRightIn';
				}
				break;
			case 64:
				outClass = 'um-rotateCarouselTopOut';
				inClass = 'um-rotateCarouselTopIn';
				if (isReverse) {
					outClass = 'um-rotateCarouselBottomOut';
					inClass = 'um-rotateCarouselBottomIn';
				}
				break;*/
		}
	}

	init();
	$(document).on(eventType[1],"a[href^=#]", enterPage);
	/*return {
		init: init
	};*/
});/*
 *  webui popover plugin  - v1.1.3
 *  A lightWeight popover plugin with jquery ,enchance the  popover plugin of bootstrap with some awesome new features. It works well with bootstrap ,but bootstrap is not necessary!
 *  https://github.com/sandywalker/webui-popover
 *
 *  Made by Sandy Duan
 *  Under MIT License
 */
;
(function($, window, document, undefined) {

    'use strict';

    // Create the defaults once
    var pluginName = 'popover';
    var pluginClass = 'um-popover';
    var pluginType = 'um.popover';
    var defaults = {
        placement: 'auto',
        width: 'auto',
        height: 'auto',
        trigger: 'click',
        style: '',
        delay: {
            show: null,
            hide: null
        },
        async: {
            before: null, //function(that, xhr){}
            success: null //function(that, xhr){}
        },
        cache: true,
        multi: false,
        arrow: true,
        title: '',
        content: '',
        closeable: false,
        padding: true,
        url: '',
        type: 'html',
        constrains: null,
        animation: null,
        template: '<div class="um-popover">' +
            '<div class="arrow"></div>' +
            '<div class="um-popover-inner">' +
            '<a href="#" class="close">x</a>' +
            '<h3 class="um-popover-title"></h3>' +
            '<div class="um-popover-content"><i class="icon-refresh"></i> <p>&nbsp;</p></div>' +
            '</div>' +
            '</div>',
        backdrop: false,
        dismissible: true,
        onShow: null,
        onHide: null
    };


    var popovers = [];
    var backdrop = $('<div class="um-popover-backdrop"></div>');
    var _globalIdSeed = 0;
    var $document = $(document);



    // The actual plugin constructor
    function Popover(element, options) {
        this.$element = $(element);
        if (options) {
            if ($.type(options.delay) === 'string' || $.type(options.delay) === 'number') {
                options.delay = {
                    show: options.delay,
                    hide: options.delay
                }; // bc break fix
            }
        }
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this._targetclick = false;
        this.init();
        popovers.push(this.$element);
    }

    Popover.prototype = {
        //init webui popover
        init: function() {
            //init the event handlers
            if (this.getTrigger() === 'click') {
                this.$element.off('click').on('click', $.proxy(this.toggle, this));
            } else if (this.getTrigger() === 'hover') {
                this.$element
                    .off('mouseenter mouseleave click')
                    .on('mouseenter', $.proxy(this.mouseenterHandler, this))
                    .on('mouseleave', $.proxy(this.mouseleaveHandler, this));
                // .on('click', function(e) {
                //     e.stopPropagation();
                // });
            }
            this._poped = false;
            this._inited = true;
            this._opened = false;
            this._idSeed = _globalIdSeed;
            if (this.options.backdrop) {
                backdrop.appendTo(document.body).hide();
            }
            _globalIdSeed++;
        },
        /* api methods and actions */
        destroy: function() {
            var index = -1;

            for (var i = 0; i < popovers.length; i++) {
                if (popovers[i] === this.$element) {
                    index = i;
                    break;
                }
            }

            popovers.splice(index, 1);


            this.hide();
            this.$element.data('plugin_' + pluginName, null);
            if (this.getTrigger() === 'click') {
                this.$element.off('click');
            } else if (this.getTrigger() === 'hover') {
                this.$element.off('mouseenter mouseleave');
            }
            if (this.$target) {
                this.$target.remove();
            }
        },
        hide: function(event) {
            if (!this._opened) {
                return;
            }
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (this.xhr) {
                this.xhr.abort();
                this.xhr = null;
            }
            var e = $.Event('hide.' + pluginType);
            this.$element.trigger(e);
            if (this.$target) {
                this.$target.removeClass('in').hide();
            }
            if (this.options.backdrop) {
                backdrop.hide();
            }
            this._opened = false;
            this.$element.trigger('hidden.' + pluginType);

            if (this.options.onHide) {
                this.options.onHide(this.$target);
            }

        },
        toggle: function(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            this[this.getTarget().hasClass('in') ? 'hide' : 'show']();
        },
        hideAll: function() {
            for (var i = 0; i < popovers.length; i++) {
                popovers[i].popover('hide');
            }

            $document.trigger('hiddenAll.' + pluginType);
        },
        /*core method ,show popover */
        show: function() {

            var
                $target = this.getTarget().removeClass().addClass(pluginClass).addClass(this._customTargetClass);
            if (!this.options.multi) {
                this.hideAll();
            }
            if (this._opened) {
                return;
            }
            // use cache by default, if not cache setted  , reInit the contents 
            if (!this.getCache() || !this._poped || this.content === '') {
                this.content = '';
                this.setTitle(this.getTitle());
                if (!this.options.closeable) {
                    $target.find('.close').off('click').remove();
                }
                if (!this.isAsync()) {
                    this.setContent(this.getContent());
                } else {
                    this.setContentASync(this.options.content);
                    this.displayContent();
                    return;
                }
                $target.show();
            }
            this.displayContent();

            if (this.options.onShow) {
                this.options.onShow($target);
            }

            this.bindBodyEvents();
            if (this.options.backdrop) {
                backdrop.show();
            }
            this._opened = true;
        },
        displayContent: function() {
            var
            //element postion
                elementPos = this.getElementPosition(),
                //target postion
                $target = this.getTarget().removeClass().addClass(pluginClass).addClass(this._customTargetClass),
                //target content
                $targetContent = this.getContentElement(),
                //target Width
                targetWidth = $target[0].offsetWidth,
                //target Height
                targetHeight = $target[0].offsetHeight,
                //placement
                placement = 'bottom',
                e = $.Event('show.' + pluginType);
            //if (this.hasContent()){
            this.$element.trigger(e);
            //}
            if (this.options.width !== 'auto') {
                $target.width(this.options.width);
            }
            if (this.options.height !== 'auto') {
                $targetContent.height(this.options.height);
            }

            //init the popover and insert into the document body
            if (!this.options.arrow) {
                $target.find('.arrow').remove();
            }
            $target.detach().css({
                top: -2000,
                left: -2000,
                display: 'block'
            });
            if (this.getAnimation()) {
                $target.addClass(this.getAnimation());
            }
            $target.appendTo(document.body);
            targetWidth = $target[0].offsetWidth;
            targetHeight = $target[0].offsetHeight;
            placement = this.getPlacement(elementPos);
            this.initTargetEvents();
            var postionInfo = this.getTargetPositin(elementPos, placement, targetWidth, targetHeight);
            this.$target.css(postionInfo.position).addClass(placement).addClass('in');

            if (this.options.type === 'iframe') {
                var $iframe = $target.find('iframe');
                $iframe.width($target.width()).height($iframe.parent().height());
            }

            if (this.options.style) {
                this.$target.addClass(pluginClass + '-' + this.options.style);
            }

            if (!this.options.padding) {
                $targetContent.css('height', $targetContent.outerHeight());
                this.$target.addClass('um-no-padding');
            }
            if (!this.options.arrow) {
                this.$target.css({
                    'margin': 0
                });
            }
            if (this.options.arrow) {
                var $arrow = this.$target.find('.arrow');
                $arrow.removeAttr('style');
                if (postionInfo.arrowOffset) {
                    $arrow.css(postionInfo.arrowOffset);
                }
            }
            this._poped = true;
            this.$element.trigger('shown.' + pluginType);
        },

        isTargetLoaded: function() {
            return this.getTarget().find('i.glyphicon-refresh').length === 0;
        },

        /*getter setters */
        getTriggerElement: function() {
            return this.$element;
        },
        getTarget: function() {
            if (!this.$target) {
                var id = pluginName + this._idSeed;
                this.$target = $(this.options.template)
                    .attr('id', id)
                    .data('trigger-element', this.getTriggerElement());
                this._customTargetClass = this.$target.attr('class') !== pluginClass ? this.$target.attr('class') : null;
                this.getTriggerElement().attr('data-target', id);
            }
            return this.$target;
        },
        getTitleElement: function() {
            return this.getTarget().find('.' + pluginClass + '-title');
        },
        getContentElement: function() {
            return this.getTarget().find('.' + pluginClass + '-content');
        },
        getTitle: function() {
            return this.$element.attr('data-title') || this.options.title || this.$element.attr('title');
        },
        getUrl: function() {
            return this.$element.attr('data-url') || this.options.url;
        },
        getCache: function() {
            var dataAttr = this.$element.attr('data-cache');
            if (typeof(dataAttr) !== 'undefined') {
                switch (dataAttr.toLowerCase()) {
                    case 'true':
                    case 'yes':
                    case '1':
                        return true;
                    case 'false':
                    case 'no':
                    case '0':
                        return false;
                }
            }
            return this.options.cache;
        },
        getTrigger: function() {
            return this.$element.attr('data-trigger') || this.options.trigger;
        },
        getDelayShow: function() {
            var dataAttr = this.$element.attr('data-delay-show');
            if (typeof(dataAttr) !== 'undefined') {
                return dataAttr;
            }
            return this.options.delay.show === 0 ? 0 : this.options.delay.show || 100;
        },
        getHideDelay: function() {
            var dataAttr = this.$element.attr('data-delay-hide');
            if (typeof(dataAttr) !== 'undefined') {
                return dataAttr;
            }
            return this.options.delay.hide === 0 ? 0 : this.options.delay.hide || 100;
        },
        getConstrains: function() {
            var dataAttr = this.$element.attr('data-contrains');
            if (typeof(dataAttr) !== 'undefined') {
                return dataAttr;
            }
            return this.options.constrains;
        },
        getAnimation: function() {
            var dataAttr = this.$element.attr('data-animation');
            return dataAttr || this.options.animation;
        },
        setTitle: function(title) {
            var $titleEl = this.getTitleElement();
            if (title) {
                $titleEl.html(title);
            } else {
                $titleEl.remove();
            }
        },
        hasContent: function() {
            return this.getContent();
        },
        getContent: function() {
            if (this.getUrl()) {
                if (this.options.type === 'iframe') {
                    this.content = $('<iframe frameborder="0"></iframe>').attr('src', this.getUrl());
                }
            } else if (!this.content) {
                var content = '';
                if ($.isFunction(this.options.content)) {
                    content = this.options.content.apply(this.$element[0], arguments);
                } else {
                    content = this.options.content;
                }
                this.content = this.$element.attr('data-content') || content;
            }
            return this.content;
        },
        setContent: function(content) {
            var $target = this.getTarget();
            this.getContentElement().html(content);
            this.$target = $target;
        },
        isAsync: function() {
            return this.options.type === 'async';
        },
        setContentASync: function(content) {
            var that = this;
            this.xhr = $.ajax({
                url: this.getUrl(),
                type: 'GET',
                cache: this.getCache(),
                beforeSend: function(xhr) {
                    if (that.options.async.before) {
                        that.options.async.before(that, xhr);
                    }
                },
                success: function(data) {
                    that.bindBodyEvents();
                    if (content && $.isFunction(content)) {
                        that.content = content.apply(that.$element[0], [data]);
                    } else {
                        that.content = data;
                    }
                    that.setContent(that.content);
                    var $targetContent = that.getContentElement();
                    $targetContent.removeAttr('style');
                    that.displayContent();
                    if (that.options.async.success) {
                        that.options.async.success(that, data);
                    }
                    this.xhr = null;
                }
            });
        },

        bindBodyEvents: function() {
            if (this.options.dismissible) {
                $('body').off('keyup.um-popover').on('keyup.um-popover', $.proxy(this.escapeHandler, this));
                $('body').off('click.um-popover').on('click.um-popover', $.proxy(this.bodyClickHandler, this));
            }
        },

        /* event handlers */
        mouseenterHandler: function() {
            var self = this;
            if (self._timeout) {
                clearTimeout(self._timeout);
            }
            self._enterTimeout = setTimeout(function() {
                if (!self.getTarget().is(':visible')) {
                    self.show();
                }
            }, this.getDelayShow());
        },
        mouseleaveHandler: function() {
            var self = this;
            clearTimeout(self._enterTimeout);
            //key point, set the _timeout  then use clearTimeout when mouse leave
            self._timeout = setTimeout(function() {
                self.hide();
            }, this.getHideDelay());
        },
        escapeHandler: function(e) {
            if (e.keyCode === 27) {
                this.hideAll();
            }
        },
        bodyClickHandler: function() {
            if (this.getTrigger() === 'click') {
                if (this._targetclick) {
                    this._targetclick = false;
                } else {
                    this.hideAll();
                }
            }
        },

        targetClickHandler: function() {
            this._targetclick = true;
        },

        //reset and init the target events;
        initTargetEvents: function() {
            if (this.getTrigger() === 'hover') {
                this.$target
                    .off('mouseenter mouseleave')
                    .on('mouseenter', $.proxy(this.mouseenterHandler, this))
                    .on('mouseleave', $.proxy(this.mouseleaveHandler, this));
            }
            this.$target.find('.close').off('click').on('click', $.proxy(this.hide, this));
            this.$target.off('click.um-popover').on('click.um-popover', $.proxy(this.targetClickHandler, this));
        },
        /* utils methods */
        //caculate placement of the popover
        getPlacement: function(pos) {
            var
                placement,
                de = document.documentElement,
                db = document.body,
                clientWidth = de.clientWidth,
                clientHeight = de.clientHeight,
                scrollTop = Math.max(db.scrollTop, de.scrollTop),
                scrollLeft = Math.max(db.scrollLeft, de.scrollLeft),
                pageX = Math.max(0, pos.left - scrollLeft),
                pageY = Math.max(0, pos.top - scrollTop);
            //arrowSize = 20;

            //if placement equals auto，caculate the placement by element information;
            if (typeof(this.options.placement) === 'function') {
                placement = this.options.placement.call(this, this.getTarget()[0], this.$element[0]);
            } else {
                placement = this.$element.data('placement') || this.options.placement;
            }


            if (placement === 'auto') {
                var constrainsH = this.getConstrains() === 'horizontal',
                    constrainsV = this.getConstrains() === 'vertical';
                if (pageX < clientWidth / 3) {
                    if (pageY < clientHeight / 3) {
                        placement = constrainsH ? 'right-bottom' : 'bottom-right';
                    } else if (pageY < clientHeight * 2 / 3) {
                        if (constrainsV) {
                            placement = pageY <= clientHeight / 2 ? 'bottom-right' : 'top-right';
                        } else {
                            placement = 'right';
                        }
                    } else {
                        placement = constrainsH ? 'right-top' : 'top-right';
                    }
                    //placement= pageY>targetHeight+arrowSize?'top-right':'bottom-right';
                } else if (pageX < clientWidth * 2 / 3) {
                    if (pageY < clientHeight / 3) {
                        if (constrainsH) {
                            placement = pageX <= clientWidth / 2 ? 'right-bottom' : 'left-bottom';
                        } else {
                            placement = 'bottom';
                        }
                    } else if (pageY < clientHeight * 2 / 3) {
                        if (constrainsH) {
                            placement = pageX <= clientWidth / 2 ? 'right' : 'left';
                        } else {
                            placement = pageY <= clientHeight / 2 ? 'bottom' : 'top';
                        }
                    } else {
                        if (constrainsH) {
                            placement = pageX <= clientWidth / 2 ? 'right-top' : 'left-top';
                        } else {
                            placement = 'top';
                        }
                    }
                } else {
                    //placement = pageY>targetHeight+arrowSize?'top-left':'bottom-left';
                    if (pageY < clientHeight / 3) {
                        placement = constrainsH ? 'left-bottom' : 'bottom-left';
                    } else if (pageY < clientHeight * 2 / 3) {
                        if (constrainsV) {
                            placement = pageY <= clientHeight / 2 ? 'bottom-left' : 'top-left';
                        } else {
                            placement = 'left';
                        }
                    } else {
                        placement = constrainsH ? 'left-top' : 'top-left';
                    }
                }
            } else if (placement === 'auto-top') {
                if (pageX < clientWidth / 3) {
                    placement = 'top-right';
                } else if (pageX < clientHeight * 2 / 3) {
                    placement = 'top';
                } else {
                    placement = 'top-left';
                }
            } else if (placement === 'auto-bottom') {
                if (pageX < clientWidth / 3) {
                    placement = 'bottom-right';
                } else if (pageX < clientHeight * 2 / 3) {
                    placement = 'bottom';
                } else {
                    placement = 'bottom-left';
                }
            } else if (placement === 'auto-left') {
                if (pageY < clientHeight / 3) {
                    placement = 'left-top';
                } else if (pageY < clientHeight * 2 / 3) {
                    placement = 'left';
                } else {
                    placement = 'left-bottom';
                }
            } else if (placement === 'auto-right') {
                if (pageY < clientHeight / 3) {
                    placement = 'right-top';
                } else if (pageY < clientHeight * 2 / 3) {
                    placement = 'right';
                } else {
                    placement = 'right-bottom';
                }
            }
            return placement;
        },
        getElementPosition: function() {
            return $.extend({}, this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            });
        },

        getTargetPositin: function(elementPos, placement, targetWidth, targetHeight) {
            var pos = elementPos,
                elementW = this.$element.outerWidth(),
                elementH = this.$element.outerHeight(),
                position = {},
                arrowOffset = null,
                arrowSize = this.options.arrow ? 20 : 0,
                fixedW = 8,
                fixedH = 8;
                /*fixedW = elementW < arrowSize + 10 ? arrowSize : 0,
                fixedH = elementH < arrowSize + 10 ? arrowSize : 0;*/

            switch (placement) {
                case 'bottom':
                    position = {
                        top: pos.top + pos.height,
                        left: pos.left + pos.width / 2 - targetWidth / 2
                    };
                    break;
                case 'top':
                    position = {
                        top: pos.top - targetHeight,
                        left: pos.left + pos.width / 2 - targetWidth / 2
                    };
                    break;
                case 'left':
                    position = {
                        top: pos.top + pos.height / 2 - targetHeight / 2,
                        left: pos.left - targetWidth
                    };
                    break;
                case 'right':
                    position = {
                        top: pos.top + pos.height / 2 - targetHeight / 2,
                        left: pos.left + pos.width
                    };
                    break;
                case 'top-right':
                    position = {
                        top: pos.top - targetHeight,
                        left: pos.left - fixedW
                    };
                    arrowOffset = {
                        left: Math.min(elementW, targetWidth) / 2 + fixedW
                    };
                    break;
                case 'top-left':
                    position = {
                        top: pos.top - targetHeight,
                        left: pos.left - targetWidth + pos.width + fixedW
                    };
                    arrowOffset = {
                        left: targetWidth - Math.min(elementW, targetWidth) / 2 - fixedW
                    };
                    break;
                case 'bottom-right':
                    position = {
                        top: pos.top + pos.height,
                        left: pos.left - fixedW
                    };
                    arrowOffset = {
                        left: Math.min(elementW, targetWidth) / 2 + fixedW
                    };
                    break;
                case 'bottom-left':
                    position = {
                        top: pos.top + pos.height,
                        left: pos.left - targetWidth + pos.width + fixedW
                    };
                    arrowOffset = {
                        left: targetWidth - Math.min(elementW, targetWidth) / 2 - fixedW
                    };
                    break;
                case 'right-top':
                    position = {
                        top: pos.top - targetHeight + pos.height + fixedH,
                        left: pos.left + pos.width
                    };
                    arrowOffset = {
                        top: targetHeight - Math.min(elementH, targetHeight) / 2 - fixedH
                    };
                    break;
                case 'right-bottom':
                    position = {
                        top: pos.top - fixedH,
                        left: pos.left + pos.width
                    };
                    arrowOffset = {
                        top: Math.min(elementH, targetHeight) / 2 + fixedH
                    };
                    break;
                case 'left-top':
                    position = {
                        top: pos.top - targetHeight + pos.height + fixedH,
                        left: pos.left - targetWidth
                    };
                    arrowOffset = {
                        top: targetHeight - Math.min(elementH, targetHeight) / 2 - fixedH
                    };
                    break;
                case 'left-bottom':
                    position = {
                        top: pos.top - fixedH,
                        left: pos.left - targetWidth
                    };
                    arrowOffset = {
                        top: Math.min(elementH, targetHeight) / 2 + fixedH
                    };
                    break;

            }
            return {
                position: position,
                arrowOffset: arrowOffset
            };
        }
    };
    $.fn[pluginName] = function(options, noInit) {
        var results = [];
        var $result = this.each(function() {

            var popover = $.data(this, 'plugin_' + pluginName);
            if (!popover) {
                if (!options) {
                    popover = new Popover(this, null);
                } else if (typeof options === 'string') {
                    if (options !== 'destroy') {
                        if (!noInit) {
                            popover = new Popover(this, null);
                            results.push(popover[options]());
                        }
                    }
                } else if (typeof options === 'object') {
                    popover = new Popover(this, options);
                }
                $.data(this, 'plugin_' + pluginName, popover);
            } else {
                if (options === 'destroy') {
                    popover.destroy();
                } else if (typeof options === 'string') {
                    results.push(popover[options]());
                }
            }
        });

        return (results.length) ? results : $result;
    };

})(jQuery, window, document);
/* 滑动菜单 */ 
+ function($) {
  'use strict';
  $(function() {
    /* swipe tab bar */
    var tabbar = $('[data-action="swipeTab"]');
    $.each(tabbar, function(i, e) {
      var bar = $(this).find("li");
      var targetName = tabbar.eq(i).data("target");
      var target = document.getElementById(targetName);
      window["swipe" + i] = Swipe(target, {
        // startSlide: 4,
        // auto: 3000,
        // continuous: true,
        // disableScroll: true,
        // stopPropagation: true,
        //transitionEnd: function(index, element) {},
        callback: function(index, element) {
          bar.removeClass("active").eq(index).addClass("active");
        }
      });
      bar.on(eventType[0], function() {
        var e = $(this).closest("li").index();
        window["swipe" + i].slide(e, 200);
      });
    });
  });
}(jQuery);/* 固定行固定列表格 */
+ function($) {
  'use strict';
  $(function() {

    var table_container = $(".um-table-container");
    if (table_container.length) {
      var init = function() {
        $.each(table_container, function() {
          var $this = $(this),
            row_w = $this.find(".um-tb-data").data("row-width"),
            parent_w = $this.find(".um-tb-body").innerWidth(),
            left_w = $this.find(".um-tb-body-left").outerWidth() || 0,
            data_w = parent_w - left_w;

          var isRow = $this.hasClass("table-row-scroll"), //固定列，行滚动
            isCol = $this.hasClass("table-col-scroll"); //固定行，列滚动

          if (isCol) {
            $this.find(".um-tb-body-left,.um-tb-data").height("auto");
          }
          if (isRow) {
            $this.find(".um-tb-data").css("overflow-x", "hidden");
          }
          $this.find(".um-tb-header-title table,.um-tb-data-table").width(Math.max(data_w, row_w));
        });
      };
      init();
      window.addEventListener("resize", init);
      $(".um-tb-data").on("scroll", function(e) {
        var table_container = $(this).closest(".um-table-container");
        var s1 = table_container.find(".um-tb-body-left")[0],
          s2 = table_container.find(".um-tb-header-title")[0];
        s1 && (s1.children[0].style.top = "-" + this.scrollTop + "px");
        s2 && (s2.children[0].style.left = "-" + this.scrollLeft + "px");
      });
    }
  });
}(jQuery);