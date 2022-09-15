import { hash } from "bcryptjs"
import { AppError } from "../../../../shared/errors/AppError"
import { cleanEmptySpace } from "../../../../utils/cleanEmptySpace"
import { IInputCreateAgentDTO } from "../../DTOS/CreateAgentDTO"
import { IAgentRepository } from "../../repositories/IAgentRepository"

class CreateAgentUseCase{
  private agentRepository: IAgentRepository
  constructor(agentReposiotory:IAgentRepository) {
    this.agentRepository = agentReposiotory
  }
  async execute({ name, email, user_name, password ,description,vocation}:IInputCreateAgentDTO) {
    if(!name||!email||!user_name||!password) throw new AppError("You sent some invalid require value.")
    const agentExistByUserName = await this.agentRepository.findByUserName(user_name)
    if (agentExistByUserName) throw  new AppError("User with sent user name already exist",200)
    const agentExistByEmail = await this.agentRepository.findByEmail({ email })   
    if (agentExistByEmail) throw  new AppError("User with sent email already exist",200)
    try{
      const passwordHash = await hash(password, 8)
      const agentClean  = await cleanEmptySpace({ name, email, user_name, password:passwordHash ,description,vocation})
      const agent = await this.agentRepository.create(agentClean as IInputCreateAgentDTO)
      
      return agent
    }catch{
      return new AppError('erro encript')
    }
 } 

}
export{CreateAgentUseCase}
