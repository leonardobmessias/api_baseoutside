import { Decimal } from "@prisma/client/runtime";
import { IInputCreateAgentDTO, IOutputCreateAgentDTO } from "../DTOS/IAgentDTOS";
interface Agent{

  id: string;
  email: string;
  password: string;
  name: string;
  user_name:string;
  description: string;
  balance:number |Decimal |string
  is_active: boolean
  level: number 
  image_profile: string;
  vocation: string
  created_at: Date;
  state:number
}
class MapResponseAgent{
  agent:Agent
  constructor(agent:Agent){
    this.agent = agent
  }
  static mapFields(agent:Agent):IOutputCreateAgentDTO{
    delete agent.password
    delete agent.created_at
    return agent as IOutputCreateAgentDTO
  }
}
export{MapResponseAgent}