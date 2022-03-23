import { UserModel} from '../models/user.model.js';
class UserController {

    async sayHello (request, response) {
        return response.status(200).json({
            ok: true,
            message: 'Hello'
        });
    }

    async getusers (request, response) {

        const body = request.body;
        console.log(body);
        try {
            const users = await UserModel.findAll(
                {
                    logging: console.log,
                    where: body.condition

                });

            return response.status(200).json({
                 ok: true,
                 data: users
                });
         } catch (e) {
            return response.status(500).json({
                 ok: false,
                 error: e
            })
        }
    }


}

export const userController = new UserController();
