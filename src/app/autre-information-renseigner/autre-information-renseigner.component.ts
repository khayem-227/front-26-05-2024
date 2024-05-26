
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutreInfo } from '../classes/autre info/autre-info';
import { AutreInfoService } from '../services/autre info/autre-info.service';
import { GenerateService } from '../services/generate/generate.service';

@Component({
  selector: 'app-autre-information-renseigner',
  templateUrl: './autre-information-renseigner.component.html',
  styleUrl: './autre-information-renseigner.component.css'
})
export class AutreInformationRenseignerComponent implements OnInit {
  form!: FormGroup;
  countriesList: string[] = [];
autre!:AutreInfo;

constructor(private router: Router, private formBuilder: FormBuilder, private aut: AutreInfoService, private generate: GenerateService ) { }
  ngOnInit(): void {
   

    this.form = this.formBuilder.group({
      
     
      autresInformationsARenseignerSurDeclarationPrixTransfert: ['', Validators.required]
      
     
    });
   
  }


  submit(): void {
    if (this.form.valid) {
     
      this.autre = { ...this.form.value }; 
      console.log(this.autre);
      this.aut.add(this.autre).subscribe({
        next: (response) => {
          console.log('Success:', response);
         
  
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });
    }
  }

  generateData(): void {
    this.generate.add().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        // Traite ici les données reçues
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

}
