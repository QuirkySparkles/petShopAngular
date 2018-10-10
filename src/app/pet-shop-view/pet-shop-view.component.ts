import { Component, OnInit } from '@angular/core';
import { Pet } from '../petClasses/Pet';
import { PetShopService } from '../pet-shop.service';
import { AddPetModalComponent } from '../add-pet-modal/add-pet-modal.component';

@Component({
  selector: 'pet-shop-view',
  templateUrl: './pet-shop-view.component.html',
  styleUrls: ['./pet-shop-view.component.css']
})

export class PetShopViewComponent implements OnInit {
    private isModalShown = false;
    private isAllShown = true;
    private allPets: Pet[];
    private whiteAndFluffy: Pet[] = [];
    private expensive: Pet[] = [];
    private cats: Pet[] = [];

    constructor(private petShopService: PetShopService) { }

    getAllPets(): void {
        this.petShopService.getAllPets()
            .subscribe(pet => {
                this.allPets = pet;
                this.whiteAndFluffy = this.petShopService.whiteFluffyPets;
                this.expensive = this.petShopService.expensivePets;
                this.cats = this.petShopService.allCats;
            });
    }

    switchModal(): void {
        this.isModalShown = !this.isModalShown;
    }

    switchShowMode(state: boolean): void {
        this.isAllShown = state;
    }

    onPetAddition(pet: Pet): void {
        // this.allPets.push(pet);  //double push
        this.whiteAndFluffy = this.petShopService.whiteFluffyPets;
        this.expensive = this.petShopService.expensivePets;
        this.cats = this.petShopService.allCats;
    }

    ngOnInit() {
        this.getAllPets();
    }

}
