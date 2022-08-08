import { AgentRepository } from "../../infra/typeorm/repositories/AgentRepository";
import { FindAgentByNameController } from "./FindAgentByNameController";
import { FindAgentByNameUseCase } from "./FindAgentByNameUseCase";

const agenteRepository = new AgentRepository()
const findAgentByNameUseCase = new FindAgentByNameUseCase(agenteRepository)
const findAgentByNameController = new FindAgentByNameController(findAgentByNameUseCase)

export{findAgentByNameController}