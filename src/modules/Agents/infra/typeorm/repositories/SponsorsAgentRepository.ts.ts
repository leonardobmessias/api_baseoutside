import { Repository } from "typeorm"
import { AppDataSource } from "../../../../../shared/infra/typeorm"
import { SponsorAgent } from "../entities/SponsorAgent"



class SponsorsAgentsRepository{
  private sponsorsAgentsRepository:Repository<SponsorAgent>
  constructor(){
    this.sponsorsAgentsRepository = AppDataSource.getRepository(SponsorAgent)
  }

  async create({ id_agent, id_sponsor, type, agent_private, sponsor_private }): Promise<SponsorAgent> {

    const sponsor = new SponsorAgent()
    const newSponsor = this.sponsorsAgentsRepository.create( {id_agent, id_sponsor, type, agent_private, sponsor_private} )
    await this.sponsorsAgentsRepository.save(newSponsor) 
    return newSponsor
  }

}
export{SponsorsAgentsRepository}