const OAuth = require('oauth');

const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    '4R9w5u7U8eDTcop1hcN8IQBFP',
    'YU39yjgmYhTy2fqRDZTXMC1FfMmiCVMOVqsp1DAHzQnp1k93Y8',
    '1.0A',
    null,
    'HMAC-SHA1'
);

module.exports = function (app) {
    app.post('/api/twitter/:message', async function (req, res) {
        const { message } = req.params
        await oauth.post(
            `https://api.twitter.com/1.1/statuses/update.json?status=${message}`,
            '1105962514628726785-wAv2flHwMzp6Rbj4K46SIwwmg02sKx',
            'Znp4uYjZoSySnI83bK0IAFKgSspu2yQsnuPSeLn00uoD0',
            message,
            "application/json",
            function (err, data, res) {
                console.log(err, data, res);
            }
        )
    });
}