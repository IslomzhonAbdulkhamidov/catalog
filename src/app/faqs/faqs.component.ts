import { Component, OnInit } from '@angular/core';
import { FaqsService } from '../services/faqs.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FAQSComponent implements OnInit {
  faqs: any;
  spinner = true;
  constructor(private faqsService: FaqsService) { }

  ngOnInit(): void {
    this.faqsService.userAgreement().subscribe(res => {
      this.faqs = res;
      this.spinner =false;
    })
  }

}
