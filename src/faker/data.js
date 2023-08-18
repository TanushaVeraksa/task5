import { allFakers, faker } from '@faker-js/faker';

export function createRandomUser(locate = 'ru') {
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
  
  export const users = faker.helpers.multiple(createRandomUser, {
    count: 5,
  });