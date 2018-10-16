import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PetShopViewComponent } from './pet-shop-view/pet-shop-view.component';
import { AddPetModalComponent } from './add-pet-modal/add-pet-modal.component';
import { PetInstanceComponent } from './pet-instance/pet-instance.component';
import { PriceValidatorDirective } from './shared/price-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    PetShopViewComponent,
    AddPetModalComponent,
    PetInstanceComponent,
    PriceValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
