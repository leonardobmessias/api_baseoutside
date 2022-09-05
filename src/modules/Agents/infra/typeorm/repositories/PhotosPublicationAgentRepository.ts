import { Repository } from "typeorm"
import { AppDataSource } from "../../../../../shared/infra/typeorm"
import { IStorageProvider } from "../../../../../utils/providers/StorageProvider/IStorageProvide"
import { IPhotosPublicationAgent } from "../../../DTOS/IPhotosPublicationAgentRepository"
import { IJourneyAgentRepository } from "../../../repositories/IJourneyRepository"
import { PhotoPublicationAgent } from "../entities/PhotoPublicationAgent"
import { JourneyAgentRepository } from "./JourneyAgentRepository"

class PhotoPublicationAgentRepository implements IPhotosPublicationAgent{
  private photosPublicationAgent: Repository<PhotoPublicationAgent>
  private storageProvider:IStorageProvider
  constructor(storageProvider:IStorageProvider) {
    this.photosPublicationAgent = AppDataSource.getRepository('photos_publications_agents')
    this.storageProvider = storageProvider

  }
  async create(id_publication: string, photos: string[]): Promise<PhotoPublicationAgent[]> {
    
    const promise =  photos.map(async (photo) => {
      const newPhoto = new PhotoPublicationAgent(id_publication)
      Object.assign(newPhoto, {  url: photo })
      const fotonew = await this.photosPublicationAgent.save(newPhoto)
      this.storageProvider.save(photo,"PhotosPublications") 
      return fotonew  
    })
    const photosAgent =await  Promise.all(promise)

    return photosAgent
  }
  async list(id_publication: string): Promise<PhotoPublicationAgent[]> {
    throw new Error("Method not implemented.")
  }
  delete(id_publication: string): Promise<void> {
    throw new Error("Method not implemented.")
  }

}
export{PhotoPublicationAgentRepository}