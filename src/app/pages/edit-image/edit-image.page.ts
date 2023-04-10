import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";
import {DesignsService} from "../../api/designs.service";
import {DesignDto} from "../../api/dto/design.dto";
import {SafePipe} from "../../pipes/safe.pipe";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ColorsService} from "../../api/colors.service";
import {ColorDto} from "../../api/dto/color.dto";
import { jsPDF } from 'jspdf';
import 'svg2pdf.js'

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.page.html',
  styleUrls: ['./edit-image.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SafePipe]
})
export class EditImagePage implements OnInit, AfterViewInit {
  @ViewChild('svgObject') svgObject: ElementRef | undefined;
  designId: number = 0;
  design: DesignDto | null = null;
  trustUrl: SafeUrl | null = null;
  colors: ColorDto [] = [];
  currentColor: ColorDto | null = null;
  constructor(
    private route: ActivatedRoute,
    private designsService: DesignsService,
    private colorsService: ColorsService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.designId = +params['id'];
      if (this.designId) {
        await this.loadSvg(this.designId);
      }
    });
  }

  ngAfterViewInit() {
    this.loadColors();
  }

  loadColors(){
    this.colors = this.colorsService.getColors();
  }

  async loadSvg(id: number){
    console.log("load design by id: ", id);
    this.design = this.designsService.getDesignById(id);
    if(this.design) {
      this.svgListener();
    }


  }


  svgListener(retry = 0){
    const self = this;
    const svgDocument = self.svgObject?.nativeElement.getSVGDocument();
    // const svgDocument = self.svgObject?.nativeElement;
    if(!svgDocument) {
      if(retry < 3) {
        retry++;
        setTimeout(() => {
          self.svgListener(retry);
        }, 1000);
      }
      return;
    }
    svgDocument.addEventListener('click', function (e: any) {
      if(self.currentColor !== null) {
        const object = e.target;
        console.log(e.target.id);
        object.setAttribute('style', 'fill:' + self.currentColor.hex);
      }
    });
  }

  selectColor(color: ColorDto) {
    this.currentColor = color;
  }


  printPdf(){
    const doc = new jsPDF()
    const svgDocument = this.svgObject?.nativeElement.getSVGDocument();
    const svg = svgDocument.getElementsByTagName('svg');

    if(svg && svg[0]) {
      doc
          .svg(svg[0], {
            x: 15,
            y: 15,
            width: 200,
            height: 200
          })
          .then(() => {
            // save the created pdf
            doc.save(this.design?.name)
          })
    }



  }

}
