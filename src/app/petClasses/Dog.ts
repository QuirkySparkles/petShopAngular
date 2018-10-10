import { Pet } from './Pet';

export class Dog extends Pet {
    public name: string;

    constructor(dogColor: string, dogPrice: number, dogName: string) {
        super('Dog', dogColor, dogPrice);
        this.name = dogName;
    }

    public get petName(): string {
        return this.name;
    }

}
