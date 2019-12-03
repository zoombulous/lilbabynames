Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    data: {
        contains: '',
        startsWith: '',
        sortBy: '',
        names: [],
        lastEvent: 0
    },
    watch: {
        startsWith() {
            this.throttledFindNames();
        },
        contains() {
            this.throttledFindNames();
        }
    },
    methods: {
        findNames() {
            axios.get(
                'http://names.sinistercode.com:4242/api/names?'
                    + 'format=json'
                    + '&sort=' + this.sortBy
                    + '&contains-letters=' + this.contains
                    + '&starts-with=' + this.startsWith
            ).then((response) => {
                    this.names = response.data.results.map(item => item.name);
                });
        },
        throttledFindNames() {
            t = (new Date()).getTime();
            if(t - this.lastEvent > 500)
                this.findNames();
            else
                this.lastEvent = t;
        }
    }
});
