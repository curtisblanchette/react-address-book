import { rest } from 'msw';
import { contacts } from "./seed";

export const baseUrl = (path) => {
  return new URL(path, 'http://localhost:5000').toString()
}

export const handlers = [
  rest.get(baseUrl('/contacts'), (req, res, ctx) => {

    let filtered = contacts;
    let name = req.url.searchParams.get('name');
    if (name) {
      filtered = contacts.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    }

    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json(filtered)
    )
  }),
  rest.get(baseUrl('/contacts/:id'), (req,res,ctx) => {
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json(contacts.find(c => c.id === parseInt(req.params.id, 0)))
    )
  })
]