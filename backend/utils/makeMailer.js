const nodemailer = require("nodemailer")

const makeMailer = () => {
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "utradeu@outlook.com",
            pass: "SuccinctMatcha!2023",
        },
    })

    return transporter
}

module.exports = { makeMailer }