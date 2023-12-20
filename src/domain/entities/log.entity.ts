
export enum LogServerityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogServerityLevel;
    message: string;
    createdAt?: Date;
    origin: string
}

export class LogEntity {

    level: LogServerityLevel;
    message: string;
    createdAt: Date;
    origin: string

    constructor(options: LogEntityOptions) {

        const { level, message, origin, createdAt = new Date() } = options

        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {

        const { message, level, createdAt } = JSON.parse(json)

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        })




        // if(!message){
        //     throw new Error ('Message is Required')
        // } else if(!level){
        //     throw new Error ('Level is Required')
        // } 

        return log

    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { message, level, createdAt, origin } = object;
        const log = new LogEntity({
            message, level, createdAt, origin
        })

        return log
    }
}