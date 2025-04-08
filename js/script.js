(function ($) {

	// ----------------------------------------
	// AOS Init
	if (AOS !== undefined && AOS.hasOwnProperty("init")) {
		try {
			AOS.init({
				once: false,
				duration: 700,
				delay: 200,
				offset: 0,
				anchorPlacement: 'top-bottom',
				// easing: 'ease-in-out-cubic',
				// disable: "mobile"
			});
		} catch (error) {
			console.error(error);
		}
	}

	// ----------------------------------------
	// This is a workaround for AOS not displaying some blocks in Firefox and Safari
	$(document).ready(function () {
		setTimeout(function() {
			AOS.refresh();
		}, 3000);
	});

	// ----------------------------------------
	// Offcanvas Panel Menu
	$(document).on('click','.js-toggle-open',function(e) {
		e.preventDefault();
		// Toggle Offcanvas Menu
		if ($('body').hasClass('nav-open')) {
			$('body').removeClass('nav-open');
		} else {
			$('body').addClass('nav-open');
		}
		// Toggle Hamburger Icon
		if ($('.js-toggle-open .hamburger-icon').hasClass('active')) {
			$('.js-toggle-open .hamburger-icon').removeClass('active');
		} else {
			$('.js-toggle-open .hamburger-icon').addClass('active');
		}
		$(".sidebar-filter").removeClass('active');
		$(".sub-menu").removeClass('active');

		$("body").addClass("scrolled");
	});

	$(document).on('click','.js-toggle-close',function(e) {
		e.preventDefault();
		$('body').removeClass('nav-open');
	});

	$(document).on('click','.nav-bg',function(e) {
		e.preventDefault();
		$('body').removeClass('nav-open');
	});

	// Sub Panels
	$(document).on('click','.js-offcanvas-sub-menu',function(e) {
		e.preventDefault();
		$(this).parent().children('.sub-panel').addClass('active');
		$('.nav-left').addClass('sub-panel-open');
	});

	// Back Button
	$(document).on('click','.js-back',function(e) {
		e.preventDefault();
		$( e.target ).closest('.sub-panel.active').removeClass('active');
	});

	$(document).on('click','.js-main-menu',function(e) {
		e.preventDefault();
		$('.nav-left').removeClass('sub-panel-open');
	});

	// ----------------------------------------
	// Offcanvas Accordion Menu
	$(function(){
		var $ul = $('.accordion-menu > ul');

		$ul.find('li a').click(function(e){
			var $li = $(this).parent();

			if($li.find('ul').length > 0){
				e.preventDefault();

				if($li.hasClass('selected')) {
					$li.removeClass('selected').find('li').removeClass('selected');
					$li.find('ul').slideUp(400);
				} else {

					if($li.parents('li.selected').length === 0){
						$ul.find('li').removeClass('selected');
						$ul.find('ul').slideUp(400);
					} else {
						$li.parent().find('li').removeClass('selected');
						$li.parent().find('> li ul').slideUp(400);
					}

					$li.addClass('selected');
					$li.find('>ul').slideDown(400);
				}
			}
		});

		var t = ' li > ul ';
		for(var i=1;i<=10;i++) {
			$('.accordion-menu > ul > ' + t.repeat(i)).addClass('sub-menu-' + i);
		}

		var activeLi = $('li.selected');
		if(activeLi.length) {
			opener(activeLi);
		}

		function opener(li) {
			var ul = li.closest('ul');
			if(ul.length){

				li.addClass('selected');
				ul.addClass('open');
				li.find('>a>em').addClass('mdi-flip-v');

				if (ul.closest('li').length){
					opener(ul.closest('li'));
				} else {
					return false;
				}
			}
		}
	});

	// ----------------------------------------
	// Takeover Menu
	$(document).on('click','.js-takeover-menu',function(e) {
		e.preventDefault();
		// Toggle Takeover Nav
		if ($('.takeover-nav').hasClass('open')) {
			$('.takeover-nav').removeClass('open');
		} else {
			$('.takeover-nav').addClass('open');
		}
		// Toggle Hamburger Icon
		if ($('.js-takeover-menu .hamburger-icon').hasClass('active')) {
			$('.js-takeover-menu .hamburger-icon').removeClass('active');
		} else {
			$('.js-takeover-menu .hamburger-icon').addClass('active');
		}
		// Toggle No Scroll
		if ($('body').hasClass('noscroll')) {
			$('body').removeClass('noscroll');
		} else {
			$('body').addClass('noscroll');
		}

		$("body").addClass("scrolled");
	});

	$(document).on('click','.js-close',function(e) {
		e.preventDefault();
		$('.takeover-nav').removeClass('open');
		$('body').removeClass('noscroll');
	});

	// ----------------------------------------
	// Jump Scroll
	$(document).on('click','.js-main-nav li a[data-scroll], .accordion-menu ul li a[data-scroll], .takeover-nav .menu li a[data-scroll], .split-hero .button[data-scroll]',function(e) {
		e.preventDefault();
		var section = $(this).attr('data-scroll');
		$('body').removeClass('nav-open');
		$('body').removeClass('noscroll');
		$('.takeover-nav').removeClass('open');
		$('.header .hamburger-icon').removeClass('active');

		if ($(window).width() < 1025) {
		    $('html, body').animate({scrollTop: $('#' + section).offset().top -70 }, 'slow');
		}
		else {
		    $('html, body').animate({scrollTop: $('#' + section).offset().top -70 }, 'slow');
		}
	});

	$(".home .header .logo, .home .logo-sticky, .home .footer .logo").click(function() {
	  	$("html, body").animate({ scrollTop: 0 }, "slow");
	  	$('body').removeClass('nav-open');
	  	$('.takeover-nav').removeClass('open');
	  	$('body').removeClass('noscroll');
	  	$('.js-toggle-open .hamburger-icon').removeClass('active');
	  	$('.js-takeover-menu .hamburger-icon').removeClass('active');
	  	return false;
	});

	// ----------------------------------------
	// Nav Active State
	$(window).scroll(function(e) {
	    var windscroll = $(window).scrollTop();
	    $('.content-block').each(function(i) {
	    	if ($(this).position().top <= windscroll + 71) {
	    		$('.js-main-nav li.active').removeClass('active');
	    		$('.js-main-nav li').eq(i).addClass('active');

	    		$('.js-offcanvas-nav li.active').removeClass('active');
	    		$('.js-offcanvas-nav li').eq(i).addClass('active');
	    	}
	    });
	});

	// ----------------------------------------
	// Scrolled
	$(window).scroll(function() {    
	    var scroll = $(window).scrollTop();
	    if (scroll >= 1) {
	        $("body").addClass("scrolled");
	        $(".header").addClass("shadow");
	    } else {
	    	$("body").removeClass("scrolled");
	    	$(".header").removeClass("shadow");
	    }
	});

	// ----------------------------------------
	// Detect Dot position in viewport
	function getViewportOffset($e) {
		var $window = $(window),
		scrollLeft = $window.scrollLeft(),
		scrollTop = $window.scrollTop(),
		offset = $e.offset(),
		rect1 = { x1: scrollLeft, y1: scrollTop, x2: scrollLeft + $window.width(), y2: scrollTop + $window.height() },
		rect2 = { x1: offset.left, y1: offset.top, x2: offset.left + $e.width(), y2: offset.top + $e.height() };
		return {
			left: offset.left - scrollLeft,
			top: offset.top - scrollTop,
		};
	}

	// Dot
	$(window).on("load scroll resize", function() {
		var viewportOffset = getViewportOffset($(".position"));
		$(".dot").css({top: viewportOffset.top, left: viewportOffset.left});
	});

	// ----------------------------------------
	// Hero Parallax
	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
		$(".hero .image-container img").css({
			transform: 'translate3d(0px,'+(scroll/5)+'px, 0px) scale(1)',
		});

		// Overlay Fade In
		$(".hero .image-container img").css({
			'opacity': 1 - (scroll/800)
		});
	});

	// ----------------------------------------
	// Tabs
	$(document).on('click', '.tab-title',function(e) {
		e.preventDefault();
		clicked = e.target.href.split('#')[1];
		if($('.tab-title').length) {
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
		}
		if($('.content').length) {
			$('.content').each(function() {
				if(this.id == clicked) {
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
					// $('html, body').animate({scrollTop: $(this).offset().top - 120}, 600);
				} 
			});
		}
	});

	// ----------------------------------------
	// Anti Overflow Font Resizer
	// $('.page-title h1, .page-title h2, .split-hero h1, .split-hero h2').aofsr();

	// ----------------------------------------
	// Accordion
	$(document).on('click','.accordion-navigation > a',function(e) {
		e.preventDefault();
		var accordion_link = $(this);
		var accordion_item = accordion_link.closest('.accordion-navigation');
		var accordion_item_content = accordion_item.find('.content');
		var accordion_container = accordion_link.closest('[data-accordion]');

		if (!accordion_item.hasClass('active')) {
			$('.accordion .accordion-navigation .content').slideUp('400');
			$('.accordion .accordion-navigation').removeClass('active');
			accordion_container.find('.accordion-navigation .content').removeClass('active');
			accordion_item.addClass('active');
			accordion_item_content.slideDown('400');
			accordion_item_content.addClass('active');

			// Scroll To Active
			// setTimeout(function() {
			// 	$('html, body').animate({scrollTop: accordion_item_content.offset().top - 180 }, 250);
			// }, 400);
		} else {
			$('.accordion .accordion-navigation .content').slideUp('400');
			accordion_container.find('.accordion-navigation').removeClass('active');
			accordion_container.find('.accordion-navigation .content').removeClass('active');

		}
	});

	// ----------------------------------------
	// Custom Scrollbar
	var scrollbar_swiper = new Swiper(".js-scrollbar", {
		direction: "vertical",
		slidesPerView: "auto",
		freeMode: true,
		scrollbar: {
			el: ".swiper-scrollbar",
		},
		mousewheel: true,
	});

	// ----------------------------------------
	// Quote Slider
	$(document).ready(function () {
		//initialize swiper when document ready
		var quote_swiper = new Swiper ('.quote-slider', {
			// Optional parameters
			speed: 500,
			spaceBetween: 0,
			centeredSlides: false,
			loop: true,
			slidesOffsetBefore: 0,
			slidesPerView: 1,
			fadeEffect: { crossFade: true },
			effect: "fade",
			autoplay: {
			  delay: 8000,
			  disableOnInteraction: false,
			},
		});
	});

	// ----------------------------------------
	// Hero Slider
	$(document).ready(function () {
		//initialize swiper when document ready
		var hero_swiper = new Swiper ('.hero-slider', {
			// Optional parameters
			speed: 2000,
			spaceBetween: 0,
			slidesPerView: 1,
			loop: true,
			fadeEffect: { crossFade: true },
			effect: "fade",
			autoplay: {
			  delay: 6000,
			  disableOnInteraction: false,
			},
			on: {
				// Disable swiper if only 1 slide with loop
				// init: function () {
				//     if($(".hero-slider .swiper-slide").length == 3) {
				//     	$('.swiper-wrapper').addClass( "disabled" );
				//     	$('.swiper-pagination').addClass( "disabled" );
				//     }
				// },

				slideChangeTransitionStart: function () {
				    $('.swiper-slide.swiper-slide-active .hero.animated').addClass('animate');
				    $('.swiper-slide.swiper-slide-duplicate-active .hero.animated').addClass('animate');
				},
				slideChangeTransitionEnd: function () {
					$('.swiper-slide:not(.swiper-slide-active):not(.swiper-slide-duplicate-active) .hero.animated').removeClass('animate');
				},
			},

			pagination: {
			  el: ".swiper-pagination",
			  clickable: true,
			},
		});
	});

	// ----------------------------------------
	// Work Slider
	$(document).ready(function () {
		//initialize swiper when document ready
		var work_swiper = new Swiper ('.work-slider', {
			// Optional parameters
			speed: 1000,
			spaceBetween: 0,
			slidesPerView: 1,
			loop: true,
			allowTouchMove: false,
			fadeEffect: { crossFade: true },
			effect: "fade",
			// autoplay: {
			//   delay: 6000,
			//   disableOnInteraction: false,
			// },

			// Navigation arrows
			navigation: {
			 	nextEl: '.work-slider-next',
			 	prevEl: '.work-slider-prev',
			},
		});
	});

	// ----------------------------------------
	// Dropdown Menu
	$(document).on('click', '.dropdown .placeholder, .dropdown .dropdown-menu a', function(e) {
		if (!$(this).hasClass('follow-link')) {
			e.preventDefault();
		}
		
		var menu = $(this).closest('.dropdown');
		if (menu.hasClass('active')) {
			menu.removeClass('active');
		} else {
			menu.addClass('active');
		}
	});

	// Close Dropdown, Change Placeholder Text, Active State
	$(document).on('click', '.dropdown-menu a', function(e) {
		var title = $(this).text();
		$(this).closest('.dropdown').removeClass('active');
		$(this).closest('.dropdown').find('.placeholder').text(title);
		$(this).closest('.dropdown-menu').addClass('active');
	});

	// ----------------------------------------
	// Simplebar
	$(document).ready(function() {
		$('.js-simple-bar').each(function(index, el) {
    		new SimpleBar($(el)[0], {
    			autoHide: false
    		});
		});
	});

	// ----------------------------------------
	// Modal

	// Move Nested Modal
	$(document).ready(function() {
		if ($('[data-reveal]').length) {
			setTimeout(function() {
				$('[data-reveal]').each(function() {
					var this_modal = $(this);
					if (!this_modal.parent().is('body')) {
						$(document.body).append(this_modal.detach());
					}
				});
			}, 500);
		}
	});
	
	// Reveal Open
	function reveal_open(reveal_id) {
		var reveal_modal = $('#' + reveal_id);
		var window_width = $(window).width();
		var window_height = $(window).height();
		var window_scroll = $(window).scrollTop();
		var reveal_position = window_scroll;
		var reveal_offset = 200;
		reveal_close_all();
		if (reveal_modal.length) {
			if (!$('.reveal-modal-bg').length) {
				$('body').append('<div class="reveal-modal-bg"></div>');
			}
			$('body').addClass('reveal-opening');
			$('.reveal-modal-bg').fadeIn(100);
			reveal_modal.css('display', 'block');
			reveal_modal.css('visibility', 'visible');
			if (window_width > 640) {
				var reveal_modal_height = reveal_modal.outerHeight();
				if (reveal_modal_height + reveal_offset < window_height) {
					reveal_position = window_scroll + ((window_height - reveal_modal_height) / 2);
				} else if (reveal_id == 'video-modal' && reveal_modal_height < window_height) {
					reveal_position = window_scroll + ((window_height - reveal_modal_height) / 2);
				} else {
					reveal_position = window_scroll + reveal_offset;
				}
			}
			reveal_modal.css('top', reveal_position + 'px');
			setTimeout(function() {
				reveal_modal.css('opacity', '1');
				reveal_modal.trigger('reveal-opened');
				$('body').removeClass('reveal-opening');
			}, 250);
		}
	}
	// Reveal Close All
	function reveal_close_all(reveal_id) {
		$('[data-reveal]').each(function() {
			var this_modal = $(this);
			if (this_modal.is(':visible')) {
				var reveal_id = $(this).attr('id');
				reveal_close(reveal_id);
			}
		});
	}
	// Reveal Close
	function reveal_close(reveal_id) {
		var reveal_modal = $('#' + reveal_id);
		if (reveal_modal.length) {
			reveal_modal.css('opacity', '0');
			setTimeout(function() {
				if (!$('body').hasClass('reveal-opening')) {
					$('.reveal-modal-bg').fadeOut(100);
				}
				reveal_modal.css('display', 'none');
				reveal_modal.css('visibility', 'hidden');
				reveal_modal.trigger('reveal-closed');
			}, 200);
		}
	}
	// Reveal Open Trigger
	$(document).on('click','[data-reveal-id]',function(e) { 
		e.preventDefault();
		var reveal_trigger = $(this);
		var reveal_id = reveal_trigger.attr('data-reveal-id');
		reveal_open(reveal_id);
	});
	// Reveal Close Trigger
	$(document).on('click','.close-reveal-modal, .reveal-modal-bg',function(e) { 
		e.preventDefault();
		reveal_close_all();
	});
	// Reveal Close Escape
	$(document).keyup(function(e) {
		if (e.key === 'Escape') {
			reveal_close_all();
		}
	});

	// Video Modal

	$(document).on('click', '.modal-video-link', function(e) {
		e.preventDefault();
		var video_type = $(this).attr('data-type');
		var video_id = $(this).attr('data-id');
		var video_html = '';

		if (video_type == 'youtube') {
			video_html = '<div class="flex-video widescreen"><iframe allow="autoplay" width="1280" height="720" src="https://www.youtube.com/embed/' + video_id + '?autoplay=1&rel=0&showinfo=0&iv_load_policy=3" frameborder="0" allowfullscreen></iframe></div>';
		} else if (video_type == 'vimeo') {
			video_html = '<div class="flex-video widescreen vimeo"><iframe allow="autoplay" width="1280" height="720" src="https://player.vimeo.com/video/' + video_id + '?autoplay=1&title=0&byline=0&portrait=0&badge=0" frameborder="0" allowfullscreen></iframe></div>';
		}

		if (video_html !== '') {
			$('.modal-video-container').html(video_html);
			reveal_open('video-modal');
		}
	});

	$(document).on('reveal-closed', '#video-modal', function() {
		$('.modal-video-container').html('');
	});

})(jQuery);