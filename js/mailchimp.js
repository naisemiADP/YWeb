(function($) {
	'use strict';
	window.sr_mailchimp_subscribe = function( formId, apiKey, listId, buttonText, successMsg, loadingText ) {

		$( '#'+formId ).on('submit', function(e) {
			e.preventDefault();

			var self = $(this);
			
			self.find('.sr-mailchimp-subscribe').addClass( 'button--loading' );
			self.find('.sr-mailchimp-subscribe span').html( loadingText );
			$.ajax({
				url: sonaarMailchimp.ajax_url,
				type: 'POST',
				data: {
					action: 'sr_mailchimp_subscribe',
					fields: self.serialize(),
					apiKey: apiKey,
					listId: listId
				},
				success: function(data) {
					self.find('.sr-mailchimp-fields-wrapper').after( '<div class="sr-mailchimp-message"><p>'+successMsg+'</p></div>' );
					self.find('input[type=text], input[type=email], textarea').val('');

					self.find('.sr-mailchimp-subscribe').removeClass( 'button--loading' );
					self.find('.sr-mailchimp-subscribe span').html( buttonText );
				}
			});
		})
	}

})(jQuery);

