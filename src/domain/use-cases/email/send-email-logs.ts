import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { logRepository } from '../../repository/log.repository';

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: logRepository
    ) { }

    async execute(to: string | string[]) {

        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to) // Usamos la funcion que envia los logs xq eso es el caso de uso en este caso

            if (!sent) {
                throw new Error('Email log not sent')
            }

            const log = new LogEntity({
                message: `Log email sent ${to}`,
                level: LogServerityLevel.low,
                origin: 'send-email-logs'
            })
            this.logRepository.saveLog(log)
            return true

        } catch (error) {


            const log = new LogEntity({
                message: `${error}`,
                level: LogServerityLevel.high,
                origin: 'send-email-logs'
            })
            this.logRepository.saveLog(log)

            return false
        }

        
    };

}