import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { logRepository } from "../../repository/log.repository";


interface checkServiceUseCase {
    execute (url: string):Promise<boolean>,
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements checkServiceUseCase {

    constructor(
        private readonly logRepository: logRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}
   
    public async execute(url: string): Promise<boolean> {
        
        try {
            const req = await fetch(url)
            
            if( !req.ok) throw new Error ( `Error on check service ${url}`)

            const log = new LogEntity({
                message:`Service ${url} working`,
                level: LogServerityLevel.low,
                createdAt: new Date(),
                origin: 'chek-service.ts'    
            })
            this.logRepository.saveLog(log)
            this.successCallback && this.successCallback();
            return true;

        } catch (error) {
            const log = new LogEntity({
                message:`Service ${error} is crash`,
                level: LogServerityLevel.high,
                createdAt: new Date(),
                origin: 'chek-service.ts'    
            })
            this.logRepository.saveLog(log)
            this.errorCallback && this.errorCallback(`${error}`);
            return false;
        }

        
    }
}