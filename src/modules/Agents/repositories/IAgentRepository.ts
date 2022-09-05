import { ICreateAgentDTO } from "../DTOS/CreateAgentDTO"
import { Agent } from "../infra/typeorm/entities/Agent"

interface CreateAgent{
  name: string
  email: string
  password: string
  id?: string
  image_profile?: string
  vocation?:string,
  user_name:string
}

interface EditAgent{
  id:string 
  name?: string
  email?: string
  description?: string
  interests?: string[]
  skills?: string[]
  vocation?: string;
  image_profile?:string

}
interface ResponseAgent{
  id: string;
  name: string;
  email: string;
  description: string;
  skills?: string[];
  interests?: string[];
  vocation?: string;
}

interface IAgentRepository{
  
  create({name,email,password,}:ICreateAgentDTO): Promise<Agent>

  listAll(): Promise<Agent[]>
  
  deactivate( id:string ): Promise<Agent>
  
  activate({email}):Promise<void>

  edit({id, description,email,name,skills,interests,image_profile}:EditAgent): Promise<ResponseAgent>

  findByEmail({ email }): Promise<Agent>

  findById( id :string): Promise<Agent>
  
  findByName(name :string): Promise<Agent>
  
  findBySkills(skill:string[]):Promise<Agent[]>
  
  findByInterest( interest:string[] ): Promise<Agent[]>

  findByVocation({vocation}):Promise<Agent[]>

  resetPassword({id_agent,password}):Promise<Agent>

  findByUserName(user_name:string):Promise<Agent>
} 
export {IAgentRepository,CreateAgent,EditAgent,ResponseAgent} 