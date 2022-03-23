import { UserModel} from '../models/user.model.js';
class UserController {

    async sayHello (request, response) {
        return response.status(200).json({
            ok: true,
            message: 'Hello'
        });
    }

    async createUser(request, response) {
        const user = request.body

        try {

            const query = await UserModel.create(user);

            return response.status(200).json({
                ok: true,
                data: query
            });

        } catch (e) {
            return response.status(500).json({
                ok: false,
                message: e
            });
        }
    }

    async getUsers(request, response) {
        const body = request.body;
        const users = await UserModel.findAll({
            where: body.condition
        });

        if(users.length > 0) {
            const user = users[0]
            response.status(200).json({ ok:true, user });
        } else {
            response.status(200).json({ok: false, message: 'user not found'});
        }

    }


}

export const userController = new UserController();
