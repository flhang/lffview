<template>
	<div id="wrapperz">
		<div class="description">
			<div class="desc-icon"><img src="icon/external_drive_92px_1130306_easyicon.net.png" width="32" height="32" /></div>
			<div class="desc-text">
				<b>扫描结果</b>
				<br />
			</div>
		</div>

		<div class="dBodyScan">
			<div class="resultcontent ">
				<div id="resultleft">
					<ul
						data-selectable="true"
						data-role="listview"
						data-view="table"
						data-select-node="true"
						data-structure="{&quot;size&quot;: true, &quot;name&quot;: true, &quot;drive&quot;: true}"
						v-for="(item, i) in results"
					>
						<li
							data-icon="<span class='mif-folder fg-orange'>"
							v-bind:data-caption="GetFileName(item.path)"
							class="tooltip"
							v-bind:title="item.path"
							v-bind:data-size="item.size"
							v-bind:data-drive="GetDriveName(item.path)"
						></li>
					</ul>
				</div>
				<div id="resultright"><div id="main"></div></div>
			</div>
		</div>
		<!-- dbody -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			results: [],
			chartData: {
				columns: ['日期', '访问用户'],
				rows: [
					{ 日期: '1/1', 访问用户: 1393 },
					{ 日期: '1/2', 访问用户: 3530 },
					{ 日期: '1/3', 访问用户: 2923 },
					{ 日期: '1/4', 访问用户: 1723 },
					{ 日期: '1/5', 访问用户: 3792 },
					{ 日期: '1/6', 访问用户: 4593 }
				]
			}
		};
	},
	mounted: function() {
		console.log('...................................');
		var myChart = echarts.init(document.getElementById('main'));

		// 指定图表的配置项和数据
		var option = {
			series: [
				{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					data: [
						{ value: 235, name: '视频广告' },
						{ value: 274, name: '联盟广告' },
						{ value: 310, name: '邮件营销' },
						{ value: 335, name: '直接访问' },
						{ value: 400, name: '搜索引擎' }
					]
				}
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		this.results = test_getresults();
		console.log(this.results);
	},
	methods: {
		GetFileName: function(str) {
			var arr = str.split('\\');
			return arr[arr.length - 1];
		},
		GetDriveName: function(str) {
			var arr = str.split('\\');
			return arr[0].toUpperCase();
		}
		//dlg.myParent = this;
		//debugger
		//alert(dlg);
	},
	props: ['']
};
</script>

<style></style>
