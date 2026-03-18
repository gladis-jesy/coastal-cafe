import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import { Food } from '../../../../core/models/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-our-specials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-specials.component.html',
  styleUrl: './our-specials.component.css'
})
export class OurSpecialsComponent implements OnInit, OnDestroy {
  private sharedDataService = inject(SharedDataService);


  specials: Food[] = [];
  selectedSpecial: Food | null = null;
  private dataSubscription: Subscription = new Subscription();

  /**
   * Subscribes to the shared stream rather than making its own API call so the specials
   * section stays in sync with the rest of the page without an extra network request.
   * selectedSpecial defaults to the first item so the detail panel is never blank
   * on initial render — the user can then click to switch.
   */
  ngOnInit(): void {

    this.dataSubscription = this.sharedDataService.foodData$.subscribe((foods) => {
      const specialFoods = foods.filter(food => food.special === true);

      this.specials = specialFoods;
      this.selectedSpecial = this.specials.length > 0 ? this.specials[0] : null;
    });
  }

  selectSpecial(special: Food): void {
    this.selectedSpecial = special;
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
