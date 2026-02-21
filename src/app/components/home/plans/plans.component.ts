import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-membership-plans',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class MembershipPlansComponent { }
