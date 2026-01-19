import { Component } from '@angular/core';

@Component({ selector: 'app-wizard', standalone: true, template: `<div class="wizard-page"><h1>Wizard de Configuración</h1><p>Asistente paso a paso.</p></div>`, styles: [`.wizard-page { min-height: 100vh; padding: 4rem; background: linear-gradient(135deg, #0a0f0d 0%, #141d1a 100%); color: white; }`] })
export class WizardComponent { }
