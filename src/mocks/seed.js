import { faker } from "@faker-js/faker";

export const contacts = Array.from({length: 100}).map((e, id) => ({
  id: id + 1,
  name: faker.name.fullName(),
  address: faker.address.streetAddress(true),
  phone: faker.phone.number()
}));

