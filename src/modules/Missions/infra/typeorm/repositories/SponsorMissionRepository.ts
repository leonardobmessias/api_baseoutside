import { Repository } from "typeorm";
import { AppError } from "../../../../../shared/errors/AppError";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ISponsorMissionRepository } from "../../../repositories/ISponsorMissionRepository";
import { SponsorMission } from "../entities/SponsorMission";

class SponsorsMissionsRepository implements ISponsorMissionRepository{
  private sponsorsMissionsRepository:Repository<SponsorMission>
  constructor(){
    this.sponsorsMissionsRepository = AppDataSource.getRepository("sponsors_missions")
  }
  async create({ id_sponsor, id_mission, type, sponsor_private, mission_private }: { id_sponsor: any; id_mission: any; type: any; sponsor_private: any; mission_private: any; }): Promise<SponsorMission> {
    const newSponsorMission = new SponsorMission()
    Object.assign(newSponsorMission,{ id_sponsor, id_mission, type, sponsor_private, mission_private })
    const createdSponsor = await this.sponsorsMissionsRepository.save(newSponsorMission)
    return createdSponsor
  } 
  async findSponsorMission(id_sponsor: string, id_mission: string): Promise<SponsorMission> {
    const foundSponsorMission = await this.sponsorsMissionsRepository.findOne({
      where:{id_mission:id_mission,id_sponsor:id_sponsor}
    })
    if(!foundSponsorMission )return null
    return foundSponsorMission
  }
  listSponsorsMission(id_mission: string): Promise<SponsorMission[]> {
    throw new Error("Method not implemented.");
  }
  ListMissionSponsor(id_sponsor: string): Promise<SponsorMission> {
    throw new Error("Method not implemented.");
  }
  deleteSponsorMission(id_sponsor: string, id_mission: string): Promise<SponsorMission> {
    throw new Error("Method not implemented.");
  }
}
export{SponsorsMissionsRepository}