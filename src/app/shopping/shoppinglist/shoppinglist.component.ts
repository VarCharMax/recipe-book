import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private igChanged: Subscription;

  constructor(private slService: ShoppingListService,
    private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChanged = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItems(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.igChanged.unsubscribe();
  }

}
