import { Pet } from './Pet';

export class Hamster extends Pet {
    public isFluffy: boolean;

    constructor(hamsterColor: string, hamsterPrice: number, fluffy: boolean) {
        super('Hamster', hamsterColor, hamsterPrice);
        this.isFluffy = fluffy;
    }

    public get fluffy(): boolean {
        return this.isFluffy;
    }

}
