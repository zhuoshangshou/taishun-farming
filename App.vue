<script>
	import storeUtils from '@/utils/storeUtils';
	export default {
		onLaunch: function() {
			var env_option = {
				env:process.env.NODE_ENV,
				platform:process.env.UNI_PLATFORM,
				api_url:process.env.BASE_API_URL
			}
			console.log('APP onLaunch',env_option)
		},
		onShow: function() {
			//console.log('App Show')
			storeUtils.storageStoreInit()
		},
		onHide: function() {
			//console.log('App Hide')
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	@import "./uni.scss";
	@import "./styles.scss";
</style>
