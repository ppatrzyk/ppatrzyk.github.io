AWS.config.region = 'eu-west-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:63f307fe-f831-46fd-9326-60d3b4964af7',
});

sendMessage = function() {
    var sns = new AWS.SNS();

    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var composed_message = `Email: ${email}\n\n${message}`
    var mail_subject = `Contact form: ${email}`

    var params = {
        Message: composed_message, 
        Subject: mail_subject,
        TopicArn: 'arn:aws:sns:eu-west-1:410627534876:patrzyk-me-contact'
    };
    sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log(data);
    });
};