import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping/shoppinglist/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {}

  /* private recipes: Recipe[] = [
      new Recipe('Tasty Schnitzel', 'A super-tasty Schnitzel - just awesome!',
      'https://www.thespruceeats.com/thmb/VYxi1MPOLh3W286dhp270ozcjrY=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/wiener-schnitzel-recipe-1447089-Hero-5b587d6c46e0fb0071b0059d.jpg',
      [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
      ]),
      new Recipe('Big Fat Burger', 'What else you need to say?',
        'https://media.gettyimages.com/photos/cheeseburgeron-a-rustic-wood-cutting-board-picture-id486414934?s=2048x2048',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
    ]; */

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
      return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes.slice()[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}
