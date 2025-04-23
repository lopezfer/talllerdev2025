import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false
})
export class CardComponent implements OnInit {

  @Input() title: string = 'Título por defecto';
  @Input() author: any = 'autor por defecto';
  constructor() { }

  ngOnInit() { }

}
