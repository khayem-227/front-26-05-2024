import { Component, OnInit } from '@angular/core';
import { Modification } from '../../../classes/modification/modification';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentificationEntrepriseService } from '../../../services/identification_entreprise/identification-entreprise.service';
import { InfoEntreDecService } from '../../../services/identification_entreprise/info-entre-dec.service';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrl: './modification.component.css'
})
export class ModificationComponent implements OnInit {
  
  m!: Modification;
  constructor(private router: Router, private modif: InfoEntreDecService) { }
  visible: boolean = false
  description =  new FormControl('');
  affirmation = new FormControl( '',[Validators.required]);
  
  form = new FormGroup({
      
    description :  this.description,
    affirmation : this.affirmation

   
  });

 
  ngOnInit(): void {
    this.affirmation.valueChanges.subscribe(() => {
      this.makeitvisible();
    });
   }
  
  
  makeitvisible(){
    if(this.affirmation.value == "O")
      {
        this.visible = true
      }
    else
    {
      this.visible = false
    }
  } 

  submit(): void {
    if (this.form.valid) {
     
      this.m = this.form.value as Modification
      console.log(this.m);
      this.modif.modif(this.m).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/entite-mere'])
         
   // Make sure this route is correctly configured in your routing module
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });
    }
  }






}
