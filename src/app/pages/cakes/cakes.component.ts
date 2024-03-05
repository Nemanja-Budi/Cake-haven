import { Component, OnInit } from '@angular/core';
import { Cake } from 'src/app/models/cake.model';
import { CakeService } from 'src/app/services/cake.service';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {

  cakes: Cake[] = [];
  ingredients: string[] = [];

  queryParams = {
    sort: 'name',
    sortDirection: 'asc',
    filter: {
      ingredients: '',
    }
  }

  constructor(private cakeService: CakeService) { }

  onGetSelect(selectIngredient: HTMLSelectElement): void {
    if(selectIngredient.value == '--') {
      this.queryParams.filter.ingredients = '';
      this.onGetAllCakes();
    }
    else {
      this.queryParams.filter.ingredients = selectIngredient.value;
      this.onGetAllCakes();
    }
  }

  onGetAllCakes(): void {
    this.cakeService.getAllCakes(this.queryParams).subscribe((value) => {
      console.log(this.cakes);
      this.cakes = value;
    });
  }

  ngOnInit(): void {
    this.onGetAllCakes();

    this.cakeService.getIngridients().subscribe((value) => {
      this.ingredients = value;
    });
  }
}
