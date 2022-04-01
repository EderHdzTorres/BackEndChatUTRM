import { UserModel } from '../models/user.model.js';
import { conversation } from '../models/conversation.model.js';
import { messages } from '../models/messages.model.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize'

class UserController {

    async sayHello(request, response) {
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

        if (users.length > 0) {
            const user = users[0]
            response.status(200).json({ ok: true, user });
        } else {
            response.status(200).json({ ok: false, message: 'user not found' });
        }

    }

    async loadConversation(request, response) {
        const body = request.body;
        const sender = body.sender;
        const receiver = body.receiver;
        const uuid = uuidv4();

        console.log('ids', sender, receiver);

        const fromSender = await conversation.findOne({ where: { from_id: sender, to_id: receiver } });
        const fromReceiver = await conversation.findOne({ where: { from_id: receiver, to_id: sender } });
        let msgs = null;

        // console.log('from sender', fromSender);
        // console.log('from receiver', fromReceiver);

        if (fromSender === null && fromReceiver !== null) {
            const conv = await conversation.create({ from_id: sender, to_id: receiver, uuid: fromReceiver.uuid });
            const msgs = await messages.findAll({ where: { conversation_uuid: conv.uuid } });
            return response.status(200).json({ ok: true, data: msgs, uuid: conv.uuid });
        } else if (fromReceiver === null && fromSender !== null) {
            const conv = await conversation.create({ from_id: sender, to_id: receiver, uuid: fromSender.uuid });
            const msgs = await messages.findAll({ where: { conversation_uuid: conv.uuid } });
            return response.status(200).json({ ok: true, data: msgs, uuid: conv.uuid });
        } else if (fromSender === null && fromReceiver === null) {
            const conv = await conversation.create({ from_id: sender, to_id: receiver, uuid: uuid });
            return response.status(200).json({ ok: true, data: null });
        } else if (fromReceiver !== null && fromSender !== null) {
            const msgs = await messages.findAll({ where: { conversation_uuid: fromSender.uuid } });
            return response.status(200).json({ ok: true, data: msgs, uuid: fromSender.uuid });
        }
    }

    async saveMessage(request, response) {
        const body = request.body;

        const msg = await messages.create(body);

        if (msg) {
            return response.status(200).json({ ok: true, data: msg });
        } else {
            return response.status(400).json({ ok: false, data: null });
        }
    }

}

export const userController = new UserController();