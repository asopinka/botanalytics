'use strict';

var rp = require('request-promise');
var uuid = require('node-uuid');
var _ = require('lodash');

var VERSION = '1.0.0';

function BotAnalyticsSlack(apiKey) {
	var that = this;
	that.apiKey = apiKey;

	function logMessage(bot, message) {
		if (message.type != 'message') {
			// ignore these types.
			return;
		}

		// map bot as user if not specified
		if (!message.user) {
			message.user = bot.identity.id;
		}

		// map team if not specified
		if (!message.team) {
			message.team = bot.team_info.id;
		}

		// map ts if not specified
		if (!message.ts) {
			message.ts = new Date().getTime() / 1000;
		}

		// track
		rp({
			uri: 'https://botanalytics.co/api/v1/messages/slack/',
			method: 'POST',
			headers: {
				'Authorization': 'Token ' + that.apiKey
			},
			json: {
				'message': message
			}
		});
	}

	that.connect = function(res) {
		if (!res) {
			console.log('FAILED TO CONNECT TO BOT ANALYTICS BECAUSE RTM.START FAILED');
		}

		rp({
			uri: 'https://botanalytics.co/api/v1/bots/slack/initialize/',
			method: 'POST',
			headers: {
				'Authorization': 'Token ' + that.apiKey
			},
			json: res
		});
	};

	// botkit middleware endpoints
	that.send = function(bot, message, next) {
		logMessage(bot, message);
		next();
	};

	// botkit middleware endpoints
	that.receive = function(bot, message, next) {
		logMessage(bot, message);
		next();
	};
}

module.exports = function(apiKey) {
	if (!apiKey) {
		throw new Error('YOU MUST SUPPLY AN API KEY TO BOT ANALYTICS!');
	}

	return {
		slack: new BotAnalyticsSlack(apiKey)
	};
};