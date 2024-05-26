import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'countries-list';
import { LigneInfoService } from '../../../classes/information service/ligne-info-service';
import { LigneServiceService } from '../../../services/information services/ligne-service.service';
import { Service } from '../../../classes/information service/service';

@Component({
  selector: 'app-information-service',
  templateUrl: './information-service.component.html',
  styleUrl: './information-service.component.css'
})
export class InformationServiceComponent implements OnInit {


  countriesList: string[] = [];
  ligneService!:LigneInfoService;
  service!:Service;


  constructor(private router: Router, private formBuilder: FormBuilder, private serv: LigneServiceService) { }
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
  totalAchatsDepensesServices = new FormControl ('', [Validators.required]);
  totalVentesServices = new FormControl ('', [Validators.required]);
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

    totalAchatsDepensesServices :  this.totalAchatsDepensesServices,
    totalVentesServices :  this.totalVentesServices,

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
          if(this.natureOperation.value == "6")
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
     
      this.ligneService = this.form.value as LigneInfoService 
      this.service = this.form.value as Service 
      console.log(this.ligneService);
      this.serv.add(this.ligneService).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/operation-financiere']);
         
   // Make sure this route is correctly configured in your routing module
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });


      this.serv.add2(this.service).subscribe({
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
