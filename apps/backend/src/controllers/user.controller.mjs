import { z } from 'zod';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import prismaClient from '../utils/prismaClient.mjs';
import env from '../utils/env.mjs';
import AppError from '../exceptions/AppError.mjs';
import AuthenticationError from '../exceptions/AuthenticationError.mjs';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const userSchema = authSchema.extend({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

class UserController {
  async auth(request, response) {
    const { email, password } = request.body;

    authSchema.parse({ email, password });

    const user = await prismaClient.user.findFirst({ where: { email } });

    if (!user) {
      throw new AuthenticationError('User not Found', 404);
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new AuthenticationError('Password Invalid');
    }

    delete user.password;

    const token = jsonwebtoken.sign(user, env.JWT_SECRET);

    response.send({ token });
  }

  async destroy(request, response) {
    const { id } = request.params;

    try {
      await prismaClient.user.delete({ where: { id } });

      response.send({ message: 'User removed' });
    } catch (error) {
      throw new AppError('User not found', 404);
    }
  }

  async getOne(request, response) {
    const { id } = request.params;

    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    response.send(user);
  }

  async index(request, response) {
    const users = await prismaClient.user.findMany();

    response.send({
      totalCount: users.length,
      page: 1,
      pageSize: 20,
      items: users,
    });
  }

  async store(request, response) {
    const { email } = request.body;

    const user = userSchema.parse(request.body);

    const userExist = await prismaClient.user.findUnique({ where: { email } });

    if (userExist) {
      throw new AppError('Email already registered.', 404);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = await prismaClient.user.create({
      data: { ...user, password: hashedPassword },
    });

    delete newUser.password;

    response.send(newUser);
  }

  async update(request, response) {
    const { id } = request.params;

    let user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    user = await prismaClient.user.update({
      data: userSchema.parse(request.body),
      where: { id },
    });

    response.send(user);
  }
}

export default UserController;
