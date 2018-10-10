import { Pet } from './Pet';

export class Cat extends Pet {
    public name: string;
    public isFluffy: boolean;

    constructor(color: string, price: number, name: string, fluffy: boolean) {
        super('Cat', color, price);
        this.name = name;
        this.isFluffy = fluffy;
    }

    public get petName(): string {
        return this.name;
    }

    public get fluffy(): boolean {
        return this.isFluffy;
    }

}
