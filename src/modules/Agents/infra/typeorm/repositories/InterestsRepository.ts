import { Repository } from "typeorm/repository/Repository"
import { AppDataSource } from "../../../../../shared/infra/typeorm"
import { IInterestsRepository } from "../../../repositories/IInterestsRepository"
import { Interests } from "../entities/Interests"



class InterestsRepository implements IInterestsRepository{
  interestsRepository: Repository<Interests>
   constructor() {
    this.interestsRepository = AppDataSource.getRepository(Interests)
  }
  async findInterestByAgent(id_agent: string): Promise<Interests[]> {
    const interestAgent = await this.interestsRepository.find({
      relations: {
        id_agent:true
      },
      where: {
        id_agent: {
          id:id_agent
        }
      }
    })
    return interestAgent
  }


  async findByInterest(interest:string) {
    const interestAgent = await this.interestsRepository.findBy({interests:interest})
    return interestAgent
  }

  async updateInterests(id_agent: string, interests: string[]) {
    if (interests) {
      await this.interestsRepository.createQueryBuilder()
      .delete()
      .from(Interests)
      .where("id_agent = :id_agent", { id_agent: id_agent })
      .execute()
      const allInterests = interests.map(interest => interest.trim())
      allInterests.forEach(async (interests) => {
        const newInterest = new Interests(id_agent, interests)
        await this.interestsRepository.save(newInterest)
      })

      return allInterests
    }
 
  }

  async findInterestByName(interest:string) {
    const allInterests = await this.interestsRepository.find({
      where: {
        interests:interest
      }
    })
    return allInterests
  }
}
export{InterestsRepository}