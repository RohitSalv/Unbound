import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../services/auth';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginRequest = {
    email:'',
    password:''
  };

  errorMessage :string|null = null;

  constructor(
    private authService : Auth,
    private router:Router
  ){}

 onLogin() {
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Navigate to a protected dashboard or home page
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.error('Login failed:', err);
      }
    });
  }

}
