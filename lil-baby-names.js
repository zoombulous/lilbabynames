Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    data: {
        contains: '',
        startsWith: '',
        names: [],
	sortKey: ['baby_name'],
	sortOrder: ['asc'],
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
    computed: {
	namesSorted: function() {
	    return _.orderBy(this.names, this.sortKey, this.sortOrder);
	},
    },
    methods: {
        findNames() {
            axios.get(
                'http://names.sinistercode.com:4242/api/names?'
                    + 'format=json'
                    + '&sort=length-asc'
		//this is called later, so I probably need to change here
                    + '&contains-letters=' + this.contains
                    + '&starts-with=' + this.startsWith
            ).then(function (response) => {
                this.names = response.data.results.map(item => item.name);
	    });.catch(function(error) {
		console.log(error);
            });
	},
	sortBy: function(key) {
	    if (key == this.sortKey) {
		this.sortOrder = (this.sortOrder
				  == 'asc') ? 'desc' : 'asc';
	    } else {
		this.sortKey = key;
		this.sortOrder = 'asc';
	    }
        },
    }
});
