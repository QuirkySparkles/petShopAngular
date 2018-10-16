import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from './petClasses/Pet';
import { Cat } from './petClasses/Cat';
import { Hamster } from './petClasses/Hamster';
import { Dog } from './petClasses/Dog';
import { PetModalClass } from './pet-modal-class';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class PetShopService {
    private petsUrl = '/api/';

    private allPets: Pet[] = [];
    private whiteAndFluffy: Pet[] = [];
    private expensive: Pet[] = [];
    private cats: Pet[] = [];
    private totalPrice = 0;

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);

            return of(result as T);
        };
    }

    constructor(private http: HttpClient) { }

    getAllPets(): Observable<Pet[]> {
        return this.http.get<Pet[]>(this.petsUrl)
             .pipe(
                tap((pets: Pet[]) => this.allPets = pets),
                tap((pets: Pet[]) => this.filterCats()),
                tap((pets: Pet[]) => this.filterExpensive()),
                tap((pets: Pet[]) => this.filterWhiteFluffy()),
                catchError(this.handleError('getAllPets', []))
            );
    }

    createPet(petSpecimen: PetModalClass): Observable<Pet> {
        let newPet: Cat | Dog | Hamster;

        if (petSpecimen.type === 'Cat') {
            newPet = new Cat(petSpecimen.color, petSpecimen.price, petSpecimen.name, petSpecimen.isFluffy);
        } else if (petSpecimen.type === 'Dog') {
            newPet = new Dog(petSpecimen.color, petSpecimen.price, petSpecimen.name);
        } else {
            newPet = new Hamster(petSpecimen.color, petSpecimen.price, petSpecimen.isFluffy);
        }

        return this.addPet(newPet);
    }

    addPet(newPet: Cat | Dog | Hamster): Observable<any> {  // any
        return this.http.post<Pet>(this.petsUrl, newPet, httpOptions)
            .pipe(
                tap(() => this.assignNewPet(newPet)),
                catchError(this.handleError('addPet'))
            );
    }

    assignNewPet(newPet: Cat | Dog | Hamster): void {
        this.totalPrice += newPet.price;

        if (newPet instanceof Cat) {
            this.cats.push(newPet);
        }

        if (newPet.color === 'White' && !(newPet instanceof Dog)) { // cannot check fluffiness directly

            if (newPet.isFluffy) {
                this.whiteAndFluffy.push(newPet);
            }
        }

        this.allPets.push(newPet);
        this.filterExpensive();
    }

    filterCats(): void {
        this.cats = this.allPets.filter(pet => (pet.type === 'Cat'));
    }

    filterExpensive(): void {

        if (!this.totalPrice) {
            this.allPets.forEach(pet => this.totalPrice += pet.price);
        }

        this.expensive = this.allPets.filter(pet => pet.price > (this.totalPrice / this.allPets.length));
    }

    filterWhiteFluffy(): void {
        this.whiteAndFluffy = this.allPets.filter(pet => {

            if (pet.type === 'Cat') {
                const cat: Cat = pet as Cat;

                return (cat.color === 'White' && cat.isFluffy);
            } else if (pet.type === 'Hamster') {
                const hamster: Hamster = pet as Hamster;

                return (hamster.color === 'White' && hamster.isFluffy);
            } else {
                return false;
            }
        });
    }

    get allCats(): Pet[] {
        return this.cats;
    }

    get expensivePets(): Pet[] {
        return this.expensive;
    }

    get whiteFluffyPets(): Pet[] {
        return this.whiteAndFluffy;
    }

}
