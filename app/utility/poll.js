var mongoose = require('mongoose');
var Poll = require('../models/polls.js');

exports.createPoll = function (id, namePoll, optionsPoll, callback) {
    var newPoll = new Poll();
    newPoll.polls.name = namePoll;
    newPoll.polls.author = id;
    newPoll.polls.options = optionsPoll;
    for(var i = 0; i < optionsPoll.length; i++) {
        newPoll.votes.push({"name": optionsPoll[i], "count": 0, electorate: []});   
    }
    newPoll.save(function (err) {
      if (err) throw err;
      callback(true);
    })
}

exports.userCheck = function(idUser, idPoll, callback) {
    Poll.findById(idPoll, function(err, doc) {
        if(err) throw err;
        var allow = true;
        for(var i = 0; i < doc.votes.length && allow; i++) {
            for(var j = 0; j < doc.votes[i].electorate.length && allow; j++) {
                if(doc.votes[i].electorate[j] == idUser) {
                    allow = false;
                } 
            }
        }
        callback(allow);
    });
}
exports.vote = function(idUser, idPoll, option, callback) {
    Poll.findById(idPoll, function(err, doc) {
        if(err) throw err;
        for(var i = 0; i < doc.votes.length; i++) {
            if(doc.votes[i].name == option) {
                doc.votes[i].electorate.push(idUser);
                doc.votes[i].count = doc.votes[i].count + 1;
                doc.save(function(err) {
                    if(err) throw err;
                        callback(true);
                    });
            }
        }
        
    });
}

exports.readPolls = function (id, callback) {
    Poll.find({ 'polls.author' : id }, function(err, doc) {
        if(err) throw err;
        callback(doc);
    });
}

exports.readAllPolls = function (callback) {
    Poll.find({}, function(err, doc) {
        if(err) throw err;
        callback(doc);
    });
}

exports.pollId = function (id, callback) {
    Poll.findById(id, function(err, doc) {
        if(err) throw err;
        callback(doc);
    });
}

exports.customoption = function (id, option, callback) {
    Poll.findById(id, function(err, doc) {
        if(err) throw err;
        doc.polls.options.push(option);
        doc.votes.push({"name": option, "count": 0, electorate: []});
        doc.save(function(err) {
            if(err) throw err;
            callback(doc);
        });
        //console.log(doc.polls.options);
    });
}

exports.removepoll = function (id, callback) {
    Poll.findByIdAndRemove(id, function(err) {
        if(err) throw err;
        callback(true);
    });
}