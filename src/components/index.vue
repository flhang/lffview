<template>
	<div id="wrapperz">
		<div class="description">
			<div class="desc-icon"><img src="icon/external_drive_92px_1130306_easyicon.net.png" width="32" height="32" /></div>
			<div class="desc-text">
				<b>快速找出最占磁盘空间的大文件</b>
				<br />
				定期删除占用磁盘空间的无用大文件，释放更多磁盘空间！
			</div>
			<div class="desc-button"><button class="button success drop-shadow" @click="OnBtnScan()">扫描大文件</button></div>
			<div class="desc-button"><button class="button success drop-shadow" @click="OnTest()">TestPython</button></div>
			<div class="desc-button"><button class="button success drop-shadow" @click="OnAdd1()">TestResult</button></div>
		</div>
		
		<div class="dBody">
			<div class="mycontent ">
				
				<ul data-view="tiles" id="listview-2">
					<li class="listbutton" v-for="(item, i) in itemList">
						<div class="leftpart"><input type="checkbox" v-model="drives" :value="item.name" class="mycheck" /></div>
						<div class="rightpart">
							<div class="iconpart mif-5x"><span class="mif-drive fg-grayblue mif-6x"></span></div>
							<div class="devicepart">
								{{ item.label }}
								<div
									data-role="progress"
									v-bind:data-cls-bar="(item.used * 100) / item.drivecapacity > 50 ? 'bg-amber' : 'bg-green'"
									v-bind:data-value="(item.used * 100) / item.drivecapacity"
									data-small="true"
								></div>
							</div>
							<div class="rightbottompart">已用空间{{ GetFileSize(item.used) }},共{{ GetFileSize(item.drivecapacity) }}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- dbody -->
		<div id="dFoot">
			<div class="footcontent">
				
				<div style="bottom: 5px;">您当前已使用：{{ GetFileSize(allused)}}，硬盘大小：{{ GetFileSize(allcapacity)}}。 您已选中{{ drives }}</div>
				<div class="footprogress" data-role="progress" v-bind:data-value="(allused * 100) / allcapacity" data-small="true"></div>
			</div>
		</div>
		<!-- dfoot -->
	</div>
</template>

<script>
//debugger
console.log('index.vue:' + g_istesting);
//var gitemList = g_istesting ? test_getdriveinfo() : gGetDriveInfo();
/* only for test
 */

export default {
	data() {
		return {
			itemList: [],
			count: 1,
			drives: [],
			allused: 0,
			allcapacity: 0,
			message:"hello world"
		};
	},
	filters: {
		numFilter(value) {
			// 截取当前数据到小数点后两位

			let realVal = parseFloat(value).toFixed(2); // num.toFixed(2)获取的是字符串

			return parseFloat(realVal);
		}
	},

	mounted: function() {
		window.gindexUpdateIndex = this.gindexUpdateIndex;
		window.gGetDriveList = this.gGetDriveList;
		console.log('index.vue mounted');
		//debugger
		// 		this.itemList = g_istesting ? test_getdriveinfo() : gGetDriveInfo();
		// 		console.log(this.itemList + '\r\n');
		// 		for (var i=0 ; i<this.itemList.length; i++)
		// 		{
		// 			var item = this.itemList[i];
		//
		// 			this.allused = this.allused + item.used;
		// 			this.allcapacity = this.allcapacity + item.drivecapacity;
		// 			console.log(this.allused + '\r\n');
		// 		}

		gindexUpdateIndex();
		console.log('index mounted');
	},
	methods: {
		
		GetFileSize:function(str)
		{
			return gGetFileSize(str);
		},
	
		OnAdd1: function() {
			this.$router.push({ path: '/results' });
		},
		OnTest: function() {
			console.log(this.count);
			var retString = gCallPython('test2');
			console.log(decodeURI(retString));
			console.log(retString);

			Metro.dialog.create({
				title: 'Infomation',
				content: retString
			});
		},
		OnBtnScan: function() {
			//alert('hi');

			this.$router.push({ path: '/scan' });
			gCallCpp('startscan',JSON.stringify(this.drives));
			//this.$parent.onstartscan();
		},
		gGetDriveList:function()
		{
// 			var arrdrives = [];
// 			for (var i=0; i<this.drives.length; i++)
// 			{
// 				arrdrives.push(this.drives[i].name);
// 			}
			var str = JSON.stringify(this.drives);
			console.log('gGetDriveList!!!!!!!!!!!!!!');
			console.log(str);
			return str;
		},
		gindexUpdateIndex: function() {
			console.log('gindexUpdateIndex');
			
			this.itemList = g_istesting ? test_getdriveinfo() : gGetDriveInfo();
			this.allused = 0;
			this.allcapacity = 0;
			for (var i = 0; i < this.itemList.length; i++) {
				var item = this.itemList[i];

				this.allused = this.allused + item.used;
				this.allcapacity = this.allcapacity + item.drivecapacity;
				console.log(this.allused + '\r\n');
			}
		}
	},
	props: ['']
};
</script>

<style></style>
