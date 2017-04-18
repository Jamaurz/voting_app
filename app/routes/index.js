'use strict';

var path = process.cwd();
var passport = require('passport');
var express = require('express');
var app = express.Router();
var poll = require('../utility/poll.js');
var redirectPath = '/';

	app.get('/', function (req, res) {
			res.redirect('/build/index.html');
		})


	app.get('/info', function(req, res) {
		res.send(req.user)
	});

	app.post('/createpoll',  function(req, res) {
		//console.log(req.body);
		poll.createPoll(req.user.twitter.id, req.body.name, req.body.options, function(data) {
			res.send(data);	
		});
	});
	
	app.get('/readpoll', function(req, res) {
		//console.log('req.user', req.user.twitter.id, req.user )
		poll.readPolls(req.user.twitter.id, function(temp) {
			res.send(temp);
		});
	});
	
	app.get('/readallpolls', function(req, res) {
		poll.readAllPolls(function(temp) {
			res.send(temp);
		});
	});
	
	app.post('/pollid', function(req, res) {
		var user = req.user;
		poll.pollId(req.body.id, function(temp) {
			if(user) {
				temp.polls.options.push('I\'d like a custom option');
			}
			res.send(temp);
		});
	});
	
	app.post('/custom', function(req, res) {
		var option = req.body.option;
		var id = req.body.id;
		poll.userCheck(req.user.twitter.id, id, function(temp) {
			if(temp) {
				poll.customoption(id, option, function(data) {
					res.send(data);
				})
			} else {
				res.send(false);
			}
		})
	})
	
	app.post('/vote', function(req, res) {
		var user = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
		var id = req.body.idPoll;
		var option = req.body.selected;
		if(req.user) {
			user = req.user.twitter.id;
		}
		poll.userCheck(user, id, function(temp) {
			if(temp){
				poll.vote(user, id, option, function(temp) {
					res.send(temp);
				});
			} else {
				res.send(false);
			}
		})
		
	});
	
	app.post('/removepoll', function(req, res) {
		poll.removepoll(req.body.id, function(temp) {
			res.send(temp);
		})
	});
	
	app.get('/logout', function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : redirectPath,
            failureRedirect : '/'
        }));
        
		
module.exports = app;