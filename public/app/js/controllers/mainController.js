app.controller('MainController', function($location,  pollServices) {
	var vm = this;
	pollServices.info(function(data) {
		vm.auth = data;
	});
	// vm.labelChart = ['1', '2', '3', '4'];
	// vm.dataChart = ['30, 89', '1', '451']
	
	// vm.info = function() {
	// 	pollServices.info(function(data) {
	// 		vm.auth = data;
	// 	});
	// }
	
	vm.pollFun = function(arg) {
		if(arg == 'auth') {
			var newWin = window.open("https://app-voting-jamaurz.c9users.io/auth/twitter", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
			setTimeout(function() {
		    	newWin.window.close();
		    	window.location.reload();
		    }, 8000);
		} else {
			$location.path(arg);
		}
	}

});