import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'countries-list';
import { ActifCorporel } from '../../classes/actif_corporel/actif-corporel';
import { LigneActifCorporelService } from '../../services/LigneActifCorporel/ligne-actif-corporel.service';


@Component({
  selector: 'app-actif-corporel',
  templateUrl: './actif-corporel.component.html',
  styleUrl: './actif-corporel.component.css'
})
export class ActifCorporelComponent implements OnInit {


 countriesList: string[] = [];
actif!:ActifCorporel;
  

  constructor(private router: Router, private formBuilder: FormBuilder, private corporel: LigneActifCorporelService) { }

  AutreQualityVisible:boolean=false;
AutreRelationVisible:boolean=false;
AutreActifVisible:boolean=false;


  matriculeFiscal = new FormControl( '',[Validators.required]);
  etatTerritoire = new FormControl( '',[Validators.required]);
  identifiant = new FormControl( '',[Validators.required]);
  raisonSociale = new FormControl( '',[Validators.required]);
  autreNatureActifcorporel = new FormControl( '',[Validators.required]);
  autreNatureRelation = new FormControl( '',[Validators.required]);
  autrequalité = new FormControl( '',[Validators.required]);
  natureActifcorporel = new FormControl( '',[Validators.required]);
  qualite = new FormControl( '',[Validators.required]);
 
  natureRelation = new FormControl( '',[Validators.required]);


  
  form = new FormGroup({
      
    matriculeFiscal :  this.matriculeFiscal,
    etatTerritoire : this.etatTerritoire,

    identifiant :  this.identifiant,
    raisonSociale : this.raisonSociale,


    autreNatureActifcorporel :  this.autreNatureActifcorporel,
    autreNatureRelation : this.autreNatureRelation,
    natureRelation: this.natureRelation,

    autrequalité :  this.autrequalité,
    natureActifcorporel : this.natureActifcorporel,
    qualite :  this.qualite,

    
    

   
  });
  ngOnInit(): void {
   
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


     this.natureActifcorporel.valueChanges.subscribe(() => {
      if(this.natureActifcorporel.value == "18")
       {
         this.AutreActifVisible = true
       }
       else {
         this.AutreActifVisible = false
       }
     });

    
    this.countriesList = Object.values(countries).map((country: any) => country.name);
   



  }

  submit(): void {
    if (this.form.valid) {
     
      this.actif = this.form.value as ActifCorporel 
      console.log(this.actif);
      this.corporel.add(this.actif).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/restructuration']);
         
   // Make sure this route is correctly configured in your routing module
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });
    }
  }

 

}
