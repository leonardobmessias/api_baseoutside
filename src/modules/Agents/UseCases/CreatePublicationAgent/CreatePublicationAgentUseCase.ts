import { AppError } from "../../../../shared/errors/AppError"
import { IPublicationsAgentRepository, ResponseCreatePublication } from "../../repositories/IPublicationsAgentRepository"

class CreatePublicationAgentUseCase{
  private publicationAgentRepository: IPublicationsAgentRepository
  constructor(publicationAgentRepository: IPublicationsAgentRepository,){
    this.publicationAgentRepository = publicationAgentRepository
  }
  async execute({id_agent_token, id_agent, type, description ,content}): Promise<ResponseCreatePublication> {
    if(!id_agent||!type||!description) throw new AppError("You sent some undefined field.")
    if(id_agent !== id_agent_token) throw new AppError("Token sen not to own agent authenticate ")
    const newPublication = await this.publicationAgentRepository.create({ id_agent, type, description, content })
    return newPublication
  }

}
export{CreatePublicationAgentUseCase}