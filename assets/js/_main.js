/*! Plugin options and other jQuery stuff */

// FitVids options
$(function () {
    $("article").fitVids();
});

// Table of Contents toggle
$(function () {
    $(".toc h3").click(function () {
        $("#drawer").toggleClass("hidden");
    });
});

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// Magnific-Popup options
$(document).ready(function () {
    $('.image-popup').magnificPopup({
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
        },
        removalDelay: 300, // Delay in milliseconds before popup is removed
        // Class that is added to body when popup is open.
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: 'mfp-fade'
    });

    $('.login-with-facebook').click(function () {
        FB.login(function (response) {
            if (response.authResponse) {
                FB.api('/me', function (response) {
                    $('[name=name]').val(response.name);
                    $('[name=email]').val(response.email);
                });
            } else {

            }
        }, {scope: 'email'});
    });

    $('.login-with-google').click(function () {
        gapi.auth.authorize({
            client_id: '786886532575.apps.googleusercontent.com',
            immediate: false,
            scope: ['https://www.googleapis.com/auth/userinfo.email']

        }, function () {
            gapi.client.load('plus', 'v1', function () {
                // Step 5: Assemble the API request
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                // Step 6: Execute the API request
                request.execute(function (response) {
                    $('[name=name]').val(response.displayName);
                });
            });

            gapi.client.load('oauth2', 'v2', function () {
                var request = gapi.client.oauth2.userinfo.get();
                request.execute(function (response) {
                    $('[name=email]').val(response.email);
                });
            });
        });
    });

    $.scrollUp();

    $('form').submit(function (e) {
        var self = $(this);

        if (self.parsley('validate') && !self.attr('already-submitted')) {
            $('input[type=submit]').attr("disabled", true);
            self.attr('already-submitted', true);

            mixpanel.track(self.attr('mixpanel-form-name') + ' form submitted', {}, function () {
                self.submit();
            });

            return false;
        }

        return true;
    });

    $('.post-with-facebook').click(function () {

        FB.ui({
            method: 'feed',
            link: 'http://google.com',
            caption: 'Birth defacts',
        }, function (response) {

        });

    });

    $('.post-with-twitter').click(function () {
        var msg = encodeURIComponent('We are the attorny network');
        var url = encodeURIComponent('http://www.birthdefectsettlement.com/');
        var link = 'http://twitter.com/intent/tweet?text=' + msg + '&url=' + url;

        var left = ($(window).width() / 2) - (600 / 2),
            top = ($(window).height() / 2) - (450 / 2);

        window.open(link, "Twitter", "width=600, height=450, top=" + top + ", left=" + left);
    });
});

