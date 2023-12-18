import fs from 'fs'

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/'
    private readonly allLogPath = 'logs/logs-all.log'
    private readonly mediumLogPath = 'logs/logs-medium.log'
    private readonly highLogPath = 'logs/logs-high.log'


    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        } 

        [
            this.allLogPath,
            this.mediumLogPath,
            this.highLogPath,
        ].forEach(path => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '')
        });
    }


    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`

        fs.appendFileSync(this.allLogPath, logAsJson)

        if (newLog.level === LogServerityLevel.low) return;
        if (newLog.level === LogServerityLevel.medium) {
            fs.appendFileSync(this.mediumLogPath, logAsJson)
        } else {
            fs.appendFileSync(this.highLogPath, logAsJson)
        }

    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf8')
        const stringLogs = content.split('\n').map(LogEntity.fromJson)

        return stringLogs
        
    }

    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogServerityLevel.low:
                return this.getLogsFromFile(this.allLogPath)

            case LogServerityLevel.medium:
                return this.getLogsFromFile(this.mediumLogPath)

            case LogServerityLevel.high:
                return this.getLogsFromFile(this.highLogPath)

            default:
                throw new Error (`${severityLevel} not implemented`)
        }
    }

}