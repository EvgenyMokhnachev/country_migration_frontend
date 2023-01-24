import BaseApiRepository from "~/repositories/BaseApiRepository";
import PaginationResponse from "~/repositories/PaginationResponse";
import MovementFilter from "~/repositories/movements/MovementFilter";
import Movement from "~/repositories/movements/Movement";
import MovementCreateRequest from "~/repositories/movements/MovementCreateRequest";
import config from "~/config/config";
import TravelCalculation from "~/repositories/movements/TravelCalculation";

class MovementApi extends BaseApiRepository {

  private CRUDCallbacksIndex = 0;
  private CRUDCallbacks: Map<number, Function> = new Map<number, Function>();

  public onCrud(callback: Function): number {
    let index = this.CRUDCallbacksIndex++;
    this.CRUDCallbacks.set(index, callback);
    return index;
  }

  public removeCrud(index: number) {
    this.CRUDCallbacks.delete(index);
  }

  private doCRUDCallbacks() {
    this.CRUDCallbacks.forEach(callback => callback())
  }

  public async get(filter?: MovementFilter): Promise<PaginationResponse<Movement>> {
    return new PaginationResponse(await this.POST(config.getApiUrl() + "/movement/get", filter));
  }

  public async calculateTravelHistory(filter?: MovementFilter): Promise<TravelCalculation> {
    return new TravelCalculation(await this.POST(config.getApiUrl() + "/movement/calculate", filter));
  }

  public async create(createData: MovementCreateRequest): Promise<Movement> {
    try {
      let result = await this.POST(config.getApiUrl() + "/movement/create", createData);
      this.doCRUDCallbacks();
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async delete(id?: number): Promise<boolean> {
    try {
      let result = await this.POST(config.getApiUrl() + "/movement/delete", {movementId: id});
      this.doCRUDCallbacks();
      return result;
    } catch (e) {
      throw e;
    }
  }

}

export const foldersApi: MovementApi = new MovementApi();
export default foldersApi;
