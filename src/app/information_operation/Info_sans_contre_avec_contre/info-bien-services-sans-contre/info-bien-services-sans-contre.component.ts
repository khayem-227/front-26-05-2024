import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'countries-list';
import { AvecContrePartie } from '../../../classes/InformationsOpérations/avec_contre_partie/avec-contre-partie';
import { LigneAvecContrePartie } from '../../../classes/InformationsOpérations/avec_contre_partie/ligne-avec-contre-partie';
import { LigneAvecContrePartieService } from '../../../services/InformationOperation/avec contre partie/ligne-avec-contre-partie.service';
import { LigneSansContreService } from '../../../services/InformationOperation/sans contre partie/ligne-sans-contre.service';

@Component({
  selector: 'app-info-bien-services-sans-contre',
  templateUrl: './info-bien-services-sans-contre.component.html',
  styleUrl: './info-bien-services-sans-contre.component.css'
})
export class InfoBienServicesSansContreComponent implements OnInit {
  
  countriesList: string[] = [];
  ligne!:LigneAvecContrePartie;
  affirma!:AvecContrePartie;
  constructor(private router: Router, private formBuilder: FormBuilder, private contre: LigneSansContreService) { }

 
  AutreQualityVisible:boolean=false;
  AutreRelationVisible:boolean=false;
visible:boolean=false;
   
    
    matriculeFiscal = new FormControl( '',[Validators.required]);
    etatTerritoire = new FormControl( '',[Validators.required]);
    identifiant = new FormControl( '',[Validators.required]);
    raisonSociale = new FormControl( '');
    autreNatureRelation = new FormControl( '');
    autreQualité = new FormControl( '',[Validators.required]);
    natureContrepartie = new FormControl( '',[Validators.required]);
    qualite = new FormControl( '',[Validators.required]);
    natureBiensOuService = new FormControl( '',[Validators.required]);
    natureRelation = new FormControl( '',[Validators.required]);
    affirmation = new FormControl( '',[Validators.required]);
  
  
    
    form = new FormGroup({
        
      matriculeFiscal :  this.matriculeFiscal,
      etatTerritoire : this.etatTerritoire,
  
      identifiant :  this.identifiant,
      raisonSociale : this.raisonSociale,
  
  
      
      autreNatureRelation : this.autreNatureRelation,
      natureRelation: this.natureRelation,
  
      autreQualité :  this.autreQualité,
      natureContrepartie : this.natureContrepartie,

      qualite :  this.qualite,
      natureBiensOuService : this.natureBiensOuService,
      affirmation : this.affirmation,
      
  
     
    });


  ngOnInit(): void {


    this.affirmation.valueChanges.subscribe(() => {
      if(this.affirmation.value == "O")
       {
         this.visible = true
       }
       else {
         this.visible = false
       }
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


      
    this.countriesList = Object.values(countries).map((country: any) => country.name);
  }

  submit(): void {
    if (this.form.valid) {
     
      this.ligne = this.form.value as LigneAvecContrePartie 
      this.affirma = this.form.value as  AvecContrePartie;
      console.log(this.ligne);
      this.contre.add(this.ligne).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/avec-contre']);
         
   // Make sure this route is correctly configured in your routing module
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });


      this.contre.add2(this.affirma).subscribe({
        next: (affirmationResponse) => {
          console.log('Affirmation Success:', affirmationResponse);
        },
        error: (error) => {
          console.error('Erreur lors de l\'affirmation:', error);
        }
      });

    }
  }
  
}
