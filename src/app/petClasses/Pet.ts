export abstract class Pet {
    type: string;
    color: string;
    price: number;
    id: string;

    constructor(type: string, color: string, price: number) {
        this.type = type;
        this.color = color;
        this.price = price;
        this.id = 'pet-' + Math.floor(Math.random() * 1000);
    }

    public get petType(): string {
        return this.type;
    }

    public get petColor(): string {
        return this.color;
    }

    public get petPrice(): number {
        return this.price;
    }

    public get petId(): string {
        return this.id;
    }
}
