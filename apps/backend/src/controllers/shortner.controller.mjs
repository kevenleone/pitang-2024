import crypto from 'node:crypto';
import z from 'zod';

import prismaClient from '../utils/prismaClient.mjs';

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

    try {
      await prismaClient.shortner.delete({ where: { id } });

      response.status(204).send();
    } catch (error) {
      response.status(404).send({ message: 'Shortner not found.' });
    }
  }

  async getOne(request, response) {
    const { id } = request.params;

    const shortner = await prismaClient.shortner.findUnique({ where: { id } });

    if (!shortner) {
      return response.status(404).send({ message: 'Shortner not found.' });
    }

    response.send(shortner);
  }

  async index(request, response) {
    let { page = 1, pageSize = 20 } = request.query;

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    const skip = (page - 1) * pageSize;

    const [shortnerTotalCount, shortners] = await Promise.all([
      prismaClient.shortner.count(),
      prismaClient.shortner.findMany({ take: pageSize, skip }),
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

    const { success, data, error } = shortnerSchema.safeParse({
      url: shortner.url,
    });

    if (!success) {
      return response.status(400).send(error);
    }

    const [hash] = crypto.randomUUID().split('-');

    const newShortner = await prismaClient.shortner.create({
      data: {
        hash,
        url: data.url,
        user: {
          connect: { id: loggedUser.id },
        },
      },
      include: { user: true },
    });

    delete newShortner.user.password;

    response.send({ message: 'store', data: newShortner });
  }

  async update(request, response) {
    const { id } = request.params;
    const { url } = request.body;

    await prismaClient.shortner.update({
      data: { url },
      where: { id },
    });

    response.send({ message: 'Shortner Updated' });
  }
}
