import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { StyleResponse } from '../models/style-response';
import { SurveyRequest } from '../models/survey-request';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  private _alert = new Subject<any>();
  alert={"type":"success","message":"", "show":false};
  styles:StyleResponse[] = [];
  createForm: FormGroup;

  @ViewChild('resultAlert', {static: false}) resultAlert: NgbAlert | undefined;

  constructor(private service: SurveyService, private formBuilder: FormBuilder) { 
    this.createForm = this.formBuilder.group({
      style: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this._alert.subscribe(alert => this.alert = alert);
    this._alert.pipe(debounceTime(5000)).subscribe(() => {
      if (this.resultAlert) {
        this.resultAlert.close();
        this._alert.next({"type":"", "message": "", "show": false});
      }
    });
    this.getStyles();
  }

  getStyles(): void {
    /*this.service.getStyles().subscribe( response => {
      this.styles = response;
    });*/
    this.service.getStyles().subscribe({
      next: response => { this.styles = response; },
      error: err => {
        this._alert.next({"type":"danger", "message": `Error obteniendo listado de estilos musicales: ${err}`, "show": true});
      }
    });
  }

  register(): void {
    this.createForm.markAllAsTouched();
    if (this.createForm.invalid) {
      return;
    }
    let data = this.createForm.value;
    this.service.register(data).subscribe({
      next: response => {
        this._alert.next({"type":"success", "message": "Encuenta registrada de manera satisfactoria", "show": true});
        this.createForm.reset();
      },
      error: err => {
        this._alert.next({"type":"danger", "message": `Error registrando la encuenta: ${err.error.message}`, "show": true});
      }
    });
  }
}
