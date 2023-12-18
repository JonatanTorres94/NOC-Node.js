import { LogEntity, LogServerityLevel } from "../entities/log.entity";

export abstract class logRepository {

    abstract saveLog(log: LogEntity) : Promise <void>;
    abstract getLogs(severityLevel: LogServerityLevel) : Promise <LogEntity[]>;
}