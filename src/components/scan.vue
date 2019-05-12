<template>
	<div id="wrapperz">
		<div class="description">
			<div class="desc-icon"><img src="icon/external_drive_92px_1130306_easyicon.net.png" width="32" height="32" /></div>
			<div class="desc-text">
				<b>正在扫描{{currentdrive}}盘...</b>
				<br />
				分析完成后会自动帮您找出该盘内的大文件!
			</div>
			<div class="desc-button"><button class="button success drop-shadow" @click="onBtnExit()">终止扫描</button></div>
		</div>
		<div class="dBodyScan">
			<div class="mycontent ">
				<div id="scancontent">
					正在帮您找出{{currentdrive}}盘中的大文件...
					<div id="scanprogress" data-role="progress" data-value="35" data-small="true"></div>
					<div id="scaningfile">{{scanMsg}}</div>
				</div>
			</div>
		</div>
		<!-- dbody -->
	</div>
</template>

<script>

export default {
	data() {
		return {
			scanMsg: g_istesting?"载入中...":"",
			currentdrive: ''
		}
	},
	mounted: function() {
		window.gscanUpdateScanMsg = this.gscanUpdateScanMsg;
		window.gscanOnScanStop = this.gscanOnScanStop;
		window.gscanOnFinished = this.gscanOnFinished;
	
	},
	methods: {
		gscanOnScanStop:function()
		{
			console.log('scanOnScanStop');
			gCallCpp("stopscan");
			this.$router.push({ path: '/' });
			//alert('g_onterminatescan');
		},
		gscanUpdateScanMsg: function(str) {
			this.scanMsg = str;
			this.currentdrive = str.substr(0,1);
		},
		gscanOnFinished: function(str){
			console.log('gscanOnFinished');
			this.scanMsg = "已完成扫描";
			this.$router.push({ path: '/results' });
		},
		onBtnExit: function() {
			//alert('hi');
			//this.$router.push({ path: '/' });
			
			var dlg = Metro.dialog.create({
            title: "查找大文件提示您?",
            content: "<div>您确定要终止本次扫描？</div>",
			
            actions: [
                {
                    caption: "继续分析",
                    cls: "js-dialog-close alert",
                    onclick: function(){
                        //alert("You clicked Agree action");
                    }
                },
                {
                    caption: "终止分析",
                    cls: "js-dialog-close",
                    onclick: function(){
						gscanOnScanStop();
						//alert(this);
                        //alert("You clicked Disagree action");
					   
                    }
                }
            ]
        });//
		//dlg.myParent = this;
		
		//debugger
		//alert(dlg);
		}
	},
	props: [ '']
};
</script>

<style></style>
