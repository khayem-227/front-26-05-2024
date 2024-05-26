import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'countries-list';
import { LignePartDec } from '../../classes/ligne_part_declarante/ligne-part-dec';
import { LignePartDecService } from '../../services/LigneParticipationDéclarante/ligne-part-dec.service';

@Component({
  selector: 'app-partlie',
  templateUrl: './partlie.component.html',
  styleUrl: './partlie.component.css'
})
export class PartlieComponent implements OnInit {


  
  countriesList: string[] = [];
dec!:LignePartDec;
  constructor(private router: Router, private formBuilder: FormBuilder,private declarante: LignePartDecService) { }
  AutreQualityVisible:boolean=false;

  matriculeFiscal = new FormControl( '',[Validators.required]);
  etatTerritoire = new FormControl( '',[Validators.required]);
  identifiant = new FormControl( '',[Validators.required]);
  raisonSociale = new FormControl( '',[Validators.required]);
  pourcentageDetentionCapital = new FormControl( '',[Validators.required]);
  autreQualité = new FormControl( '',[Validators.required]);
  pourcentageDetentionDroitsVote = new FormControl( '',[Validators.required]);
  qualité = new FormControl( '',[Validators.required]);



  form = new FormGroup({
      
    matriculeFiscal :  this.matriculeFiscal,
    etatTerritoire : this.etatTerritoire,

    identifiant :  this.identifiant,
    raisonSociale : this.raisonSociale,


    pourcentageDetentionCapital :  this.pourcentageDetentionCapital,

    pourcentageDetentionDroitsVote: this.pourcentageDetentionDroitsVote,

    autreQualité :  this.autreQualité,

    qualité :  this.qualité,

    
    

   
  });


  ngOnInit(): void {
   

    this.qualité.valueChanges.subscribe(() => {
      if(this.qualité.value == "6")
       {
         this.AutreQualityVisible = true
       }
       else {
         this.AutreQualityVisible = false
       }
     });

    this.countriesList = Object.values(countries).map((country: any) => country.name);
  }

  submit(): void {
    if (this.form.valid) {
     
      this.dec = this.form.value as LignePartDec 
      console.log(this.dec);
      this.declarante.add2(this.dec).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/modification']);
   // Make sure this route is correctly configured in your routing module
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });
    }
  }}
