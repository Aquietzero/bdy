const i18n = require('./i18n.js');
let cache = require('./cache.js');
const Event = require('./event.js');

const ORDER_CONSTANTS = require('../../../constants/order.js');
const PRECISION = ORDER_CONSTANTS.precision;

module.exports = (Vue, page) => {
    Vue.mixin({
        methods: {
            formatTime(date, format) {
                if (!date) return;

                if (!date.getDate) {
                    date = new Date(date);
                }

                return [
                    date.toLocaleDateString(), date.toLocaleTimeString()
                ].join(' ');
            },

            trailingZeros(num) {
                num = String(Number(num).toFixed(PRECISION));
                let zeros = '';
                for (let i = num.length - 1; i > 0; --i) {
                    if (num[i] != 0) break;
                    zeros += '0';
                }

                num = num.replace(new RegExp(`${zeros}$`, 'g'), '');
                return {num, zeros};
            },

            dateFormat(date, fmt) {
                let D = new Date(date),
                    o = {
                        'M+':D.getMonth()+1,
                        'd+':D.getDate(),
                        'H+':D.getHours(),
                        'm+':D.getMinutes(),
                        's+':D.getSeconds()
                    };
                    if( /(y+)/.test(fmt) ) {
                        fmt = fmt.replace(RegExp.$1,(D.getFullYear()+'').substr(4-RegExp.$1.length));
                    }
                    for(let k in o) {
                        if( RegExp('('+k+')').test(fmt) ) {
                            fmt = fmt.replace(RegExp.$1,RegExp.$1.length === 1?o[k]:o[k]>9?o[k]:'0'+o[k]);
                        }
                    }

                    return fmt;
            },

            fixedNum(val, count) {
                return (+val).toFixed(count);
            }
        }
    });

    let specialMixins = {
        data() {
            return {
                user: {},
                i18n,
            };
        },

        mounted() {
            this.fetchUser();
            Event.$on('FETCH:USER', this.fetchUser);

            let lang = cache.get('lang');
            if (lang) this.changeLanguage(lang);

            window.onfocus = () => {
                Event.$emit('WINDOW:FOCUS');
            }
            window.onblur = () => {
                Event.$emit('WINDOW:BLUR');
            }
        },

        methods: {
            changeLanguage(lang) {
                cache.set('lang', lang);

                i18n.getTranslation(page, lang, (err) => {
                    if (!err) i18n.locale = lang;
                });
                Event.$emit('change:language', lang);
            },

            fetchUser() {
                $.ajax({
                    url: '/me',
                    success: (res) => {
                        if (!res.message || res.message != 'ok') return;
                        this.user = res.data
                        // if (this.user && this.checkWhitelistStatus)
                        //     this.checkWhitelistStatus();
                        Event.$emit('user:fetched', this.user._id);
                    }
                });
            }
        }
    };

    return specialMixins;
}
