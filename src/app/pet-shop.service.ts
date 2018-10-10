import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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

// type assign
export class PetShopService {
    private petsUrl = 'api/allPets';

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
                // tap((pets: Pet[]) => this.allPets = pets),
                tap((pets: Pet[]) => this.filterCats(pets)),
                tap((pets: Pet[]) => this.filterExpensive(pets)),
                tap((pets: Pet[]) => this.filterWhiteFluffy(pets)),
                catchError(this.handleError('getAllPets', []))
            );
    }

    createPet(petSpecimen: PetModalClass): Observable<Pet> {
        let newPet: Pet;

        if (petSpecimen.type === 'Cat') {
            newPet = new Cat(petSpecimen.color, petSpecimen.price, petSpecimen.name, petSpecimen.isFluffy);
        } else if (petSpecimen.type === 'Dog') {
            newPet = new Dog(petSpecimen.color, petSpecimen.price, petSpecimen.name);
        } else {
            newPet = new Hamster(petSpecimen.color, petSpecimen.price, petSpecimen.isFluffy);
        }

        return this.addPet(newPet);
    }

    addPet(newPet: Pet): Observable<any> {  // any
        return this.http.post<Pet>(this.petsUrl, newPet, httpOptions)
            .pipe(
                tap((addedPet: Pet) => {
                    this.assignNewPet(addedPet);
                }),
                catchError(this.handleError('addPet'))
            );
    }

    assignNewPet(newPet: Pet): void {
        this.totalPrice += newPet.price;

        // console.log(newPet instanceof Pet);

        if (newPet.type === 'Cat') {
            this.cats.push(newPet);
        }

        if (newPet.color === 'White') {
            let currentPet: Cat | Hamster;

            if (newPet.type === 'Cat') {
                currentPet = newPet as Cat;
            }

            if (newPet.type === 'Hamster') {
                currentPet = newPet as Hamster;
            }

            // console.log(currentPet instanceof Pet);

            if (currentPet.isFluffy) {
                this.whiteAndFluffy.push(currentPet);
            }
        }

        this.allPets.push(newPet);
        this.filterExpensive(this.allPets);
    }

    filterCats(allPets: Pet[]): void {
        this.cats = allPets.filter(pet => (pet.type === 'Cat'));
    }

    filterExpensive(allPets: Pet[]): void {
        this.allPets = allPets;

        if (!this.totalPrice) {
            allPets.forEach(pet => this.totalPrice += pet.price);
        }

        this.expensive = allPets.filter(pet => pet.price > (this.totalPrice / allPets.length));
    }

    filterWhiteFluffy(allPets: Pet[]): void {
        this.whiteAndFluffy = allPets.filter(pet => {

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
