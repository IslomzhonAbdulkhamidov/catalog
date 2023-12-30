import { Component, OnInit } from '@angular/core';
import { FaqsService } from 'src/app/services/faqs.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {
  faqs: any;
  constructor(private faqsService: FaqsService) {}

  ngOnInit(): void {
    this.faqsService.getFaqs().subscribe(res => {
      this.faqs = res[0];
    })
  }

  update() {
    this.faqsService.update(this.faqs).then(res => {
      // console.log(res)
    })
  }
}
