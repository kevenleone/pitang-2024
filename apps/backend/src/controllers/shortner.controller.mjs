import crypto from 'node:crypto';
import z from 'zod';

import prismaClient from '../utils/prismaClient.mjs';

const EXPIRES_1WEEK = 7;
const EXPIRES_1MONTH = 30;

const shortnerSchema = z.object({
  createdAt: z.date().optional(),
  createdBy: z.string().optional(),
  hash: z.string().optional(),
  hits: z.number().positive().default(0).optional(),
  id: z.string().optional(),
  url: z.string().url('O link que você passou está inválido.'),
});

export default class ShortnerController {
  async destroy(request, response) {
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

  async getOne(request, response) {
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

  async index(request, response) {
    const loggedUser = request.logged_user;
    let { page = 1, pageSize = 20 } = request.query;

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    const skip = (page - 1) * pageSize;
    const where = { userId: loggedUser.id };

    const [shortnerTotalCount, shortners] = await Promise.all([
      prismaClient.shortner.count({ where }),
      prismaClient.shortner.findMany({
        skip,
        take: pageSize,
        where,
      }),
    ]);

    response.send({
      page,
      pageSize,
      totalCount: shortnerTotalCount,
      items: shortners,
    });
  }

  async redirect(request, response) {
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

  async store(request, response) {
    const loggedUser = request.logged_user;
    const shortner = request.body;
    const expireAt = new Date();

    expireAt.setDate(
      expireAt.getDate() + (loggedUser ? EXPIRES_1MONTH : EXPIRES_1WEEK)
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
        expireAt,
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

  async update(request, response) {
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
