Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    data: {
        contains: '',
        startsWith: '',
        names: [],
        last_event: 0,
        cancel: 0
    },
    watch: {
        contains() {
            t = (new Date()).getTime();
            if(t - this.last_event > 500)
                this.findNames();
            this.last_event = t;
        }
    },
    methods: {
        findNames() {
            axios.get(
                'http://names.sinistercode.com:4242/api/names?'
                    + 'format=json'
                    + '&sort=length-asc'
                    + '&contains-letters=' + this.contains
                    + '&starts-with=' + this.startsWith
            ).then((response) => {
                    this.names = response.data.results.map(item => item.name);
                });
        }
    }
});
