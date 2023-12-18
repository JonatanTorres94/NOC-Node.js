import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { logRepository } from "../../domain/repository/log.repository";
import { LogDatasource } from '../../domain/datasources/log.datasource';


export class LogRepositoryImpl implements logRepository {

    constructor(
        private readonly LogDatasource: LogDatasource,
    ){}

    async saveLog(log: LogEntity): Promise<void> {
       return this.LogDatasource.saveLog(log)
    }
    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        return this.LogDatasource.getLogs(severityLevel)
    }

}