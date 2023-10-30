import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent {

  constructor(private translocoservice: TranslocoService) {
    
  }
  onLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedLanguage = target.value;
    this.myMethod(selectedLanguage);
  }

  myMethod(selectedLanguage: string) {
    // Aquí puedes hacer lo que quieras con el valor seleccionado
    this.translocoservice.setActiveLang(selectedLanguage)
    console.log('Idioma seleccionado:', selectedLanguage);
    // También puedes llamar a otros métodos o realizar otras acciones aquí
  }
}
