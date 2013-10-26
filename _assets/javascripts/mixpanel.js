function dir(elem, dir2) {
    var matched = [],
        cur = elem[dir2];

    while (cur && cur.nodeType !== 9) {
        if (cur.nodeType === 1) {
            matched.push(cur);
        }
        cur = cur[dir2];
    }
    return matched;
}

function indexOf(el) {
    return el && el.parentNode ? dir(el, "previousSibling").length : -1;
}

function getClassSelector(el) {
    return el.className && el.className.split(' ')
        .map(function (className) {
            return '.' + className;
        })
        .join('');
}
function getIdSelector(el) {
    return el.id ? '#' + el.id : '';
}

function getNodeName(el) {
    return (el.nodeName).toLowerCase();
}

function getChildIndex(el) {
    var index = indexOf(el);
    if (!index || el.tagName === 'BODY') {
        return '';
    }
    return ':nth-child(' + (index + 1) + ')';
}

function cssPath(el, path) {
    path = path || [];
    if (!el || getNodeName(el) === 'html') {
        return path;
    }

    var elSelector = [getNodeName, getIdSelector, getClassSelector, getChildIndex]
        .map(function (func) {
            return func(el);
        }) // apply functions
        .filter(function (item) {
            return !!item;
        }) // remove non-results
        .join('').trim();

    path.unshift(elSelector);
    return cssPath(el.parentNode, path);
}


$.fn.scrollStopped = function (callback) {
    $(this).scroll(function () {
        var self = this, $this = $(self);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, 250, self));
    });
};


$(function () {
    $('[mixpanel-hook]').each(function () {
        var self = $(this);
        self.on(self.attr('mixpanel-hook'), function () {
            mixpanel.track(self.attr('mixpanel-event-name'));
        });
    });

    $('[mixpanel-track-links]').each(function () {
        var linkText = $(this).closest('[mixpanel-track-links]').attr('mixpanel-track-links');

        mixpanel.track_links(cssPath(this)[0] + ' a', linkText);
    });

    $('form').each(function () {
        var self = $(this);

        self.on('blur', '[name]', function () {
            mixpanel.track(self.attr('mixpanel-form-name') + ' form filled', {
                field: $(this).attr('name'),
                value: $(this).val()
            });
        });

    });



    var viewportHeight = $(window).height();
    var lastPage = 1;
    $(window).scrollStopped(function () {
        var currentPage = Math.ceil($(window).scrollTop() / viewportHeight);
        if (currentPage !== lastPage && currentPage > 1) {
            mixpanel.track('Scrolled to page', {page: currentPage});
            lastPage = currentPage;
        }
    });

});


