import * as $ from 'jquery';

export function tabChanged(index?: number) {
    index = index ?? 0;
    localStorage.setItem('tabIndex', index.toString());
    setTimeout(() => {
        if (index == undefined) {
            $('.form-tabs .p-tabview-nav li').each(function(i,e) {
                if ($(e).hasClass('p-highlight')) index = i
            })
        }
        if (index != undefined) {
            var active = $('.form-tabs').find('li').get(index);
            if (active) {
                $('.form-tabs-bg').width($(active).width()!);
                $('.form-tabs-bg').height(($(active).height() ?? 1) + 1);
                $('.form-tabs-bg').animate({
                    left: ($(active).position()!.left) + 'px',
                    top: ($(active).position()!.top) + 'px',
                    width: ($(active).outerWidth()) + 'px',
                }, 300)
            }
        }
    }, 100);
}
