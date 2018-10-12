import { Component, OnInit, Input } from '@angular/core';
import { Pet } from '../petClasses/Pet';

@Component({
  selector: 'app-pet-instance',
  templateUrl: './pet-instance.component.html',
  styleUrls: ['./pet-instance.component.css'],
})
export class PetInstanceComponent implements OnInit {
  @Input() pet;

  constructor() { }

  ngOnInit() {
  }

}
