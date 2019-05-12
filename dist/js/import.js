function gCallCpp(str) {
	var retString = "";
	try {
		retString = CallCpp(str);
	} catch (error) {
		//在错误发生时怎么处理
		console.log(error);
	}
	return retString;
}

function gDelFile(strdelfile)
{
	var retString = "";
	try {
		retString = CallCpp('delfile',strdelfile);
	} catch (error) {
		//在错误发生时怎么处理
		console.log(error);
	}
	return retString;
}

function gCallCpp(str,drivesjson) {
	var retString = "";
	try {
		retString = CallCpp(str,drivesjson);
	} catch (error) {
		//在错误发生时怎么处理
		console.log(error);
	}
	return retString;
}


function gCallPython(str) {
	var retString = "";
	try {
		retString = CallPython(str);
	} catch (error) {
		//在错误发生时怎么处理
		console.log(error);
	}
	return retString;
}

function gnumFilter(value) {
			// 截取当前数据到小数点后两位

			let realVal = parseFloat(value).toFixed(2); // num.toFixed(2)获取的是字符串

			return parseFloat(realVal);
		}
function gGetFileSize(filesize)
{
	if (filesize > 1024*1024*1024*1024)
	{
		return gnumFilter(filesize/1024/1024/1024/1024).toString() + "TB";
	}
	else if (filesize > 1024*1024*1024)
	{
		return gnumFilter(filesize/1024/1024/1024).toString() + "GB";
	}
	else if (filesize > 1024*1024)
	{
		return gnumFilter(filesize/1024/1024).toString() + "MB";
	}
	else
	{
		return gnumFilter(filesize/1024).toString() + "KB";
	}
}

function gGetDriveInfo() {
	var retstring = CallPython('getdriveinfo');
	console.log(retstring);
	return JSON.parse(retstring);
}
