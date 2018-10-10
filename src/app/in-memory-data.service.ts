import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pet } from './petClasses/Pet';
import { Dog } from './petClasses/Dog';
import { Cat } from './petClasses/Cat';
import { Hamster } from './petClasses/Hamster';

const allPets: Pet[] = [
    new Cat('White', 15, 'Mellow', true),
    new Cat('Gray', 12, 'Pusheen', true),
    new Dog('Ashen', 18, 'Buddy'),
    new Dog('Black', 19, 'Cody'),
    new Hamster('White', 10, false),
    new Hamster('Blonde', 10, true)
];

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        return { allPets };
    }
}
