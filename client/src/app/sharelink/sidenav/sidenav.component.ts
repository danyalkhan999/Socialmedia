import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navbarData } from './nav-data';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from 'src/app/component/post/post.component';
import { CreateComponent } from '../create/create.component';
import { ConfirmComponent } from 'src/app/component/confirm/confirm.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
  constructor(private dialog: MatDialog) {}
  collapsed = true;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSidenav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSidenav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  openPopup(data) {
    if (data === 'Create') {
      this.dialog.open(CreateComponent, {
        width: '60%',
        data: {
          title: 'Create Post...',
        },
      });
    }
  }

  logoutClick() {
    this.dialog.open(ConfirmComponent, {
      width: '500px',
      height: 'auto',
    });
  }
}
