// Magnific-Popup options
$(document).ready(function () {
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
            client_id: site.social.googleKey,
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

    startIfBiggerThen(768, $.scrollUp);

    $('form').submit(function (e) {
        var self = $(this);
        var formName = self.attr('mixpanel-form-name');

        if (self.parsley('validate') && !self.attr('already-submitted')) {
            $('input[type=submit]').attr("disabled", true);
            self.attr('already-submitted', true);


            mixpanel.track(formName + ' form submitted', {}, function () {
                self.submit();
            });

            return false;
        }

        if (!self.parsley('validate'))
            mixpanel.track(formName + ' incomplete form submitted');

        return true;
    });

    $('.post-with-facebook').click(function () {

        FB.ui({
            method: 'feed',
            link: 'http://google.com',
            caption: 'Birth defacts'
        }, function (response) {
            if (response.post_id)
            mixpanel.track('Posted to facebook', {
                id: response.post_id
            })
        });

    });

    $('.post-with-twitter').click(function () {
        var msg = encodeURIComponent(site.social.thankYouTweet);
        var url = encodeURIComponent(site.url);
        var link = 'http://twitter.com/intent/tweet?text=' + msg + '&url=' + url;

        var left = ($(window).width() / 2) - (600 / 2),
            top = ($(window).height() / 2) - (450 / 2);

        window.open(link, "Twitter", "width=600, height=450, top=" + top + ", left=" + left);
    });

    function startIfBiggerThen(size, callback) {
        if ($(window).width() >= size)
            callback();
    }
});

