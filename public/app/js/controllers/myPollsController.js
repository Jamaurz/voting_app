app.controller('MyPollsController', function($location, pollServices) {
	var vm = this;
	pollServices.polls(function(data) {
		vm.polls = data;
		//console.log('data async func services', data);
	});
	
	vm.mypollurl = function(arg) {
		$location.path('/poll/' + arg);
	}
});