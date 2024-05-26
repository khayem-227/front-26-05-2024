import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'countries-list';
import { LigneServiceService } from '../../../services/information services/ligne-service.service';
import { LigneInfoService } from '../../../classes/information service/ligne-info-service';
import { Service } from '../../../classes/information service/service';
import { PrealablesService } from '../../../services/prealable/prealables.service';
import { LignePrealable } from '../../../classes/accors prealables/ligne-prealable';
import { Prealable } from '../../../classes/accors prealables/prealable';

@Component({
  selector: 'app-op-accord-prealable',
  templateUrl: './op-accord-prealable.component.html',
  styleUrl: './op-accord-prealable.component.css'
})
export class OpAccordPrealableComponent implements OnInit {

  
  countriesList: string[] = [];
  ligneprealable!:LignePrealable;
  prealable!:Prealable;
  constructor(private router: Router, private formBuilder: FormBuilder, private serv:PrealablesService) { }
  AutreQualityVisible:boolean=false;
  AutreRelationVisible:boolean=false;
  visible:boolean=false;


  raisonSociale= new FormControl ('', [Validators.required]);
  natureOperation = new FormControl ('', [Validators.required]);
  identifiant = new FormControl ('', [Validators.required]);
  etatTerritoire = new FormControl ('', [Validators.required]);
  matriculeFiscal= new FormControl ('', [Validators.required]);
  qualite = new FormControl ('', [Validators.required]);
  autreQualite = new FormControl ('');
  natureRelation = new FormControl ('', [Validators.required]);
  autreNatureRelation = new FormControl ('');
  exerciceDebut = new FormControl ('');
  exerciceFin = new FormControl ('', [Validators.required]);
  affirmation = new FormControl ('');

  form = new FormGroup ({
    matriculeFiscal :  this.matriculeFiscal,
    etatTerritoire : this.etatTerritoire,
  
      identifiant :  this.identifiant,
      raisonSociale : this.raisonSociale,
  
      autreNatureRelation : this.autreNatureRelation,
      natureRelation: this.natureRelation,
  
      autreQualite :  this.autreQualite,
      qualite :  this.qualite,
  
      natureOperation :  this.natureOperation,
      
      exerciceDebut : this.exerciceDebut,
      exerciceFin : this.exerciceFin,
      affirmation : this.affirmation
    
     
  
  
    })



    ngOnInit(): void {
   
      this.affirmation.valueChanges.subscribe(() => {
        this.makeitvisible();
      });
      this.qualite.valueChanges.subscribe(() => {
        if(this.qualite.value == "6")
         {
           this.AutreQualityVisible = true
         }
         else {
           this.AutreQualityVisible = false
         }
       });
   
   
   
   
       this.natureRelation.valueChanges.subscribe(() => {
         if(this.natureRelation.value == "5")
          {
            this.AutreRelationVisible = true
          }
          else {
            this.AutreRelationVisible = false
          }
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
        this.countriesList = Object.values(countries).map((country: any) => country.name);

      } 

  submit(): void {
    if (this.form.valid) {
     
      this.ligneprealable = this.form.value as LignePrealable
      this.prealable = this.form.value as Prealable 

      console.log(this.prealable);

      this.serv.add2(this.prealable).subscribe({
        next: (Response) => {
          console.log('Success:', Response);
        },
        error: (error) => {
          console.error('Erreur :', error);
        }
      });

      this.serv.add(this.ligneprealable).subscribe({
        next: (response) => {
          console.log('Success:', response);
         
          this.router.navigate(['/autre']);
        },
        
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });


 

    }




  }

}
