import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cake } from 'src/app/models/cake.model';
import { CakeService } from 'src/app/services/cake.service';

@Component({
  selector: 'app-cake-detail',
  templateUrl: './cake-detail.component.html',
  styleUrls: ['./cake-detail.component.css']
})
export class CakeDetailComponent implements OnInit {
  id!: number;
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  cakeService: CakeService = inject(CakeService);
  cake: Cake = new Cake();

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'));
    });

    this.cakeService.onGetOneCake(this.id).subscribe((value) => {
      this.cake = value;
      console.log(value);
    });

  }
}
