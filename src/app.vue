<template>
	<div id="app">
		<router-view >
		</router-view>
	</div><!-- app -->
</template>

<script>
	import index from './components/index.vue';
	import scan from './components/scan.vue';
	import results from './components/results.vue';
	
	
	export default {
		components: {
			"index": index,
			"scan": scan,
			"results" : results
		}
		
	};
</script>

<style>
</style>
