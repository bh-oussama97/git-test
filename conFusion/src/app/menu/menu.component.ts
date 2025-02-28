import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import {flyInOut ,expand} from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]' : 'true',
    'style' : 'display: block;'
  },
  animations : [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {
  
  dishes : Dish[];
  selectedDish : Dish;

  errMess: string;

  constructor(private dishService: DishService, @Inject('BaseURL') private BaseURL) { }
  onSelect(dish : Dish) {
    this.selectedDish = dish;
  }
  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

}