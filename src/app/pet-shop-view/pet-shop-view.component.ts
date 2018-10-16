import { Component, OnInit } from '@angular/core';
import { Pet } from '../petClasses/Pet';
import { PetShopService } from '../pet-shop.service';

@Component({
  selector: 'app-pet-shop-view',
  templateUrl: './pet-shop-view.component.html',
  styleUrls: ['./pet-shop-view.component.css']
})

export class PetShopViewComponent implements OnInit {
    private isModalShown = false;
    private showMode = 'all';
    private allPets: Pet[];
    private whiteAndFluffy: Pet[] = [];
    private expensive: Pet[] = [];
    private cats: Pet[] = [];

    constructor(private petShopService: PetShopService) { }

    ngOnInit() {
        this.getAllPets();
    }

    getAllPets(): void {
        this.petShopService.getAllPets()
            .subscribe(shopPets => {
                this.allPets = shopPets;
                this.whiteAndFluffy = this.petShopService.whiteFluffyPets;
                this.expensive = this.petShopService.expensivePets;
                this.cats = this.petShopService.allCats;
            });
    }

    switchModal(): void {
        this.isModalShown = !this.isModalShown;
    }

    switchShowMode(state: string): void {
        this.showMode = state;
    }

    // fetch only expensive pets because of full recalculating of that array
    onPetAddition(): void {
        this.expensive = this.petShopService.expensivePets;
    }
}
