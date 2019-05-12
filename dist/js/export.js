var g_istesting = true;
// function g_getistesting()
// {
// 	
// 	console.log('export.js:'+g_istesting);
// 	return g_istesting;
// }
function jsDisableTest()
{
	console.log("js_disabletest");
	g_istesting = false;
	//gitemList = gGetDriveInfo();
	gindexUpdateIndex();
}

function jsUpdateScanMsg(str) {
	gscanUpdateScanMsg(str);
}

function jsSetResults(str)
{
	console.log("jsSetResults");
	gSetResults(str);
}

function jsGetDriveList()
{
	var str = gGetDriveList();
	console.log('jsGetDriveList!!!!!!!!!!!!!!');
	console.log(str);
	return str;
}
function jsMsg(str)
{
	console.log('jsMsg' + str);
	if (str == "scanfinished")
	{
		gscanOnFinished();
	}
}