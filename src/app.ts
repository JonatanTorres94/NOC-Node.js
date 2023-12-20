import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { FileSystemDatasource } from "./infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "./infrastructure/datasources/mongo-log.datasources";
import { LogRepositoryImpl } from "./infrastructure/repositories/log.repository.impl";
import { Server } from "./presentation/server";



(async () => {
    main();
})();

async function main(){

    const logRepository = new LogRepositoryImpl(
        new FileSystemDatasource(),
        //new MongoLogDatasource()
    )

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    }, logRepository)

    const prisma = new PrismaClient();
    const newLog = await prisma.logModel.create({
        data:{
            level: 'LOW',
            message: ' Test message',
            origin: 'App.ts',
        }
    })

    //Crear una coleccion = tabla, documento= registro row
    // const newLog = await LogModel.create({
    //     message:' Test de mensaje',
    //     origin:' app.js',
    //     level: 'low'
    // })

    // await newLog.save()

    Server.start();
    // console.log(envs)
}