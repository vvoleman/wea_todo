import JsonResponse from "@/base/JsonResponse";
import AbstractResponse from "@/base/abstract/AbstractResponse";
import AbstractController from "@/base/abstract/AbstractController";
import JWTGenerator from "@/services/JWTGenerator";
import Auth from "@/services/Auth";
import {Response} from "express";
import {LoggedInRequest} from "@/middlewares/UserLoggedMiddleware";
import UserRepository from "@/modules/user/repository/UserRepository";
import TaskRepository from "@/modules/task/repository/TaskRepository";

interface UserSignupRequest {
    email: string;
    password: string;
    password2: string;
}

interface UserSignInRequest {
    email: string;
    password: string;
}

class UserController extends AbstractController {

    public async index(req: LoggedInRequest): Promise<AbstractResponse> {
        const userTokenInfo = Auth.getInfoFromToken(req)

        let user = null;
        if (userTokenInfo) {
            const userModel = await UserRepository.findById(userTokenInfo.id)

            if (userModel) {
                user = userModel.getPublicData() as any
                user.taskHash = await TaskRepository.tasksHash(userModel.id)
            }

        }

        return new JsonResponse({
            'user': user
        })
    }

    public signOut(req: Request, res: Response): AbstractResponse {
        Auth.clearTokenCookie(res);
        return new JsonResponse({
            'message': 'User logged out'
        })
    }

    public async signIn(req: Request, res: Response): Promise<AbstractResponse> {
        // check if req.body is of type UserSignInRequest
        const body = req.body as unknown as UserSignInRequest;

        // Check if params are set
        if (!body.email || !body.password) {
            return new JsonResponse({
                'message': 'Missing params'
            }, 400)
        }

        // check if user exists for email and hashed password
        const email = body.email;
        const password = body.password;

        const user = await UserRepository.findByEmail(email)

        if (user && Auth.comparePassword(password, user.password)) {
            const token = JWTGenerator.getInstance().generateToken(user.id, user.email);
            Auth.setTokenCookie(res, token);
            return new JsonResponse({
                'message': 'User logged in',
                'user': user.getPublicData()
            })
        }

        return new JsonResponse({
            'message': 'Invalid credentials'
        }, 401)
    }

    public async signUp(req: Request, res: Response): Promise<AbstractResponse> {
        // check if req.body is of type UserSignupRequest
        const body = req.body as unknown as UserSignupRequest;

        // Check if params are set
        if (!body.email || !body.password || !body.password2) {
            return new JsonResponse({
                'message': 'Missing params'
            }, 400)
        }

        // Check if passwords match
        if (body.password !== body.password2) {
            return new JsonResponse({
                'message': 'Passwords do not match'
            }, 400)
        }

        // Check if email is valid
        if (!UserController.validateEmail(body.email)) {
            return new JsonResponse({
                'message': 'Email is not valid'
            }, 400)
        }

        const email = body.email;
        const password = body.password;
        const hash = Auth.hashPassword(password);

        // Check if email is already in use
        const user = await UserRepository.exists(email)

        if (user) {
            return new JsonResponse({
                'message': 'Email is already in use'
            }, 409)
        }

        // Create user
        const newUser = await UserRepository.create(email, hash)

        // jwt token generation
        const token = JWTGenerator.getInstance().generateToken(newUser.id, newUser.email);
        Auth.setTokenCookie(res, token);

        return new JsonResponse({
            'message': 'User created',
            'token': newUser.getPublicData()
        })
    }

    private static validateEmail(email: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

}

export default UserController