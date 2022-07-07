import { DataSource } from "typeorm";
import { Action } from "../modules/Actions/Entity/Action";
import { Agent } from "../modules/Agents/Entities/Agent";
import { Mission } from "../modules/Missions/Entities/Mission";
import { Task } from "../modules/Task/Entities/Task";
import { AgentToken } from "../modules/accounts/UserToken/Entity/AgentToken";



export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Leo175033",
  database: "crowdforeign",
  entities: [Agent,Mission,Action,Task,AgentToken],
  migrations: ["./src/database/migrations/*.ts"],
  

 

  


})

AppDataSource.initialize().then(() => {
  console.log('DataBase initialized')
}).catch((err) => {
  console.log(err)
})