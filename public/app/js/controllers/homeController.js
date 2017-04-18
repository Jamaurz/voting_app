app.controller('HomeController', function($location, pollServices) {
	var vm = this;
	pollServices.allpolls(function(data) {
		//console.log('data home ctrl', data);
		vm.polls = data;	
	});
	
	vm.mypollurl = function(arg) {
		$location.path('/poll/' + arg);
	}
});