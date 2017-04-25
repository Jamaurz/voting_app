app.controller('PollController', function($location, $routeParams , pollServices) {
	var vm = this;
	vm.dataName = [];
	vm.dataCount = [];
	
	function pollforid() {
		pollServices.pollid($routeParams.id, function(data) {
			vm.poll = data;
			infoCheck();
		
			for (var i = 0; i < data.votes.length; i++) {
				if( i == 0 ) {
					vm.dataName = [];
					vm.dataCount = [];
				}
				//console.log(data.votes[i].name);
				vm.dataName.push(data.votes[i].name); 
				vm.dataCount.push(data.votes[i].count); 
			}
			vm.labels = vm.dataName;
			vm.data = vm.dataCount;
		});
	}
	
	pollforid();
	
	vm.chartOptions = { 
        legend: {
          display: true,
        }
    };
	
	function infoCheck() {
		pollServices.info(function(data) {
			//console.log(data.twitter.id, vm.poll.polls.author, data.twitter.id == vm.poll.polls.author);
			vm.ownPoll = undefined;
			vm.authPoll = true;
			if(data) {
				if(data.twitter.id == vm.poll.polls.author) {
					vm.ownPoll = data.twitter.id;
				} 
			} 
		});
	}
	
	vm.changeOpt = function() {
		if(vm.selected == 'I\'d like a custom option') {
			vm.customopt = true;
		} else {
			vm.customopt = false;
		}
	}
	
	vm.removePoll = function() {
		pollServices.removepoll($routeParams.id, function(data) {
			if(data) {
				$location.path('/');
				$location.replace();
			}
		})
	}
	
	vm.share = function() {
		vm.nameShare = window.encodeURI(vm.poll.polls.name + " || Voting App ");
		vm.urlShare = window.encodeURIComponent(window.location.href);
		window.open("https://twitter.com/intent/tweet?text=" + vm.nameShare + "&url=" + vm.urlShare, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
	}
	
	vm.voting = function() {
		if(!vm.selected) {
			alert('please choose an option');
		} else {
			if(vm.selected == 'I\'d like a custom option') {
				//console.log('newOption', vm.customval);
				var custom = vm.customval;
				pollServices.customopt($routeParams.id, vm.customval, function(data) {
					if(data) {
	 					data.polls.options.push('I\'d like a custom option');
						vm.poll = data;
						pollServices.vote($routeParams.id, vm.customval, function(data) {
							vm.selected = '';
							vm.customval = '';
							vm.customopt = false;
							if(data) {
								alert('voted for ' + custom);
								pollforid();
							} else {
								alert('Error: You can only vote once a poll.');
							}
						});
					} else {
						vm.selected = '';
						vm.customval = '';
						vm.customopt = false;
						alert('Error: You can only vote once a poll.');
					}
				});
			} else {
				//console.log('selected', vm.selected);
				pollServices.vote($routeParams.id, vm.selected, function(data) {
					if(data) {
						alert('voted for ' + vm.selected);
						pollforid();
					} else {
						alert('Error: You can only vote once a poll.');
					}
					vm.selected = '';
				})
			}
		}
	}
});