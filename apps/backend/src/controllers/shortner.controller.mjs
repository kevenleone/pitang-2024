import crypto from 'node:crypto';
import z from 'zod';

const shortnerSchema = z.object({
  createdAt: z.date().optional(),
  createdBy: z.string().optional(),
  hash: z.string().optional(),
  hits: z.number().positive().default(0).optional(),
  id: z.string().optional(),
  url: z.string().url('O link que você passou está inválido.'),
});

let shortners = [];

export default class ShortnerController {
  destroy(request, response) {
    const { id } = request.params;

    shortners = shortners.filter((shortner) => shortner.id !== id);

    response.status(204).send();
  }

  getOne(request, response) {
    const { id } = request.params;

    const shortner = shortners.find((shortner) => shortner.id === id);

    if (!shortner) {
      return response.status(404).send({ message: 'Shortner not found.' });
    }

    response.send(shortner);
  }

  index(request, response) {
    response.send({
      page: 1,
      pageSize: 20,
      totalCount: shortners.length,
      items: shortners,
    });
  }

  redirect(request, response) {
    response.send('redirect');
  }

  store(request, response) {
    const shortner = request.body;

    const { success, data, error } = shortnerSchema.safeParse({
      url: shortner.url,
    });

    if (!success) {
      return response.status(400).send(error);
    }

    const [hash, ...id] = crypto.randomUUID().split('-');

    data.createdAt = new Date();
    data.createdBy = 'System';
    data.hash = hash;
    data.hits = 0;
    data.id = id.join('-');

    shortners.push(data);

    response.send({ message: 'store', data });
  }

  update(request, response) {
    const { id } = request.params;
    const { url } = request.body;

    const newShortners = shortners.map((shortner) => {
      if (shortner.id === id) {
        return {
          ...shortner,
          url,
        };
      }

      return shortner;
    });

    shortners = newShortners;

    response.send({ message: 'Shortner Updated' });
  }
}
