import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import index from './components/index.vue';
import scan from './components/scan.vue';
import results from './components/results.vue';
import VCharts from 'v-charts'
Vue.use(VCharts);
//import VTooltip from 'v-tooltip'

//Vue.use(VTooltip);
//Vue.directive('tooltip', VTooltip.VTooltip);
import Vtip from 'vtip'
import 'vtip/lib/index.min.css'
// 注册指令使用
Vue.use(Vtip.directive)
// 工具函数调用
Vue.prototype.$tip = Vtip.tip


import VirtualScroll from './components/vl'
import { VirtualList, VirtualListItem } from '../lib/index'



Vue.use(VirtualScroll)
  .use(VirtualList)
  .use(VirtualListItem)

//import VTooltip from 'v-tooltip';

//Vue.use(VTooltip);
Vue.use(VueRouter);
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。


//var retstring = CppCall('getdriveinfo');
//alert(retstring);
//itemList = JSON.parse(retstring);


const routes = [{
		path: '/',
		component: index,
	
	},
	{
		path: '/index',
		component: index,
		
	},
	{
		path: '/scan',
		component: scan,
	
	},

	{
		path: '/results',
		component: results,
	
	}

]

// 创建路由对象
const router = new VueRouter({
	routes // （缩写）相当于 routes: routes，es6的新语法
})

var vm = new Vue({
	template: `<App />`,
	el: '#app',

	components: {
		"App": App,
		//"VTooltip": VTooltip
	},
	router: router,
	mounted: function() {
		Metro.init();
		gCallCpp('vuemounted');
		console.log("vuemounted");
	},

}).$mount('#app')

//vue_oncppmsg(`c:\\tset\\aa.txt`);

/*
 */

/*
index page actions

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
*/
