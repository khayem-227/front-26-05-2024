import { Component } from '@angular/core';
import { Description } from '../../../classes/regime fiscale description/description';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegimeService } from '../../../services/regime fiscal/regime.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-description-regime-fiscale',
  templateUrl: './description-regime-fiscale.component.html',
  styleUrl: './description-regime-fiscale.component.css'
})
export class DescriptionRegimeFiscaleComponent {
  form!: FormGroup;

desc!:Description;


constructor(private router: Router, private formBuilder: FormBuilder, private aut: RegimeService ) { }
  ngOnInit(): void {
   

    this.form = this.formBuilder.group({
      
     
      descriptionTransactionsRegimeFiscalPrivilegie: ['', Validators.required]
      
     
    });
   
  }


  submit(): void {
    if (this.form.valid) {
     
      this.desc = { ...this.form.value }; 
      console.log(this.desc);
      this.aut.add(this.desc).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/pret-accorde']);
  
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });
    }
  }
}
