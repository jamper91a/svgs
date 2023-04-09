import { Injectable } from '@angular/core';
import {ColorDto} from "./dto/color.dto";

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private allColors: ColorDto[] = [];
  constructor() {
    this.loadColors();
  }

  public getColors(){
    return this.allColors;
  }


  private loadColors(){
    this.allColors.push({
      id: 1,
      color: 'Green',
      hex: '#00FF00'
    });
    this.allColors.push({
      id: 2,
      color: 'Red',
      hex: '#FF0000'
    });
    this.allColors.push({
      id: 3,
      color: 'Yellow',
      hex: '#FFFF00'
    });
  }
}
