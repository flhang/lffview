<template>
	<div id="wrapperz">
		<div class="description">
			<div class="desc-icon"><img src="icon/external_drive_92px_1130306_easyicon.net.png" width="32" height="32" /></div>
			<div class="desc-text">
				<b>您当前已选择{{files.length}}个大文件，删除后可帮您获得{{GetSelectedFileSize()|numFilter}}GB的磁盘空间。</b>
				<br />
			</div>
			
			<div class="desc-button"><button class="button success drop-shadow" @click="OnBtnDel()">删除</button></div>
			<div class="desc-return"><router-link to="/">返回</router-link></div>
		</div>
		
		<div class="dBodyScan">
			<div class="resultcontent" >
				<div class="resultleft " >
					
					<!--<ul v-for="(item, i) in results">-->
					 <virtual-list
					  :min-size="30"
					  :total="results.length"
					  height="100%"
					  
					  class="scroll"
					>
					
					  <div
					    class="filelist"
					    v-for="(item,i) in results"
					    :key="i"
						
						v-tip="item.path"
					  >
					  <span>
					  	<div class="lifilecheck"><input type="checkbox" class="mycheck" v-model="files" :value="i"/></div>
					  	<div class="lifileicon"><div class="mif-file-text fg-grayblue mif-5x"></div></div>
					  	<div class="lifilename">{{GetFileName(item.path)}}</div>
					  	<div class="lifiledrive">{{GetDriveName(item.path)}}</div>
					  	<div class="lifilesize">{{GetFileSize(item.size)}}</div>
					  </span>
					  
					  </div>
					  
					</virtual-list>
					<!--
					 <vl>
						<div  class="filelist" v-for="(item,i) in results" v-tooltip="item.path">
							<span>
								<div class="lifilecheck"><input type="checkbox" class="mycheck" v-model="files" :value="i"/></div>
								<div class="lifileicon"><div class="mif-file-text fg-grayblue mif-5x"></div></div>
								<div class="lifilename">{{GetFileName(item.path)}}</div>
								<div class="lifiledrive">{{GetDriveName(item.path)}}</div>
								<div class="lifilesize">{{item.size/1024/1024|numFilter}}MB</div>
							</span>
						</div>
						 </vl>
						-->
					<!--</ul>-->
				</div>
				<div class="resultright"><ve-ring :data="chartData" :settings="chartSettings" :extend="percentExtend"></ve-ring></div>
			</div>
		</div>
		<!-- dbody -->
	</div>
</template>

<script>
  //import virtualList from 'vue-virtual-scroll-list'
import vl from 'vue-virtual-list';
 //import BScroll from 'better-scroll';
