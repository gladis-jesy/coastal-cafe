import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../../../shared/shared-data.service'; // Update path as per your structure
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-our-specials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-specials.component.html',
  styleUrl: './our-specials.component.css'
})
export class OurSpecialsComponent implements OnInit {

  specials: any[] = [];
  selectedSpecial: any;
  private dataSubscription: Subscription = new Subscription();

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {

    this.dataSubscription = this.sharedDataService.foodData$.subscribe((foods) => {
      const specialFoods = foods.filter(food => food.special === true);

      this.specials = specialFoods;
      this.selectedSpecial = this.specials.length > 0 ? this.specials[0] : null;
    });
  }

  selectSpecial(special: any): void {
    this.selectedSpecial = special;
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
