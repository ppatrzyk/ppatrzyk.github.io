AWS.config.region = 'eu-west-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:63f307fe-f831-46fd-9326-60d3b4964af7',
});

function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

 function sendMessage() {
    var invalidEmail = document.getElementById("email-invalid");
    var invalidMessage = document.getElementById("message-invalid");
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    var block = false;
    if ( email == '' || !validEmail(email) ) {
        invalidEmail.style.display = "block";
        block = true;
    } else {
        invalidEmail.style.display = "none";
    }
    var message_length = message.length
    if ( message_length < 15 || message_length > 10000 ) {
        var len_error = `Incorrect lenght: ${message_length} characters, 15-10000 allowed`
        invalidMessage.textContent = len_error;
        invalidMessage.style.display = "block";
        block = true;
    } else {
        invalidMessage.style.display = "none";
    }
    if ( block ) {
        return false;
    }

    var composed_message = `Email: ${email}\n\n${message}`
    var mail_subject = `Contact form: ${email}`
    var params = {
        Message: composed_message, 
        Subject: mail_subject,
        TopicArn: 'arn:aws:sns:eu-west-1:410627534876:patrzyk-me-contact'
    };

    var sns = new AWS.SNS();
    sns.publish(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            alert('Unknown error, sending failed');
        } else {
            // console.log(data);
            document.getElementById("contact_form").style.display = "none";
            var thankYouMessage = document.getElementById("thankyou_message");
            thankYouMessage.style.display = "block";
        }
    });
    return true;
};