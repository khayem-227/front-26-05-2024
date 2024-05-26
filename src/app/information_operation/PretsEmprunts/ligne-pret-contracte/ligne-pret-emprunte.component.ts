import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'countries-list';
import { PretAccorde } from '../../../classes/pret accordé/pret-accorde';
import { LigneAccordeService } from '../../../services/pret accorde/ligne-accorde.service';

@Component({
  selector: 'app-ligne-pret-emprunte',
  templateUrl: './ligne-pret-emprunte.component.html',
  styleUrl: './ligne-pret-emprunte.component.css'
})
export class LignePretEmprunteComponent implements OnInit {
  
 countriesList: string[] = [];
 accorde!:PretAccorde;
  constructor(private router: Router, private formBuilder: FormBuilder, private serv: LigneAccordeService) { }
  visible:boolean=false;
  AutreRelationVisible:boolean=false;
  
  raisonSociale= new FormControl ('', [Validators.required]);
  identifiant = new FormControl ('', [Validators.required]);
  etatTerritoire = new FormControl ('', [Validators.required]);
  matriculeFiscal= new FormControl ('', [Validators.required]);
  qualite = new FormControl ('', [Validators.required]);
  autreQualite = new FormControl ('');
  natureRelation = new FormControl ('', [Validators.required]);
  autreNatureRelation = new FormControl ('');
  soldeOuverture = new FormControl ('', [Validators.required]);
  devise= new FormControl ('', [Validators.required]);
  mouvementsAugmentations= new FormControl ('', [Validators.required]);
  soldeCloture= new FormControl ('', [Validators.required]);
  pretsInterets= new FormControl ('', [Validators.required]);
  tauxInterets= new FormControl ('', [Validators.required]);
  mouvementsDiminutions= new FormControl ('', [Validators.required]);
  
  
  form = new FormGroup ({
    matriculeFiscal :  this.matriculeFiscal,
    etatTerritoire : this.etatTerritoire,
  
      identifiant :  this.identifiant,
      raisonSociale : this.raisonSociale,
  
      autreNatureRelation : this.autreNatureRelation,
      natureRelation: this.natureRelation,
  
      autreQualite :  this.autreQualite,
      qualite :  this.qualite,
  
      soldeOuverture :  this.soldeOuverture,
      pretsInterets : this.pretsInterets,
      
      mouvementsAugmentations : this.mouvementsAugmentations,
      mouvementsDiminutions : this.mouvementsDiminutions,


      soldeCloture :  this.soldeCloture,
      tauxInterets : this.tauxInterets,
    
      devise : this.devise,
  
  
    })

    ngOnInit(): void {


    
   
  
      
   
       this.natureRelation.valueChanges.subscribe(() => {
        if(this.natureRelation.value == "5")
         {
           this.AutreRelationVisible = true
         }
         else {
           this.AutreRelationVisible = false
         }
       });
   
   
       this.qualite.valueChanges.subscribe(() => {
         if(this.qualite.value == "6")
          {
            this.visible = true
          }
          else {
            this.visible = false
          }
        });
  
  
        
      this.countriesList = Object.values(countries).map((country: any) => country.name);
    }

  submit(): void {
    if (this.form.valid) {
     
      this.accorde = this.form.value as PretAccorde
      

      console.log(this.accorde);

      this.serv.add2(this.accorde).subscribe({
        next: (Response) => {
          console.log('Success:', Response);
           this.router.navigate(['/sans-contre']);
        },
        error: (error) => {
          console.error('Erreur :', error);
        }
      });



 

    }




  }}

