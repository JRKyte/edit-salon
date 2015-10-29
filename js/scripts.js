// Scripts

$(document).ready(function() {

  // Highlight day
  $('.times-item:eq(' + new Date().getDay() + ')').addClass('active');

  // Hero resize
  $("#hero").height($(window).height() - 40);
	$(window).resize(function () {
	  $("#hero").height($(window).height() - 40);
	});

  // Smooth scroll
  $('.scroll').click(function (e) {
    e.preventDefault();
    $("html,body").animate({
      scrollTop: $(this.hash).offset().top
    });
  });

});

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
// userId: 273726927 // This is the correct user ID
// accessToken: '24087425.1677ed0.bae9502b21d64bb0aa4f8cbd53e84898'
// https://github.com/stevenschobert/instafeed.js/issues/226 // this is users from hashtag

var loadButton = document.getElementById('load-more');
var feed = new Instafeed({
  // Every time we load more, run this function
  get: 'tagged',
  tagName: 'studionuumi',
  clientId: '928ee4b3df8744739718b79331aa4d4d',
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
