import { rest } from 'msw';
import { faker } from '@faker-js/faker';

const baseUrl = (path) => {
  return new URL(path, 'http://localhost:5000').toString()
}

const contacts = Array.from({length: 100}).map((e, id) => ({
  id,
  name: faker.name.fullName(),
  address: faker.address.streetAddress(true),
  phone: faker.phone.number()
}));


export const handlers = [
  rest.get(baseUrl('/contacts'), (req, res, ctx) => {

    let filtered = contacts;
    let name = req.url.searchParams.get('name');
    if (name) {
      filtered = contacts.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    }

    return res(
      ctx.status(200),
      ctx.json(filtered)
    )
  }),
  rest.get(baseUrl('/contacts/:id'), (req,res,ctx) => {
    return res(
      ctx.status(200),
      ctx.json(contacts.find(c => c.id === parseInt(req.params.id, 0)))
    )
  })
]