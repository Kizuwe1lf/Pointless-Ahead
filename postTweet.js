const Twitter = require('twitter');
const dotenv = require('dotenv').config();


var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});


module.exports = (message) => {
    message = `${message}\n\n\n\nDarkSoulsMessageBot\n#PointlessAhead`;
    client.post('statuses/update', { status: message }, function (error, tweet, response) {
		console.log('.')
    });
};