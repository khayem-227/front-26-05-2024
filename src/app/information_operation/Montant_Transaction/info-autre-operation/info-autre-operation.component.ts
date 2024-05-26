import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'countries-list';
import { InfoAutre } from '../../../classes/InformationsOpérations/info autres operation/info-autre';
import { LigneAutreInfo } from '../../../classes/InformationsOpérations/info autres operation/ligne-autre-info';
import { InfoAutreOperationService } from '../../../services/InformationOperation/informations autres operations/info-autre-operation.service';

@Component({
  selector: 'app-info-autre-operation',
  templateUrl: './info-autre-operation.component.html',
  styleUrl: './info-autre-operation.component.css'
})
export class InfoAutreOperationComponent implements OnInit {
 
  countriesList: string[] = [];
  autreInfo!:InfoAutre;
  ligne!:LigneAutreInfo;
  constructor(private router: Router, private formBuilder: FormBuilder, private autre:InfoAutreOperationService) { }

//les visiblités
AutreQualityVisible:boolean=false;
AutreRelationVisible:boolean=false;
AutreMethodePrixVisible:boolean=false;
AutreChangementMethodePrixVisible:boolean=false;




  achatsDepenses = new FormControl ('', [Validators.required]);
  ventesRevenus= new FormControl ('', [Validators.required]);
  raisonSociale= new FormControl ('', [Validators.required]);
  natureAutreOperation = new FormControl ('', [Validators.required]);
  identifiant = new FormControl ('', [Validators.required]);
  etatTerritoire = new FormControl ('', [Validators.required]);
  matriculeFiscal= new FormControl ('', [Validators.required]);
  qualite = new FormControl ('', [Validators.required]);
  autreQualite = new FormControl ('');
  natureRelation = new FormControl ('',);
  autreNatureRelation = new FormControl ('');
  methodeDeterminationPrixTransfert = new FormControl ('', [Validators.required]);
  autreMethodeDeterminationPrixTransfert = new FormControl ('',);
  changementMethodeDeterminationPrixTransfert = new FormControl ('', [Validators.required]);
  chnagementAutreMethodeDeterminationPrixTransfert = new FormControl ('');
  totalVentesRevenusAutresOperations = new FormControl ('', [Validators.required]);
  totalAchatsDepensesAutresOperations = new FormControl ('', [Validators.required]);
   


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

    totalVentesRevenusAutresOperations :  this.totalVentesRevenusAutresOperations,
    totalAchatsDepensesAutresOperations :  this.totalAchatsDepensesAutresOperations,

    natureAutreOperation :  this.natureAutreOperation,


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

    this.countriesList = Object.values(countries).map((country: any) => country.name);

  }

  submit(): void {
    if (this.form.valid) {
     
      this.ligne = this.form.value as LigneAutreInfo
      this.autreInfo = this.form.value as InfoAutre
      
      
      console.log(this.ligne);
      
      
      this.autre.add(this.ligne).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/regime']);
          
   // Make sure this route is correctly configured in your routing module
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });


      this.autre.add2(this.autreInfo).subscribe({
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
