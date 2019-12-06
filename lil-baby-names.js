Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        contains: '',
        startsWith: '',
        sortBy: 'alpha',
        gender:'male,female',
        minLength:'1',
        maxLength:'25',
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
                    + '&gender=' + this.gender
                    + '&sort=length&min-length=' + this.minLength
                    + '&sort=length&max-length=' + this.maxLength
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
