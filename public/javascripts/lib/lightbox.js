/*
 * html
 *
 * .lightbox-wrapper
 *   .lightbox[ref='lightbox']
 *     .lightbox-header
 *     .lightbox-content
 *     .lightbox-operations
 *
 * js
 *
 * lightbox = require('path_to_lightbox');
 * lightbox($el, context);
 */

let lightbox = ($el, context, opts) => {
    let duration = 300;
    let options = Object.assign({}, {
        clickHide: true,
    }, opts);

    context.hide = () => {
        $el.fadeOut({duration});
    }

    context.show = () => {
        $el.fadeIn({duration});

        let w = context.$refs.lightbox.clientWidth;
        let h = context.$refs.lightbox.clientHeight;

        let bodyW = $('body').width();
        let bodyH = $('body').height();

        // vertical align middle inline element instead of
        // absolute position.
        $el.css({
            lineHeight: bodyH + 'px',
        });
        //$el.find('.lightbox').css({
        //    top: (bodyH - h) / 2,
        //    left: (bodyW - w) / 2,
        //});
    }

    $el.find('.close').on('click', context.hide);
    if (options.clickHide) {
        $el.on('click', context.hide);
    }
    //$el.find('.lightbox').on('click', (e) => {
    //    e.preventDefault();
    //    e.stopPropagation();
    //});
    $el.find('.ok.button').on('click', context.hide);
}

module.exports = lightbox;
