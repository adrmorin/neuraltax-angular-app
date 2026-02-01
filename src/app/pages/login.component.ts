import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-page">
      <div class="login-container">
        <div class="login-card glass">
          <div class="login-header">
            <img src="assets/neuraltax_logo.png" alt="NeuralTax" style="height: 50px" />
            <h1>Bienvenido</h1>
            <p>Inicia sesión en tu cuenta</p>
          </div>
          <form class="login-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="tucorreo@email.com" />
            </div>
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input type="password" id="password" placeholder="••••••••" />
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%">Iniciar Sesión</button>
          </form>
          <p class="login-footer">¿No tienes cuenta? <a href="#">Regístrate</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0a0f0d 0%, #141d1a 100%);
    }
    .login-card {
      padding: 3rem;
      border-radius: 16px;
      width: 100%;
      max-width: 400px;
    }
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .login-header h1 {
      color: white;
      margin: 1rem 0 0.5rem;
    }
    .login-header p {
      color: #94a3b8;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-group label {
      display: block;
      color: #94a3b8;
      margin-bottom: 0.5rem;
    }
    .form-group input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      background: rgba(255,255,255,0.05);
      color: white;
      font-size: 1rem;
    }
    .login-footer {
      text-align: center;
      margin-top: 1.5rem;
      color: #94a3b8;
    }
    .login-footer a {
      color: #4ade80;
    }
  `]
})
export class LoginComponent { }
