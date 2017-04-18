var app = angular.module('app', ['ngRoute', 'chart.js']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/home.html",
        controller: 'HomeController',
        controllerAs: 'my'
    })
    .when("/createpoll", {
        templateUrl : "views/createpoll.html",
        controller: 'CreatePollController',
        controllerAs: 'my'
    })
    .when("/mypolls", {
        templateUrl : "views/mypolls.html",
        controller: 'MyPollsController',
        controllerAs: 'my'
    })
    .when("/poll/:id", {
        templateUrl : "views/poll.html",
        controller: 'PollController',
        controllerAs: 'my'
    });
});

app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    }
]);

//redirect to home 
app.run(function($rootScope, $location, pollServices) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        if($location.path() == '/createpoll' || $location.path() == '/mypolls') {
            pollServices.info(function(data) {
                if(data) {
                    //console.log('ok change url');
                } else {
                    //console.log('error chnage url');
                    $location.path('/');
                }
            })
        }
    });
});
