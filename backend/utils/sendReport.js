const { makeMailer } = require("./makeMailer")

require('dotenv').config

const serverHost = process.env.NODE_ENV === "development" ? "http://localhost:8080": "http://35.217.78.22:8080";

const sendReport = (post, reason) => {
    const transporter = makeMailer()

    const mailOptions = {
        from: '"UtradeU" <utradeu@outlook.com>',
        to: '"UtradeU" <utradeu@outlook.com>',
        subject: "Reported Post",
        html: `<p>Hello UtradeU. Please review the following post that has been flagged for ${reason}: ${post}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
        }
        else {
            console.log("Report Sent")
        }
    });
}

module.exports = {sendReport}