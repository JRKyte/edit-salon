// Scroll spy

$(document).ready(function() {
  $('body').scrollspy({
    target: '#navbar',
    offset: 90
  });
});

// Hero section resize & hex movement

$(document).ready(function () {
	$("#hero").height($(window).height() - 86);
	$(window).resize(function () {
	  $("#hero").height($(window).height() - 86);
	});
});

// Smooth scroll

$('.scroll').click(function (e) {
  e.preventDefault();
  $("html,body").animate({
    scrollTop: $(this.hash).offset().top
  });
});

// Instagram feed

//   userId: 24087425,
//   accessToken: '24087425.1677ed0.bae9502b21d64bb0aa4f8cbd53e84898',

// Set size of feed based on screen
var instafeedLimit = 5;

// JS Media query
if (matchMedia) {
  var mq = window.matchMedia("(min-width: 767px)");
  mq.addListener(WidthChange);
  WidthChange(mq);
}

// Check if the media query is true or false
function WidthChange(mq) {
  if (mq.matches) {
    instafeedLimit = 7;
  }
  else {
    instafeedLimit = 5;
  }
}

// Load instafeed with options

var loadButton = document.getElementById('load-more');
var feed = new Instafeed({
  // Every time we load more, run this function
  get: 'tagged',
  tagName: 'studionuumi',
  clientId: '928ee4b3df8744739718b79331aa4d4d',
  template: '<div class="instafeed__item" style="background-image: url({{image}});"><div class="instafeed__item--contaniner"><div class="table"><a href="{{link}}" class="table-cell">View large</a></div></div></div>',
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
