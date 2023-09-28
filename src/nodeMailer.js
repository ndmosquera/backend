import nodemailer from 'nodemailer'
import twilio from 'twilio'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'noble25@ethereal.email',
        pass: 'GfUkTs27EDk3BR8Yby'
    }
});

export default transporter;

get('/mail', async(req, res) => {
    const email =  await transporter.sendMail({
        from: 'Coder <noble25@ethereal.email>',
        to: 'Coder2 <otro correo>',
        subject:'ASUNTO',
        html: `<h1> Bienvenido </h1>`,
        text: "Eso se lee si no puedo render el html",
        // attachments: []

    });
    res.send("correo enviado")
})

get('/sms', async(req, res) =>{
    try{
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_SECRET)
        await client.messages.create({
            from: "NUMERO DE TEL DE TWILIO",
            to: process.env.PHONE,
            body: "Mensaje enviado desde twilio"
        })
    
        res.send({status: "ok"})
    } catch (e){
        res.send({e})
    }
})