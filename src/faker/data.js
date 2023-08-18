import { allFakers, faker } from '@faker-js/faker';

let locate = 'ru';

export function createRandomUser() {
    return {
      userId: faker.string.uuid(),
      fullName: allFakers[locate].person.fullName(),
      address: {
        city: allFakers[locate].location.city(),
        street: allFakers[locate].location.street(),
        streetAddress: allFakers[locate].location.streetAddress(),
      },
      phone: allFakers[locate].phone.number(), 
    };
}
  
export const users = (count = 20) => faker.helpers.multiple(createRandomUser, {count: count});

export function setLocate(value) {
    locate = value;
}

