import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { PetShopViewComponent } from './pet-shop-view/pet-shop-view.component';
import { AddPetModalComponent } from './add-pet-modal/add-pet-modal.component';
import { PetInstanceComponent } from './pet-instance/pet-instance.component';

@NgModule({
  declarations: [
    AppComponent,
    PetShopViewComponent,
    AddPetModalComponent,
    PetInstanceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
