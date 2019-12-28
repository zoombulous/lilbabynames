Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        contains: '',
        startsWith: '',
        sortBy: 'alpha',
        gender:'male,mostly-male,neutral,mostly-female,female',
        minLength:'1',
        maxLength:'25',
        names: [],
        pageSize: [10000000000000],
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
                    + '&gender=' + this.gender
                    + '&sort=length&min-length=' + this.minLength
                    + '&sort=length&max-length=' + this.maxLength
                    + '&page-size=' + this.pageSize
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
    },
    return: {
        fontSize: 10
    }
});
