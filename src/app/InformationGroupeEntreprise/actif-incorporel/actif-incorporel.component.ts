import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'countries-list';
import { ActifIncorporel } from '../../classes/actif_incorporel/actif-incorporel';
import { LigneActifIncorporelService } from '../../services/LigneActifIncorporel/ligne-actif-incorporel.service';

@Component({
  selector: 'app-actif-incorporel',
  templateUrl: './actif-incorporel.component.html',
  styleUrl: './actif-incorporel.component.css'
})
export class ActifIncorporelComponent implements OnInit {

  countriesList: string[] = [];
actif!:ActifIncorporel;
  constructor(private router: Router, private formBuilder: FormBuilder, private incorporel: LigneActifIncorporelService) { }

AutreQualityVisible:boolean=false;
AutreRelationVisible:boolean=false;
AutreActifVisible:boolean=false;
 
  
  matriculeFiscal = new FormControl( '',[Validators.required]);
  etatTerritoire = new FormControl( '',[Validators.required]);
  identifiant = new FormControl( '',[Validators.required]);
  raisonSociale = new FormControl( '',[Validators.required]);
  autreNatureActifIncorporel = new FormControl( '',[Validators.required]);
  autreNatureRelation = new FormControl( '',[Validators.required]);
  autrequalité = new FormControl( '',[Validators.required]);
  natureActifIncorporel = new FormControl( '',[Validators.required]);
  qualite = new FormControl( '',[Validators.required]);
  onreuxGratuit = new FormControl( '',[Validators.required]);
  natureRelation = new FormControl( '',[Validators.required]);


  
  form = new FormGroup({
      
    matriculeFiscal :  this.matriculeFiscal,
    etatTerritoire : this.etatTerritoire,

    identifiant :  this.identifiant,
    raisonSociale : this.raisonSociale,


    autreNatureActifIncorporel :  this.autreNatureActifIncorporel,
    autreNatureRelation : this.autreNatureRelation,
    natureRelation: this.natureRelation,

    autrequalité :  this.autrequalité,
    natureActifIncorporel : this.natureActifIncorporel,
    qualite :  this.qualite,

    onreuxGratuit : this.onreuxGratuit,
    

   
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


     this.natureActifIncorporel.valueChanges.subscribe(() => {
      if(this.natureActifIncorporel.value == "11")
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
     
      this.actif =this.form.value as ActifIncorporel
      console.log(this.actif);
      this.incorporel.add(this.actif).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/actif-corporel']);
         
   
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });
    }
  }
}