export default {
	components:{
		//BScroll
		//vl
		//"virtual-list":virtualList
	},
	filters: {
		numFilter(value) {
			// 截取当前数据到小数点后两位
	
			let realVal = parseFloat(value).toFixed(2); // num.toFixed(2)获取的是字符串
	
			return parseFloat(realVal);
		}
	},
	data() {
		this.chartSettings = {
			label: 'aabbcc'
		};
		this.chartData={
				columns: ['类型', '大小'],
				rows: [
					{ 类型: '文档', 大小: 0 },
					{ 类型: '图像', 大小: 0 },
					{ 类型: '视频', 大小: 0 },
					{ 类型: '音乐', 大小: 0 },
					{ 类型: '压缩', 大小: 0 },
					{ 类型: '其它', 大小: 0 }
				]
			}
		return {
		
			results: [],
			files:[],
			tooltipContent:"hello",
			percentExtend: {
                    series: {
                        tooltip: {
                            show: true,
                                formatter: function(params){
                                  console.log(params)
                                    if(params.seriesIndex == 0){
                                        var str = (params.data['name']) +' : ' + gGetFileSize(params.data['value']);
                                        return str
                                 }
                            }
                        }
                    },
                    legend: {
                        bottom: 10
                    }
                }

			
		};
	},
	mounted: function() {
		window.gOnBtnDel = this.gOnBtnDel;
		window.gSetResults = this.gSetResults;
		console.log('...................................');
		this.results = g_istesting ? test_getresults() : [];
		gCallCpp('getresults');
		// test_getresults();
		//console.log(this.results);
	
		console.log(" results.mounted");
// 		this.$nextTick(() => {
//         this.scroll = new BScroll(this.$refs.wrapper, {})
//       })
		//rowHeight.rowHeight = 100;
	},
	methods: {
		gSetResults:function(str)
		{
			console.log(str);
			this.results = JSON.parse(str);;
			var row = [];
			var docsize = 0;
			var othersize = 0;
			var imgsize = 0;
			var videosize = 0;
			var musicsize = 0;
			var zipsize = 0;
			
			for (var i =0; i<this.results.length; i++)
			{
				var item = this.results[i];
				var ext = item.path.split('.').pop();
				
				
				if (ext == 'txt' || ext == 'doc' || ext =='xls' || ext == 'docx'|| ext == 'ppt'|| ext == 'pptx')
				{
					docsize += item.size;
				}
				else if (ext == 'jpg' || ext == 'jpeg' || ext =='png' || ext == 'bmp')
				{
					imgsize += item.size;
				}
				else if (ext == 'mp4' || ext == 'avi' || ext =='mpeg' || ext == 'rmvb'|| ext == 'rm')
				{
					videosize += item.size;
				}
				else if (ext == 'mp3' || ext == 'wav')
				{
					musicsize += item.size;
				}
				else if (ext == 'rar' || ext == 'zip' || ext =='7z'|| ext =='tar' || ext == 'gz')
				{
					zipsize += item.size;
				}
				else
				{
					othersize += item.size;
				}
				
				
			}
			
			this.chartData={
					columns: ['类型', '大小'],
					rows: [
						{ 类型: '文档', 大小: docsize},
						{ 类型: '图像', 大小: imgsize },
						{ 类型: '视频', 大小: videosize },
						{ 类型: '音乐', 大小: musicsize },
						{ 类型: '压缩', 大小: zipsize },
						{ 类型: '其它', 大小: othersize }
					]
				}
		},
		GetFileSize:function(str)
		{
			return gGetFileSize(str);
		},
		GetSelectedFileSize: function()
		{
			var totalsize= 0;
			for (var i = 0; i< this.files.length; i++)
			{
				
				//console.log(this.results[this.files[i]]);
				totalsize += this.results[this.files[i]].size/1024/1024/1024;
			}
			return totalsize;
		},
		GetFileName: function(str) {
			var arr = str.split('\\');
			return arr[arr.length - 1];
		},
		GetDriveName: function(str) {
			var arr = str.split('\\');
			return str[0].toUpperCase() + '盘';
		},
		gOnBtnDel:function()
		{
			console.log("gOnBtnDel");
			var totalsize= 0;
			var tmpresults = [];
			
			for (var i=0; i<this.results.length; i++)
			{
				var bdel = false;
				for (var j=0; j<this.files.length; j++)
				{
					if (i == this.files[j])
					{
						bdel = true;
						
					}
				}
				if (!bdel)
				{
					tmpresults.push(this.results[i]);
				}
				else
				{
					gDelFile(this.results[i].path);
				}
			}
			this.results = tmpresults;
			this.files = [];
			
		},
		OnBtnDel:function()
		{
			var dlg = Metro.dialog.create({
			title: "查找大文件提示您?",
			content: "<div>您确定要删除所选文件？</div>",
			
			actions: [
			    {
			        caption: "取消",
			        cls: "js-dialog-close alert",
			        onclick: function(){
			            //alert("You clicked Agree action");
			        }
			    },
			    {
			        caption: "删除",
			        cls: "js-dialog-close",
			        onclick: function(){
						
					   gOnBtnDel();
			        }
			    }
			]//actions
		});//end of dialog
		}//end of function
		//dlg.myParent = this;
		//debugger
		//alert(dlg);
	},
	props: ['']
};
</script>

<style></style>
