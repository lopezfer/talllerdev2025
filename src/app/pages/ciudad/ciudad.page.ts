import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.page.html',
  styleUrls: ['./ciudad.page.scss'],
  standalone: false
})
export class CiudadPage implements OnInit {

  id: any;
  data: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    public db: DatabaseService,
    //public cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('ciudadID', this.activatedRoute.snapshot.paramMap.get('ciudadId'));
    this.id = this.activatedRoute.snapshot.paramMap.get('ciudadId');
    this.db.getDocumentById('cities', this.id)
      .subscribe((res: any) => {
        console.log('ciudad recuperada', res);
        this.data = res;
       //this.cdr.detectChanges();
      })
  }

}
