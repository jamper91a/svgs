import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {DesignsService} from "../../api/designs.service";
import {DesignDto} from "../../api/dto/design.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  designs: DesignDto[] = [];
  constructor(
    private designsService: DesignsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  private getData(){
    this.designs = this.designsService.getDesigns();
  }

  onIonInfinite($event: any) {
    this.designs.concat(this.designsService.getDesigns());
  }

  goToEditImage(id: number) {
    this.router.navigate(['edit-image/', id])
  }
}
