import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from './email/email.service';


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
)

const EmailServiceTwo = new EmailService();

export class Server {

    public static start() {

        console.log('Server started...')

        // aca es el caso de uso, siempre con logs se puede hacer mas casos de usos
       // new SendEmailLogs(EmailServiceTwo, fileSystemLogRepository).execute(['jonatan.napse@gmail.com'])

        // ACA SE ENVIA DESDE EL SERVICIO
        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs(['jetrnm94@hotmail.com','jonatan.napse@gmail.com']);
        // emailService.sendEmail({
        //     to:'jonatan.napse@gmail.com',
        //     subject: 'Test de correo',
        //     htmlBody: '<h1>Esto es un TEST!!!!</h1>'
        // })

        // CronService.createJob(
        //     '*/15 * * * * *',
        //     () => {
        //         const url = 'http://localhost:3000'
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} Success`),
        //             (error) => console.log(error),
        //         ).execute(url)
        //     }

        // );
    }
}