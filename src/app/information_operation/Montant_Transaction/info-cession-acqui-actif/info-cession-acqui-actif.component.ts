import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'countries-list';
import { LigneCession } from '../../../classes/cession acquisition/ligne-cession';
import { Cession } from '../../../classes/cession acquisition/cession';
import { LigneCessionAcquisitionService } from '../../../services/cession acquisition/ligne-cession-acquisition.service';

@Component({
  selector: 'app-info-cession-acqui-actif',
  templateUrl: './info-cession-acqui-actif.component.html',
  styleUrl: './info-cession-acqui-actif.component.css'
})
export class InfoCessionAcquiActifComponent implements OnInit {

  countriesList: string[] = [];
  ligneCession!:LigneCession;
  cession!:Cession
  constructor(private router: Router, private formBuilder: FormBuilder, private ligne: LigneCessionAcquisitionService) { }

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
  totalAchatsDepensesCessionsAcquisitionsActifs = new FormControl ('', [Validators.required]);
  totalVentesRevenusCessionsAcquisitionsActifs = new FormControl ('', [Validators.required]);

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

    totalAchatsDepensesCessionsAcquisitionsActifs :  this.totalAchatsDepensesCessionsAcquisitionsActifs,
    totalVentesRevenusCessionsAcquisitionsActifs :  this.totalVentesRevenusCessionsAcquisitionsActifs,

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
          if(this.natureOperation.value == "7")
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
     
      this.ligneCession = this.form.value as LigneCession
      this.cession = this.form.value as Cession 
      console.log(this.ligneCession);
      this.ligne.add(this.ligneCession).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/info-autre-op']);
         
   // Make sure this route is correctly configured in your routing module
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });


      this.ligne.add2(this.cession).subscribe({
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
