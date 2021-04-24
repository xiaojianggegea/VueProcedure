var app = new Vue({
	el: "#box",
	data: {
		query: "",
		musicList: [],
		musicUrl: '',
		musicCover: '',
		hotComments: [],
		isplaying:false
	},
	methods: {
		searchMusic: function() {
			var that = this;
			axios.get("https://autumnfish.cn/search?keywords=" + this.query)
				.then(function(response) {
						that.musicList = response.data.result.songs;
						console.log(response.data.result.songs);
					},
					function(err) {}
				);
		},
		playMusic: function(musicId) {
			var that = this;
			axios.get("https://autumnfish.cn/song/url?id=" + musicId)
				.then(function(response) {
						that.musicUrl = response.data.data[0].url;
					},
					function(err) {})
			axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
				.then(function(response) {
					that.musicCover = response.data.songs[0].al.picUrl;
				}, function(err) {})
			axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
				.then(function(response) {
					console.log(response.data.hotComments);
					that.hotComments = response.data.hotComments;
				}, function(err) {})
		},
		play:function(){
			this.isplaying = true;
		},
		pause:function(){
			this.isplaying = false;
		}
	}
})
