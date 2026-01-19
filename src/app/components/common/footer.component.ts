import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [],
    template: `
    <footer class="neuraltax-footer">
      <div class="container">
        <div class="footer-top">
          <!-- Left Column -->
          <div class="footer-col footer-brand">
            <div class="logo">
              <img src="assets/neuraltax_logo.png" alt="NeuralTax AI" style="height: 40px" />
            </div>
            <h3>Neuraltax AI Expert</h3>
            <p>Your automated tax expert. Simplifying tax management with cutting-edge AI technology and precision.</p>
            <div class="business-reg-box">
              <i class="fas fa-file-alt"></i>
              <div>
                <span>Business Registration</span>
                <strong>L25000152874</strong>
              </div>
            </div>
          </div>

          <!-- Middle Column -->
          <div class="footer-col footer-contact">
            <h4>Contact Information</h4>
            <div class="email-box">
              <i class="fas fa-envelope"></i>
              <div>
                <span>Email us</span>
                <a href="mailto:neuraltaxai&#64;gmail.com">neuraltaxai&#64;gmail.com</a>
              </div>
            </div>
            <div class="contact-details">
              <div class="detail-item">
                <i class="far fa-clock"></i>
                <div>
                  <strong>Business Hours</strong>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
              <div class="detail-item">
                <i class="fas fa-bolt"></i>
                <div>
                  <strong>Response Time</strong>
                  <p>Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="footer-col footer-connect">
            <div class="connect-header">
              <h4>Connect With Us</h4>
              <div class="social-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-x-twitter"></i></a>
                <a href="#"><i class="fab fa-whatsapp"></i></a>
              </div>
            </div>
            <div class="footer-links">
              <a href="#">Our Services</a>
              <a href="#">Pricing</a>
              <a href="#">About Us</a>
              <a href="#">FAQ</a>
              <a href="#">Quick Links</a>
            </div>
            <div class="footer-copyright">
              <p>&copy; 2025 Neuraltax. All rights reserved.</p>
              <div class="legal-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Support</a>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="reg-info">Business Registration Number: L25000152874 | Contact: neuraltaxai&#64;gmail.com</p>
          <p class="disclaimer">Neuraltax is not meant for collecting PII or securing sensitive data. Please consult with a qualified tax professional for complex tax situations.</p>
          <p class="license">Licensed and registered for tax advisory services. All communications are confidential and secure.</p>
        </div>
      </div>
    </footer>
  `,
    styles: []
})
export class FooterComponent { }
