import Pageable from "../../core/Pageable";
import MongoCrudModel from "../model/MongoCrudModel";

export default interface ICrudModelRepository {
    findAll(page: number, pageSize: number): Promise<Pageable<MongoCrudModel>>
    // CRUD
    findOne(id: string): Promise<MongoCrudModel>
    createModel(mongoCrudModel: MongoCrudModel): Promise<MongoCrudModel>
    updateModel(mongoCrudModel: MongoCrudModel): Promise<MongoCrudModel>
    deleteModel(mongoCrudModelId: string): Promise<MongoCrudModel>
}
