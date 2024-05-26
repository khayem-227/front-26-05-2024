import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'countries-list';
import { InfoOpFinService } from '../../../services/informations operations financieres/info-op-fin.service';
import { LigneInfoOpFin } from '../../../classes/informations operations financieres/ligne-info-op-fin';
import { InfoOpFin } from '../../../classes/informations operations financieres/info-op-fin';

@Component({
  selector: 'app-info-op-finan',
  templateUrl: './info-op-finan.component.html',
  styleUrl: './info-op-finan.component.css'
})
export class InfoOpFinanComponent implements OnInit {
  
  countriesList: string[] = [];
ligne!:LigneInfoOpFin;
op!:InfoOpFin;
  constructor(private router: Router, private formBuilder: FormBuilder, private ligneInfoOpFin: InfoOpFinService) { }


  AutreQualityVisible:boolean=false;
  AutreRelationVisible:boolean=false;
  AutreOperationVisible:boolean=false;
  AutreMethodePrixVisible:boolean=false;
  AutreChangementMethodePrixVisible:boolean=false;

  achatsDepenses = new FormControl ('', [Validators.required]);
  ventesRevenus= new FormControl ('', [Validators.required]);
  raisonSociale= new FormControl ('', [Validators.required]);
  natureOperation = new FormControl ('', [Validators.required]);
  identifiant = new FormControl ('', [Validators.required]);
  etatTerritoire = new FormControl ('', [Validators.required]);
  matriculeFiscal= new FormControl ('', [Validators.required]);
  qualite = new FormControl ('', [Validators.required]);
  autreQualite = new FormControl ('');
  natureRelation = new FormControl ('', [Validators.required]);
  autreNatureRelation = new FormControl ('');
  methodeDeterminationPrixTransfert = new FormControl ('', [Validators.required]);
  autreMethodeDeterminationPrixTransfert = new FormControl ('',);
  changementMethodeDeterminationPrixTransfert = new FormControl ('', [Validators.required]);
  chnagementAutreMethodeDeterminationPrixTransfert = new FormControl ('');
  totalAchatsDepensesOperationsFinancieres = new FormControl ('', [Validators.required]);
  totalVentesRevenusOperationsFinancieres = new FormControl ('', [Validators.required]);
  autreNatureOperation =new FormControl ('');
  
  
  form = new FormGroup ({
  matriculeFiscal :  this.matriculeFiscal,
  etatTerritoire : this.etatTerritoire,

    identifiant :  this.identifiant,
    raisonSociale : this.raisonSociale,

    autreNatureRelation : this.autreNatureRelation,
    natureRelation: this.natureRelation,

    autreQualite :  this.autreQualite,
    qualite :  this.qualite,


    achatsDepenses :  this.achatsDepenses,
    ventesRevenus : this.ventesRevenus,

    methodeDeterminationPrixTransfert :  this.methodeDeterminationPrixTransfert,
    raisoautreMethodeDeterminationPrixTransfertSociale : this.autreMethodeDeterminationPrixTransfert,

    changementMethodeDeterminationPrixTransfert : this.changementMethodeDeterminationPrixTransfert,
    chnagementAutreMethodeDeterminationPrixTransfert: this.chnagementAutreMethodeDeterminationPrixTransfert,

    totalAchatsDepensesOperationsFinancieres :  this.totalAchatsDepensesOperationsFinancieres,
    totalVentesRevenusOperationsFinancieres :  this.totalVentesRevenusOperationsFinancieres,

    natureOperation :  this.natureOperation,
    autreNatureOperation:this.autreNatureOperation,

    autreMethodeDeterminationPrixTransfert:this.autreMethodeDeterminationPrixTransfert


  })



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



      this.changementMethodeDeterminationPrixTransfert.valueChanges.subscribe(() => {
        if(this.changementMethodeDeterminationPrixTransfert.value == "autre")
         {
           this.AutreChangementMethodePrixVisible = true
         }
         else {
           this.AutreChangementMethodePrixVisible = false
         }
       });
   
   
   
   
       this.methodeDeterminationPrixTransfert.valueChanges.subscribe(() => {
         if(this.methodeDeterminationPrixTransfert.value == "autre")
          {
            this.AutreMethodePrixVisible = true
          }
          else {
            this.AutreMethodePrixVisible = false
          }
        });

        this.natureOperation.valueChanges.subscribe(() => {
          if(this.natureOperation.value == "5")
           {
             this.AutreOperationVisible = true
           }
           else {
             this.AutreOperationVisible = false
           }
         });

    this.countriesList = Object.values(countries).map((country: any) => country.name);

  }

  submit(): void {
    if (this.form.valid) {
     
      this.ligne = this.form.value as LigneInfoOpFin
      this.op = this.form.value as InfoOpFin
      console.log(this.ligne);
      this.ligneInfoOpFin.add(this.ligne).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/cession-acquisition']);
         
   // Make sure this route is correctly configured in your routing module
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });


      this.ligneInfoOpFin.add2(this.op).subscribe({
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
