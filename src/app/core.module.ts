import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping/shoppinglist/shopping-list.service';
import { RecipeService } from './recipes/recipe/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers: [
        ShoppingListService,
        RecipeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
          }
    ]
})
export class CoreModule {

}
