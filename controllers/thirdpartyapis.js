const mailjet = require('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

const sendEmail = (email, name, message) => {
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "kmklaksitha@gmail.com",
                        "Name": "RP Team"
                    },
                    "To": [
                        {
                            "Email": email,
                            "Name": name
                        }
                    ],
                    "TemplateID": 3959059,
                    "TemplateLanguage": true,
                    "Subject": "Regarding Final year Research Project",
                    "Variables": {
                        "fullname": name,
                        "message": message
                    }
                }
            ]
        })

    request
        .then((result) => {
            console.log("email has been sent>>", result.body)
        })
        .catch((err) => {
            console.log("error while sending email", err.statusCode)
        })
}

module.exports = sendEmail