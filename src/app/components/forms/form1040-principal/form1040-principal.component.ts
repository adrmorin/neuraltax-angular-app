import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ChatFormsComponent } from '../chatforms/chatforms.component';
import { FormAutomationService } from '../../../services/form-automation.service';

@Component({
    selector: 'app-form-1040-principal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ChatFormsComponent],
    templateUrl: './form1040-principal.component.html',
    styleUrls: ['./form1040-principal.component.css']
})
export class Form1040PrincipalComponent implements OnInit {
    private fb = inject(FormBuilder);
    private automationService = inject(FormAutomationService);

    taxForm: FormGroup = this.fb.group({
        // Section 1: Datos principales
        firstName: [''],
        lastName: [''],
        ssn: [''],
        homeAddress: [''],
        aptNo: [''],
        cityTown: [''],
        state: [''],
        zipCode: [''],

        // Section 2: Dependents
        hasDependents: [false],

        // Section 3: Income
        incomeW2: [''],

        // Section 4: Tax Credits
        childTaxCredit: [false],

        // Section 5: Payments
        taxWithheld: [''],

        // Section 6: Refund
        refundMethod: [''],

        // Section 7: Owe
        owePayment: [''],

        // Section 8: Third Party
        thirdPartyDesignee: [false]
    });

    ngOnInit() {
        // Listen for programmatic updates from Nerea
        this.automationService.fieldUpdate$.subscribe(({ field, value }) => {
            if (this.taxForm.contains(field)) {
                this.taxForm.get(field)?.setValue(value);
            }
        });
    }
}
