const express = require('express')
const port = process.env.PORT || 8080
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "uykrop@gmail.com", // generated ethereal user
        pass: "tein2012", // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/send', async function (req, res) {

    let { name, email, message } = req.body

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'Pavel Kozlov', // sender address
        to: "pavel.kv94@yandex.by", // list of receivers
        subject: "Test gmail nodeJs", // Subject line
        // text: "Привееееееееееееттт", // plain text body
        html: `<b>"Это тест формы обратной связи"</b> 
        <a href='https://google.com' 
        target='blank'>LINK</a> 
        <div>Отправитель - ${name}</div> <br>
        <div> Емейл - ${email}</div> <br>
        <div>Сообщение - ${message}</div>`, // html body
    });

    res.send("Status ok")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})