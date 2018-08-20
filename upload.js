var express = require('express');
var request = require('request');
var fs = require('fs');
var Client = require('instagram-private-api').V1;
var device = new Client.Device('clydewilliam007');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/clydewilliam007.json');



// And go for login
Client.Session.create(device, storage, 'clydewilliam007', 'Dope1234')
	.then(function(session) {
   		// Now you have a session, we can follow / unfollow, anything...
		// And we want to follow Instagram official profile
		return [session,Client.Upload.photo(session, request('https://i.imgur.com/x5UM1W3.jpg')) ]  
	})
	.spread(function(session, upload) {
		 return Client.Media.configurePhoto(session, upload.params.uploadId, 'akward caption');
	})
	.then(function(medium) {
		console.log(medium.params)
		// {followedBy: ... , following: ... }
		// Yey, you just followed @instagram
	})