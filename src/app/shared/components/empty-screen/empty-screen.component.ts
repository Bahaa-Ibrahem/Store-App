import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss']
})
export class EmptyScreenComponent implements OnInit {

  @Input() imageName = '';
  @Input() text = '';
  @Input() subText = '';

  constructor() { }

  ngOnInit(): void { }

}
