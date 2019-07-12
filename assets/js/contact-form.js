var LPAWS = {};

AWS.config.region = 'eu-west-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:63f307fe-f831-46fd-9326-60d3b4964af7',
});

LPAWS.sendToTopic = function() {
    var sns = new AWS.SNS();
    var params = {
        Message: 'test message', 
        Subject: 'test topic',
        TopicArn: 'arn:aws:sns:eu-west-1:410627534876:patrzyk-me-contact'
    };
    sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
};