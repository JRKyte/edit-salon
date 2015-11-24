$(document).ready(function() {
  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
    })
    $(this).addClass('active');

    var target = this.hash;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - 40
    }, 500, 'swing', function() {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });

  // Highlight day
  $('.times-item:eq(' + new Date().getDay() + ')').addClass('active');

  // Hero resize
  $("#hero").height($(window).height() - 40);
	$(window).resize(function () {
	  $("#hero").height($(window).height() - 40);
	});

});

function onScroll(event) {
  var scrollPosition = ($(document).scrollTop() + 40);
  $('nav a').each(function() {
    var currentLink = $(this);
    var refElement = $(currentLink.attr("href"));
    if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
      $('nav ul li a').removeClass("active");
      currentLink.addClass("active");
    } else {
      currentLink.removeClass("active");
    }
  });
}

// Google map
google.maps.event.addDomListener(window, 'load', init);
function init() {
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(53.373443, -1.317944),
    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
  };

  var mapElement = document.getElementById('map');
  var map = new google.maps.Map(mapElement, mapOptions);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(53.373443, -1.317944),
    map: map,
    icon: 'images/map-marker.png',
    title: "We're here!"
  });
}

// Instafeed plugin

// Set size of feed based on screen
var instafeedLimit = 6;

// JS Media query
if (matchMedia) {
  var mq = window.matchMedia("(min-width: 767px)");
  mq.addListener(WidthChange);
  WidthChange(mq);
}

// Check if the media query is true or false
function WidthChange(mq) {
  if (mq.matches) {
    instafeedLimit = 8;
  }
  else {
    instafeedLimit = 6;
  }
}

// Load instafeed with options

var loadButton = document.getElementById('load-more');
var feed = new Instafeed({
  get: 'user',
  userId: 273726927,
  accessToken: '273726927.1677ed0.40b61ad546f9464e8415bf80bd835258',
  // Filter by hashtag - currently seems broken on Instafeed.js 4.1
  // filter: function(image) {
  //   return image.tags.indexOf('longhair') >= 0;
  // },
  template: '<div class="instafeed__item" style="background-image: url({{image}});"><div class="instafeed__item--contaniner"><div class="table"><a href="{{link}}" class="table-cell"><i class="zoom-icon"></i>View large</a></div></div></div>',
  limit: instafeedLimit,
  resolution: 'low_resolution',
  after: function() {
    // Disable button if no more results to load
    if (!this.hasNext()) {
      loadButton.setAttribute('disabled', 'disabled');
    }
  },
});

// Bind the load more button
loadButton.addEventListener('click', function() {
  feed.next();
});

// Run our feed!
feed.run();
