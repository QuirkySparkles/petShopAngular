export class PetModalClass {
    public type: string;
    public color: string;
    public price: number;
    public name: string;
    public isFluffy: boolean;

    constructor(type: string, color: string, price: number, name?: string, isFluffy?: boolean) {
        this.type = type;
        this.color = color;
        this.price = price;
        this.name = name;
        this.isFluffy = isFluffy;
    }
}
