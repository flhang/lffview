function test_getdriveinfo() {

	var o = [{
			"label": "WINDOWS(C:)",
			"name": "C:",
			"drivecapacity": 447,
			"used": 45
		},
		{
			"label": "DOCUMENT(D:)",
			"name": "D:",
			"drivecapacity": 447,
			"used": 45
		},
		{
			"label": "DOCUMENT(E:)",
			"name": "E:",
			"drivecapacity": 777,
			"used": 555
		},
		{
			"label": "DOCUMENT(F:)",
			"name": "F:",
			"drivecapacity": 555,
			"used": 99
		},
		{
			"label": "DOCUMENT(G:)",
			"name": "G:",
			"drivecapacity": 111,
			"used": 33
		},
		{
			"label": "DOCUMENT(H:)",
			"name": "H:",
			"drivecapacity": 447,
			"used": 45
		}
	];
	return o;
}


function test_getresults() {
	var o = [
		{
			"path": "c:\\windows\a.txt",
			"size": 4523223
		}
	];
	for (var i=0; i<1000; i++)
	{
		var a = i.toString(10);
		var b = {
			"path": "c:\\windows\\"+ a + ".txt",
			"size": 4523223
		};
		o.push(b);
	}
	console.log(o);
	return o;
}
