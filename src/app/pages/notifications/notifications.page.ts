import { Component, OnInit } from '@angular/core';
import { PushupnotificationsService } from 'src/app/services/pushupnotifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: false
})
export class NotificationsPage implements OnInit {

  constructor(
    public pushups: PushupnotificationsService
  ) { }

  ngOnInit() {
  }

}
