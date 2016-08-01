(function ($) {

  $.fn.smoothScroll = function(options) {

    var settings = $.extend({}, $.fn.smoothScroll.defaults, options);

    this.click(function (e) {
      e.preventDefault();
      settings.link = this;

      $('body,html').animate({
        scrollTop: $(settings.target).offset().top + settings.offset
      }, {
        duration: settings.duration,
        easing: settings.easing,
        complete: function(){
            if( settings.scrollComplete && $.isFunction(settings.scrollComplete) ) {
              settings.scrollComplete.call(settings.link,settings)
            }
        }
      });
      $(this).blur();

      return this;
    });

  };

  $.fn.smoothScroll.defaults = {
      target: 'body',
      duration: 1000,
      offset: 0,
      easing: 'swing',
      scrollComplete:null
  }

}(jQuery));
