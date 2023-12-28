(function ($) {
	"use strict";

	var isEditMode = false;
	

	var MailChimp = function ($scope, $) {
		var $mailChimp                    = $scope.find('.sr-mailchimp-wrap').eq(0),
			$mailchimp_id                 = ($mailChimp.data("mailchimp-id") !== undefined) ? $mailChimp.data("mailchimp-id") : '',
			$api_key                      = ($mailChimp.data("api-key") !== undefined) ? $mailChimp.data("api-key") : '',
			$list_id                      = ($mailChimp.data("list-id") !== undefined) ? $mailChimp.data("list-id") : '',
			$button_text                  = ($mailChimp.data("button-text") !== undefined) ? $mailChimp.data("button-text") : '',
			$success_text                 = ($mailChimp.data("success-text") !== undefined) ? $mailChimp.data("success-text") : '',
			$loading_text                 = ($mailChimp.data("loading-text") !== undefined) ? $mailChimp.data("loading-text") : '';
		//debugger;
		
		sr_mailchimp_subscribe( 'sr-mailchimp-form-'+ $mailchimp_id +'', $api_key , $list_id , $button_text , $success_text , $loading_text );
	}


	$(window).on('elementor/frontend/init', function () {

		//Apply in the Editor mode only
		if ( elementorFrontend.isEditMode() ) { 
			isEditMode = true; 

			//Load Music Player content in the Editor mode
			elementorFrontend.hooks.addAction( 'frontend/element_ready/music-player.default', function( ) {
				if (typeof setIronAudioplayers == 'function') { 
					setIronAudioplayers();
				}
			});

			//Load Podcast Player content in the Editor mode
			elementorFrontend.hooks.addAction( 'frontend/element_ready/podcast-player.default', function( ) {
				if (typeof setIronAudioplayers == 'function') { 
					setIronAudioplayers();
				}
			});
			
			//Podcast Archive content in the Editor mode
			elementorFrontend.hooks.addAction( 'frontend/element_ready/podcast-archive.default', function( ) {
				$('.sonaar-list').each( function(){
					var maxEpisode = $(this).data('item-per-page')
					$(this).find('.sonaar-podcast-list-item').each( function(index){
						if(index >= maxEpisode){
							$(this).hide();
						}
					})
				})
			});

			//Parallax Grid content in the Editor mode
			elementorFrontend.hooks.addAction( 'frontend/element_ready/parallaxgrid.default', function( ) {
				if (typeof setIronAudioplayers == 'function') { 
					IRON.grid_column();
				}
			});
		
		}

		elementorFrontend.hooks.addAction('frontend/element_ready/sonaar-mailchimp.default', MailChimp);

	});

}(jQuery));