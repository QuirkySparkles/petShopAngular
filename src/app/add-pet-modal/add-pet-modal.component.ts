import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { PetShopService } from '../pet-shop.service';
import { PetModalClass } from '../pet-modal-class';
import { Pet } from '../petClasses/Pet';

@Component({
  selector: 'app-add-pet-modal',
  templateUrl: './add-pet-modal.component.html',
  styleUrls: ['./add-pet-modal.component.css']
})

// appropriate form model
export class AddPetModalComponent implements OnInit {
    @Input() isModalShown: boolean;

    @Output() shutModalRequest = new EventEmitter<boolean>();
    @Output() showNewPet = new EventEmitter<Pet>();

    private petTypes: string[] = ['Cat', 'Dog', 'Hamster'];
    private petColors: string[] = ['Black', 'Brown', 'White', 'Cream', 'Gray', 'Blonde', 'Ashen'];
    chosenPet = 'Cat';

    private model = new PetModalClass(this.petTypes[0], this.petColors[0], 10, '', false);

    constructor(private petShopService: PetShopService) { }

    ngOnInit() {
    }

    changeModal(newPet: string): void {
        this.chosenPet = newPet;
    }

    processSubmit(): void {
        this.petShopService.createPet(this.model)
            .subscribe(pet => this.showNewPet.emit(pet));
    }

    shutModal(): void {
        this.shutModalRequest.emit(false);
    }

}
