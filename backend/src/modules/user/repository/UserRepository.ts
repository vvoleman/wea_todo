import User from "@/modules/user/model/User";
import Auth from "@/services/Auth";

export default class UserRepository {

    public static async findAll(): Promise<User[]> {
        return User.findAll();
    }

    public static async findByEmail(email: string): Promise<User | null> {
        return User.findOne({
            where: {
                email: email,
            }
        })
    }

    public static async findById(id: number): Promise<User | null> {
        return User.findOne({
            where: {
                id: id,
            }
        })
    }

    public static async exists(email: string): Promise<boolean> {
        return (await UserRepository.findByEmail(email)) !== null;
    }

    public static async create(email: string, password: string): Promise<User> {
        return User.create({
            email: email,
            password: password
        })
    }


}