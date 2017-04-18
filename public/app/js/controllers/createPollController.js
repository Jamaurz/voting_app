app.controller('CreatePollController', function($location, pollServices) {
	var vm = this;
	vm.createpollfun = function() {
		if(vm.namePoll && vm.optionsPoll) {
			var options = vm.optionsPoll.split(/\r?\n/);
			pollServices.createpoll(vm.namePoll, options, function(data) {
				if(data) {
					$location.path('/mypolls');
					$location.replace();
					alert('new poll ' + vm.namePoll + ' created successful');
				}
			});
		} 
	}
});