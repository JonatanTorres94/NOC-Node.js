import {CronJob} from 'cron'

type CronTime = string | Date;
type OnTick = () => void;

//Este modulo lo que hace es que pueda correr tareas por tiempos

export class CronService {

    static createJob (cronTime: CronTime, onTick: OnTick): CronJob {

        const job = new CronJob(cronTime, onTick);

        job.start();

        return job;
    }
}