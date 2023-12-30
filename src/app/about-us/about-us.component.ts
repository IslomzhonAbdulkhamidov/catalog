import { Component, OnInit } from '@angular/core';
import { FaqsService } from '../services/faqs.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  faqs: any;
  spinner =  true;
  constructor(private faqsService: FaqsService) { }

  ngOnInit(): void {
    this.faqsService.about().subscribe(res => {
      this.faqs = res;
      this.spinner = false;
    })
  }

}
