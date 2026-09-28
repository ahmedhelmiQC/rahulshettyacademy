import{faker} from "@faker-js/faker";

export const userdata= {
      firstName    : faker.person.firstName(),
      lastName     : faker.person.lastName(),
      email        : faker.internet.email(),
      phoneNumber  : faker.string.numeric(10),
     // Occupation   : string,
      //genderMale   : string,
      password     : faker.internet.password(),
    
}