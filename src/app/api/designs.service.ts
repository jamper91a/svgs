import { Injectable } from '@angular/core';
import {DesignDto} from "./dto/design.dto";

@Injectable({
  providedIn: 'root'
})
export class DesignsService {

  allDesigns: DesignDto[] = [];

  constructor() {
    this.fillDesigns();
  }

  getDesigns(): DesignDto[]{
    return this.allDesigns;
  }

  getDesignById(id: number): DesignDto | null {
    for(const design of this.allDesigns) {
      if(design.id === id) {
        return design;
      }
    }
    return null;
  }

  private fillDesigns(){
    this.allDesigns.push({
      id: 1,
      url: '/assets/svgs/kingfisher.svg',
      name: 'King fisher'
    });
    this.allDesigns.push({
      id: 2,
      url: '/assets/svgs/rat.svg',
      name: 'Rats'
    });
    this.allDesigns.push({
      id: 3,
      url: '/assets/svgs/kingfisher2.svg',
      name: 'King fisher 2 '
    });
  }



}
