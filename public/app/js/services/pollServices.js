app.service('pollServices', function($http) {
    
    this.createpoll = function(name, options, callback) {
        $http.post("/createpoll", {"name": name, "options": options}).then(function(response) {
            callback(response.data);
        });
    }
    this.polls = function(callback) {
        $http.get("/readpoll").then(function (response) {
            callback(response.data);
        });
    }
    this.allpolls = function(callback) {
        $http.get("/readallpolls").then(function (response) {
            //console.log(response.data);
            callback(response.data);
        });
    }
    this.pollid = function(id, callback) {
        $http.post("/pollid", {id: id}).then(function(response) {
            callback(response.data);
        });
    }
    this.customopt = function(id, option, callback) {
        $http.post("/custom", {id: id, option: option}).then(function(response) {
            callback(response.data);
        });
    }
    this.vote = function(id, selected, callback) {
        $http.post("/vote", {idPoll: id, selected: selected}).then(function(response) {
            callback(response.data);
        })
    }
    this.removepoll = function(id, callback) {
        $http.post("/removepoll", {id: id}).then(function(response) {
            callback(response.data);
        })
    }
    this.info = function(callback) {
        $http.get("/info").then(function(response) {
            callback(response.data);
        });
    }
    // this.infopath = function(path, callback) {
    //     $http.post("/infopath", {path: path}).then(function(response) {
    //         callback(response.data);
    //     });
    // }
});