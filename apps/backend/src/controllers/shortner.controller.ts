import crypto from 'node:crypto';

import {Request, Response} from "express"
import { shortnerSchema } from '@pita.ng/zod';
import dayjs from '@pita.ng/dayjs';

import prismaClient from '../utils/prismaClient.js';

const EXPIRES_1WEEK = 7;
const EXPIRES_1MONTH = 30;

type RequestCustom = {
  logged_user: any
} & Request

export default class ShortnerController {
  async destroy(request: RequestCustom, response: Response) {
    const { id } = request.params;
    const loggedUser = request.logged_user;

    try {
      await prismaClient.shortner.delete({
        where: { id, userId: loggedUser.id },
      });

      response.status(204).send();
    } catch (error) {
      response.status(404).send({ message: 'Shortner not found.' });
    }
  }

  async getOne(request: RequestCustom, response: Response) {
    const { id } = request.params;
    const loggedUser = request.logged_user;

    const shortner = await prismaClient.shortner.findUnique({
      where: { id, userId: loggedUser.id },
    });

    if (!shortner) {
      return response.status(404).send({ message: 'Shortner not found.' });
    }

    response.send(shortner);
  }

  async index(request: RequestCustom, response: Response) {
    const loggedUser = request.logged_user;
    let { page = 1, pageSize = 20 } = request.query;

    page = parseInt(page as string);
    pageSize = parseInt(pageSize as string);

    const skip = (page - 1) * pageSize;
    const where = { userId: loggedUser.id };

    const [shortnerTotalCount, shortners] = await Promise.all([
      prismaClient.shortner.count({ where }),
      prismaClient.shortner.findMany({
        skip,
        take: pageSize,
        where,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              id: true,
              email: true,
              createdAt: true,
            },
          },
        },
      }),
    ]);

    response.send({
      page,
      pageSize,
      totalCount: shortnerTotalCount,
      items: shortners,
    });
  }

  async redirect(request: RequestCustom, response: Response) {
    const { hash } = request.params;

    const shortner = await prismaClient.shortner.findUnique({
      where: { hash },
    });

    if (!shortner) {
      throw new Error('Invalid Hash');
    }

    if (new Date() > shortner.expireAt) {
      throw new Error('Link Expired');
    }

    // Captura de informações do usuário.

    await prismaClient.shortner.update({
      data: { ...shortner, hits: shortner.hits + 1 },
      where: { id: shortner.id },
    });

    response.redirect(shortner.url);
  }

  async store(request: RequestCustom, response: Response) {
    const loggedUser = request.logged_user;
    const shortner = request.body;

    const today = dayjs();

    const futureDate = today.add(
      loggedUser ? EXPIRES_1MONTH : EXPIRES_1WEEK,
      'days'
    );

    const { success, data, error } = shortnerSchema.safeParse({
      url: shortner.url,
    });

    if (!success) {
      return response.status(400).send(error);
    }

    const [hash] = crypto.randomUUID().split('-');

    const newShortner = await prismaClient.shortner.create({
      data: {
        expireAt: futureDate.toISOString(),
        hash,
        url: data.url,
        ...(loggedUser && {
          user: {
            connect: { id: loggedUser?.id },
          },
        }),
      },
      include: { user: true },
    });

    if (newShortner.user) {
      delete newShortner.user.password;
    }

    response.send({ message: 'store', data: newShortner });
  }

  async update(request: RequestCustom, response: Response) {
    const loggedUser = request.logged_user;
    const { id } = request.params;
    const { url } = request.body;

    await prismaClient.shortner.update({
      data: { url },
      where: { id, userId: loggedUser.id },
    });

    response.send({ message: 'Shortner Updated' });
  }
}
