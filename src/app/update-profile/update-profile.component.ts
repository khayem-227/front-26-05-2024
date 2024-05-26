import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateProfileService } from '../services/update profile/update-profile.service';
import { User } from '../User';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'] // Utilisez styleUrls au lieu de styleUrl
})
export class UpdateProfileComponent implements OnInit {
  login: string | null = ''; // Initialisez une propriété pour stocker l'email
  form!:FormGroup;
  userId!: String;
  user!:User;
  constructor(private formBuilder: FormBuilder,
    private updateProfileService: UpdateProfileService,
    private router: Router) {}

  ngOnInit(): void {
    this.login = localStorage.getItem('email'); // Assurez-vous que l'email est stocké avec la clé 'email' dans localStorage

    this.userId = localStorage.getItem('userId')!; // Récupère l'ID de l'utilisateur à partir du localStorage
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }





  submit(): void {
    if (this.form.valid) {
      const updatedUser: User = {
        id: this.userId,  // Assurez-vous que l'ID est bien passé
        ...this.form.value
      };

      this.updateProfileService.add(updatedUser).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.router.navigate(['/home']); // Redirection après la mise à jour réussie
        },
        error: (error) => {
          console.error('Failed to update profile:', error);
        }
      });
    } else {
      console.error('Form is not valid');
    }
  }



}



  

  

