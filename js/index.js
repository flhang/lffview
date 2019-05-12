
//import index from "../pages/index.js";
//import scan from "../pages/scan.js";
/*
index page main()
*/
var itemList = eItemDummy();
//var retstring = CppCall('getdriveinfo');
//alert(retstring);
//itemList = JSON.parse(retstring);

var scan =   {
 template:`
 <div class="description">
 	<div class="desc-icon">
 		<img src="icon/external_drive_92px_1130306_easyicon.net.png" width="32" height="32" />
 	</div>
 	<div class="desc-text">
 		<b> 扫描中</b>
 	</div>
 	<div class="desc-button">
 		<button class="button success drop-shadow" @click="OnBtnScan()">扫描大文件</button>
 	</div>
 
 </div>
 `
}


var index =  {
 template:`
 <div id='wrapperz'>
 <div class="description">
 	<div class="desc-icon">
 		<img src="icon/external_drive_92px_1130306_easyicon.net.png" width="32" height="32" />
 	</div>
 	<div class="desc-text">
 		<b>快速找出最占磁盘空间的大文件</b>
 		<br>定期删除占用磁盘空间的无用大文件，释放更多磁盘空间！
 	</div>
 	<div class="desc-button">
 		<button class="button success drop-shadow" @click="OnBtnScan()">扫描大文件</button>
 	</div>
 
 </div>
 <div class="dBody">
 
 
 
 	<div class="mycontent ">
 		<ul data-view="tiles" id="listview-2">
			
			
			
 			<li class="listbutton" v-for="(item,i) in childitemlist">
 				<div class="leftpart">
 					<input type="checkbox" class="mycheck">
 				</div>
 				<div class="rightpart">
 					<div class="iconpart mif-5x">
 						<span class="mif-drive fg-grayblue mif-6x"></span>
 					</div>
 					<div class="devicepart">
 						{{item.name}}
 						<div data-role="progress" v-bind:data-cls-bar="item.used*100/item.drivecapacity>50?'bg-amber':'bg-green'"
 						 v-bind:data-value="item.used*100/item.drivecapacity" data-small="true"></div>
 
 					</div>
 					<div class="rightbottompart">
 						已用空间{{item.used}}GB,共{{item.drivecapacity}}GB
 
 					</div>
 				</div>
 
 			</li>
 		</ul>
 	</div>
 
 
 </div><!-- dbody -->
 <div id="dFoot">
 	<div class="footcontent">
 		<div style="bottom: 5px;">您当前已使用：7.6TB，硬盘大小：10.4TB</div>
 		<div class="footprogress" data-role="progress" data-value="35" data-small="true"></div>
 	</div>
 
 </div><!-- dfoot -->
 </div>
 `
 ,
 methods: {
 	OnBtnScan:function() {
 		//alert('hi');
 		this.$router.push({path:'/scan'});
 	}
 },
 props:['childitemlist','test']
}





const routes = [{
		path: '/',
		component: index
	},
	{
		path: '/index',
		component: index
	},
	{
		path: '/scan',
		component: scan
	}
	
]

// 创建路由对象
const router = new VueRouter({
	routes // （缩写）相当于 routes: routes，es6的新语法
})

var vm = new Vue({
	
	el: '#app',
	data() {
		return {
			itemList: itemList,
			test:'test'
		}
	},
	components:{
		"index" : index
	}
	,
	router:router,
	mounted: function() {
		
		Metro.init();

	}
}).$mount('#app')



/*
 */

/*
index page actions
*/
$("input[name=r3]").on("click", function() {
	var checked = $(this).is(":checked");
	if (checked) {
		$("#listview-2").data("listview").view(this.value);
	}
});
$("input[name=r1]").on("click", function() {

	var checked = $(this).is(":checked");
	if (checked) {
		//debugger;
		$("#listview-1").data("listview").view(this.value);
		//var viewvalue = lv1.dataset.view;
		//lv1.dataset.view = this.value;
		//var t1 = $("#listview-1");
		//var t2 = t1.dataset.view;
		//	$("#listview-1").data("listview").view(this.value);


	}
});
/* only for test
 */
function eItemDummy() {

	var o = [{
		"name": "WINDOWS(C:)",
		"drivecapacity": 447,
		"used": 45
	}, {
		"name": "DOCUMENTS(D:)",
		"drivecapacity": 500,
		"used": 55
	}, {
		"name": "DOCUMENTS(D:)",
		"drivecapacity": 500,
		"used": 777
	}, {
		"name": "DOCUMENTS(D:)",
		"drivecapacity": 500,
		"used": 155
	}, {
		"name": "DOCUMENTS(D:)",
		"drivecapacity": 500,
		"used": 2.9
	}, {
		"name": "DOCUMENTS(D:)",
		"drivecapacity": 500,
		"used": 2.9
	}, {
		"name": "DOCUMENTS(D:)",
		"drivecapacity": 500,
		"used": 2.9
	}, {
		"name": "DOCUMENTS(D:)",
		"drivecapacity": 500,
		"used": 2.9
	}, {
		"name": "DOCUMENTS(D:)",
		"drivecapacity": 500,
		"used": 2.9
	}];
	return o;
}
