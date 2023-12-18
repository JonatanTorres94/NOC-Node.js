import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { logRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entity';


interface SendMailOPtions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachements?: Attachments[],
}

interface Attachments {
    filename: string,
    path: string
}

export class EmailService {

    constructor (){}

    private transporter = nodemailer.createTransport({
        tls:{rejectUnauthorized: false},
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
        
    });

    async sendEmail(options: SendMailOPtions): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options
        try {

            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments: attachements,
                bcc: '' //instigar como ocultar la copia de mails
            })


            return true

        } catch (error) {


            return false

        }
    }

    sendEmailWithFileSystemLogs(to: string | string[] ) {
        const subject = 'Logs server'
        const htmlBody = `
        <h3>Logs de TEST</h3>
        <p>La etiqueta <details> ahora soporta el atributo name.
        Así puedes crear acordeones exclusivos sin JS.
        </p>
        `
        const attachements:Attachments[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'}
        ];

        return this.sendEmail({
            to, subject, attachements, htmlBody
        })
    }

}