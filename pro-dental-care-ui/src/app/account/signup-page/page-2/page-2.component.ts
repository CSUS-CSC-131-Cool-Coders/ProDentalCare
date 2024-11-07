import {Component, input, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-page-2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './page-2.component.html',
  styleUrls: ['../../login-page/login-page.component.css']
})
export class Page2Component {

  @Input()
  public ssn: string;

  @Input()
  public dob: Date;

  @Input()
  public sex: string;

  @Input()
  public selectedLang: any;

  @Input()
  public height: number;

  @Input()
  public weight: number;

  public langCodes = [
      {
        lang: "English",
        code: "en"
      },
      {
        lang: "Spanish",
        code: "es"
      }];

  public submitSignUp() {

  }


}
