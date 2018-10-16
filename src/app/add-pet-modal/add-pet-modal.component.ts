import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { PetShopService } from '../pet-shop.service';
import { PetModalClass } from '../pet-modal-class';

@Component({
  selector: 'app-add-pet-modal',
  templateUrl: './add-pet-modal.component.html',
  styleUrls: ['./add-pet-modal.component.css']
})

// appropriate form model
export class AddPetModalComponent implements OnInit {
    @Input() isModalShown: boolean;

    @Output() shutModalRequest = new EventEmitter();
    @Output() showNewPet = new EventEmitter();

    private petTypes: string[] = ['Cat', 'Dog', 'Hamster'];
    private petColors: string[] = ['Black', 'Brown', 'White', 'Cream', 'Gray', 'Blonde', 'Ashen'];
    chosenPet = 'Cat';

    private model = new PetModalClass(this.petTypes[0], this.petColors[0], 10, '', false);
    private isSuccessful = false;

    constructor(private petShopService: PetShopService) { }

    ngOnInit() {
    }

    changeModal(newPet: string): void {
        this.chosenPet = newPet;
    }

    processSubmit(): void {
        this.petShopService.createPet(this.model)
            .subscribe(() => {
                this.showNewPet.emit();
                this.isSuccessful = true;
                setTimeout(() => this.isSuccessful = false, 3000);
            });
    }

    shutModal(): void {
        this.shutModalRequest.emit();
    }

}
