import { AxiosResponse } from "axios";
import $api from "../http/index";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "../models/IUser";

export default class UserService {
    static fetchUser (): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}