import BaseApiRepository from "~/repositories/BaseApiRepository";
import User from "~/repositories/user/User";
import config from "~/config/config";

class UsersApi extends BaseApiRepository {

  public async me(): Promise<User> {
    return await this.POST(config.getApiUrl() + "/user/me", {});
  }

}

export const usersApi: UsersApi = new UsersApi();
export default usersApi;
