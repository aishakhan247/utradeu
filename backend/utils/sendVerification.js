const { makeMailer } = require("./makeMailer")

const sendVerification = (user) => {
    const transporter = makeMailer()

    const mailOptions = {
        from: '"UtradeU" <utradeu@outlook.com>',
        to: user.email,
        subject: "UtradeU Verification",
        html: `<p>Hello ${user.firstName}! Verify your email using this link.</p>
                <a href ='http://35.217.78.22:8080/profile/verify?emailToken=${user.emailToken}'>Verify your email</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
        }
        else {
            console.log("Verification email sent")
        }
    });
}

module.exports = {sendVerification}