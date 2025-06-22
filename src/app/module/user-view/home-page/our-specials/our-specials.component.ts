import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-specials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-specials.component.html',
  styleUrl: './our-specials.component.css'
})
export class OurSpecialsComponent {
  specials = [
    {
      id: 'pani-puri',
      title: 'Chicken Pani Puri Shawarma',
      description:
        'Indulge in our unique Chicken Pani Puri Shawarma, combining the zingy flavors of traditional Pani Puri with the savory goodness of Shawarma. Tender chicken, crisp puris, and a burst of tangy spices make this dish a must-try fusion sensation!',
      imageUrl: 'chicken_pani_puri_shawarma.png',
    },
    {
      id: 'buzz-brownie',
      title: 'Buzz Brownie',
      description:
        'Our Buzz Brownie is a chocolate lover’s dream, infused with the perfect hint of coffee to awaken your taste buds. Indulge in this fudgy and flavorful treat that’s sure to satisfy your sweet cravings with every bite.',
      imageUrl: 'buzz_brownie.jpg',
    },
    {
      id: 'arabita-pasta',
      title: 'Chicken Arabita Pasta',
      description: 'Savor our Chicken Arrabiata Pasta, a classic Italian dish featuring tender chicken, al dente pasta, and a spicy tomato sauce infused with garlic and red chili flakes. This flavorful combination is sure to excite your palate with its perfect balance of heat and savory goodness.',
      imageUrl: 'Chicken_Arrabbiata_pasta.jpg',
    },
    {
      id: 'peri-peri-pasta',
      title: 'Peri Peri Chicken Pasta',
      description: 'Indulge in our Peri Peri Chicken Pizza, featuring tender grilled chicken marinated in fiery peri peri sauce atop a cheesy, crispy crust. This pizza packs a flavorful punch with a perfect balance of heat and savory goodness.',
      imageUrl: 'peri_peri_chicken.png',
    },
    {
      id: 'super-twin-fried-chicken',
      title: 'Super Twin Fried Chicken Burger',
      description: 'Try our Super Twin Fried Chicken Burger, a mouthwatering creation featuring two crispy fried chicken patties sandwiched between soft buns, topped with fresh lettuce, tomatoes, and our signature sauce. Experience the ultimate satisfaction with this indulgent and flavorful burger that sure to leave you craving more!',
      imageUrl: 'super_twin_fried_chicken_burger.jpg',
    },
  ];


  selectedSpecial = this.specials[0];

  selectSpecial(special: typeof this.specials[0]) {
    this.selectedSpecial = special;
  }
}
