import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl} from '@angular/platform-browser';


@Pipe({
  name: 'safe',
  standalone: true,
})
export class SafePipe implements PipeTransform {

  /**
   * Pipe Constructor
   *
   * @param _sanitizer: DomSanitezer
   */
  // tslint:disable-next-line
  constructor(protected _sanitizer: DomSanitizer) {
  }

  /**
   * Transform
   *
   * @param value: string
   * @param type: string
   */
  transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    let result = null;
    switch (type) {
      case 'html':
        result = this._sanitizer.bypassSecurityTrustHtml(value);
        break;
      case 'style':
        result = this._sanitizer.bypassSecurityTrustStyle(value);
        break;
      case 'script':
        result = this._sanitizer.bypassSecurityTrustScript(value);
        break;
      case 'url':
        result = this._sanitizer.bypassSecurityTrustUrl(value);
        break;
      case 'resourceUrl':
        result = this._sanitizer.bypassSecurityTrustResourceUrl(value);
        break;
      default:
        result = this._sanitizer.bypassSecurityTrustHtml(value);
        break;
    }
    console.log(value, type, result);
    return result;
  }

}
