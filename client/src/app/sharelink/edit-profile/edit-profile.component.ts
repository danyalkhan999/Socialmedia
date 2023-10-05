import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  // edit profile
  profileHead;
  ngOnInit(): void {
    this.profileHead = this.data;
  }
}
