import { Component, OnInit } from '@angular/core';
import { FaqsService } from 'src/app/services/faqs.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  social: any
  constructor(private faqsService: FaqsService) { }

  ngOnInit(): void {
    this.faqsService.socialGoal().subscribe(res => {
      this.social = res;
    })
  }
}
