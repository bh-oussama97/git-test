import { Component, OnInit,Inject } from '@angular/core';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import {flyInOut,expand} from '../animations/app.animation';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
   host: {
    '[@flyInOut]' : 'true',
    'style' : 'display: block;'
  },
  animations : [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders : Leader[] ;

  constructor(private leaderService : LeaderService,@Inject('BaseURL')
  private BaseURL) {
    this.leaderService.getLeaders().subscribe(leader => this.leaders = leader);
   }

  ngOnInit(): void {
  }

}
