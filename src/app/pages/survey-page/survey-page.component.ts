import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Style } from 'src/app/models/style';
import { SurveyService } from 'src/app/services/survey.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss']
})
export class SurveyPageComponent implements OnInit {

  createForm: FormGroup = this.formBuilder.group({
    estilo: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  styles: Style[] | undefined;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    this.getStyles();
  }

  getStyles(): void {
    this.surveyService.getStyles().subscribe({
      next: response => { this.styles = response; },
      error: err => {
        Swal.fire({
          icon: 'error',
          text: `Error obteniendo listado de estilos musicales: ${err}`,
          toast: true,
          position: 'top-right',
          timer: 2000
        });
      }
    });
  }

  register(): void {
    this.createForm.markAllAsTouched();
    if (this.createForm.invalid) {
      return;
    }

    this.surveyService.register({
      email: this.createForm.get('email')!.value,
      estilo: this.createForm.get('estilo')!.value
    }).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          text: `Encuenta registrada de manera satisfactoria`,
          toast: true,
          position: 'top-right',
          timer: 2000
        });
        this.createForm.reset();
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: `Error registrando la encuenta: ${err.error.message}`,
          toast: true,
          position: 'top-right',
          timer: 2000
        });
      },
    });
  }

}
