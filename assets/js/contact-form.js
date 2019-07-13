AWS.config.region = 'eu-west-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:63f307fe-f831-46fd-9326-60d3b4964af7',
});

function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

 function sendMessage() {
    var sns = new AWS.SNS();

    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    if( email == '' || !validEmail(email) ) {
        var invalidEmail = document.getElementById("email-invalid");
        if (invalidEmail) {
            invalidEmail.style.display = "block";
            return false;
        }
    }

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

    // TODO: hide only when sns pub successsfull, error otherwise
    // invalid email red ?
    // error when empty message
    // subject honeypot ?

    document.getElementById("contact_form").style.display = "none";
    var thankYouMessage = document.getElementById("thankyou_message");
    if (thankYouMessage) {
        thankYouMessage.style.display = "block";
    }

    return true;
};