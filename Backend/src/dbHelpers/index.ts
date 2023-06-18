import mssql from 'mssql'
import {sqlConfig} from '../Config'


export class DatabaseHelper{

private static pool:Promise<mssql.ConnectionPool>= mssql.connect(sqlConfig)
    constructor(){   
}


private static addInputToRequest(request:mssql.Request,data:{[x:string]:number|string}={}){
    const keys =Object.keys(data)
    keys.map(keyName=>{
        return request.input(keyName,data[keyName])
    })

    return request
}

static async exec(storedProc:string,data:{[x:string]:string|number}={}){
    
    let request:mssql.Request =await(await DatabaseHelper.pool).request()
    request = DatabaseHelper.addInputToRequest(request,data)
    return request.execute(storedProc)
}

async query(queryString:string){
    return (await DatabaseHelper.pool).request().query(queryString)
}

}