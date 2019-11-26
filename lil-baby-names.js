Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    data: {
        contains: '',
        startsWith: '',
        names: [],
	sortKey: ['baby_name'],
	sortValue: ['sort_value'],
	orderIndex: ['asc'],['desc'],
	order: [],
        last_event: 0,
        cancel: 0
    },
 watch: {
        startsWith() {
            this.throttledFindNames();
        },
        contains() {
            this.throttledFindNames();
        }
    },
    computed: {
	namesSorted: function() {
	    return _.orderBy(this.names, this.sortKey, this.orderIndex,);
	},
    },
    methods: {
        findNames() {
            axios.get(
                'http://names.sinistercode.com:4242/api/names?'
                    + 'format=json'
		    + '&sort='
		    + 'this.sort'
                    + '&contains-letters=' + this.contains
                    + '&starts-with=' + this.startsWith
            ).then(function (response) => {
                this.names = response.data.results.map(item => item.name);
	    });.catch(function(error) {
		console.log(error);
            });
	},
	throttledFindNames() {
            t = (new Date()).getTime();
            if(t - this.lastEvent > 500)
                this.findNames();
            else
                this.lastEvent = t;
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
