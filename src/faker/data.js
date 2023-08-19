import {Faker, ru, pl, en} from '@faker-js/faker';
import {deleteSymbol, addSymbol, replace} from './mistakes'

let index = 0;
const COUNT_TYPE_MISTAKE = 3;

const ruAlph = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('');
const plAlpha = 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż'.split('');
const enSym = 'abcdefghijklmnopqrstuvwxyz'.split('');
const phoneAlp = '0123456789'.split('');

const arrLocale = [ru, pl, en];
const alpha = [ruAlph, plAlpha, enSym, phoneAlp];
const mistakeFunck = [deleteSymbol, addSymbol, replace];

let customFaker;

function createRandomUser(i, page, random) {
    customFaker = new Faker({
        locale: [arrLocale[index]],
    });
    customFaker.seed(i + page + random)
    return {
      userId: customFaker.string.uuid(),
      fullName: customFaker.person.fullName(),
      address: `${customFaker.location.city()} ${customFaker.location.street()} ${customFaker.location.streetAddress()}`,
      phone: customFaker.phone.number(), 
    };
}
  
export const users = (count, page, random, per) => {
   const users = [];
   let randomUser;
   for(let i=0; i<count; i++) {
    randomUser = createRandomUser(i, page, random);
       if(per === 0) {
         users.push(randomUser) 
        } 
       else  {
        users.push(usersMistake(per, randomUser))
       }
   }
   return users;
}

const usersMistake = (per, user) => {
    let r = Math.random();  
    let m = Math.floor(Math.random() * COUNT_TYPE_MISTAKE);
    let prob = +(per % 1).toFixed(2);
    let counMistake = +Math.floor(per);
    let key = Object.keys(user);
    let newUser = {...user};    
    for(let i = 0; i<counMistake; i++) {
        let funkM = mistakeFunck[m];
        if(key[m+1] === 'phone') {
            newUser[key[m+1]] = funkM(newUser[key[m+1]], alpha[3], key[m+1]);
        } else {
            newUser[key[m+1]] = funkM(newUser[key[m+1]], alpha[index]);
        } 
    }
    if(r >= prob) {
        newUser[key[m]] = mistakeFunck[m](newUser[key[m]], alpha[index]);
    }
    return newUser;
}

export function setLocate(value) {
    index = +value;
}

