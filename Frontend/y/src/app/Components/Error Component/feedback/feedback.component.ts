import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  @Input() message!:null | string
  @Output() close:EventEmitter<string> = new EventEmitter()

  closed(){
    // console.log('error')
    this.message=null
  }




}
