import BaseApiRepository from "~/repositories/BaseApiRepository";
import CountriesFilter from "~/repositories/countries/CountriesFilter";
import config from "~/config/config";
import PaginationResponse from "~/repositories/PaginationResponse";
import Country from "~/repositories/countries/Country";

class CountriesApi extends BaseApiRepository {

  private cache: Map<CountriesFilter, Promise<PaginationResponse<Country>>>
      = new Map<CountriesFilter, Promise<PaginationResponse<Country>>>();

  public async get(filter?: CountriesFilter): Promise<PaginationResponse<Country>> {
    if (this.cache.get(filter)) {
      return this.cache.get(filter);
    }

    let promise = this.POST(config.getApiUrl() + "/country/get", filter);
    this.cache.set(filter, promise);
    return promise;
  }

}

export const cardsApi: CountriesApi = new CountriesApi();
export default cardsApi;
