import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'countries-list';
import { LigneRemuneration } from '../../../classes/rémunération/ligne-remuneration';
import { Remuneration } from '../../../classes/rémunération/remuneration';
import { LigneRemunerationService } from '../../../services/remuneration/ligne-remuneration.service';

@Component({
  selector: 'app-remuneration-bien',
  templateUrl: './remuneration-bien.component.html',
  styleUrl: './remuneration-bien.component.css'
})
export class RemunerationBienComponent implements OnInit  {


  countriesList: string[] = [];
  LigneRemuneration!:LigneRemuneration;
  remuneration!:Remuneration;

  constructor(private router: Router, private formBuilder: FormBuilder,private serv: LigneRemunerationService  ) { }
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
  totalAchatsDepensesRemunerationsBiensCorporelsIncorporels = new FormControl ('', [Validators.required]);
  totalVentesRevenusRemunerationsBiensCorporelsIncorporels = new FormControl ('', [Validators.required]);
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

   

    changementMethodeDeterminationPrixTransfert : this.changementMethodeDeterminationPrixTransfert,
    chnagementAutreMethodeDeterminationPrixTransfert: this.chnagementAutreMethodeDeterminationPrixTransfert,

    totalAchatsDepensesRemunerationsBiensCorporelsIncorporels :  this.totalAchatsDepensesRemunerationsBiensCorporelsIncorporels,
    totalVentesRevenusRemunerationsBiensCorporelsIncorporels :  this.totalVentesRevenusRemunerationsBiensCorporelsIncorporels,

    natureOperation :  this.natureOperation,
    autreNatureOperation:this.autreNatureOperation,

 methodeDeterminationPrixTransfert :  this.methodeDeterminationPrixTransfert,
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
          if(this.natureOperation.value == "4")
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
     
      this.LigneRemuneration = this.form.value as LigneRemuneration
      this.remuneration = this.form.value as Remuneration
      console.log(this.LigneRemuneration);
      this.serv.add(this.LigneRemuneration).subscribe({
        next: (response) => {
          console.log('Success:', response);
           this.router.navigate(['/info-service']);
         
   // Make sure this route is correctly configured in your routing module
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });


      this.serv.add2(this.remuneration).subscribe({
        next: (Response) => {
          console.log('Success:', Response);
        },
        error: (error) => {
          console.error('Erreur :', error);
        }
      });

    }




  }

}
