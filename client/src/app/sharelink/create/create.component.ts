import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  @ViewChild('placeholder', { static: true }) placeholder: ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<CreateComponent>
  ) {}
  selectedImage: File;
  postData;
  closeMessage = 'popup closed';
  postUrl;
  postDescription;
  isPostValid = true;
  newPost = {};
  ngOnInit(): void {
    this.postData = this.data;
  }

  onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImage = photoSelector.files[0];
    if (!this.selectedImage) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImage);
    fileReader.addEventListener('loadend', (e) => {
      let readableString = fileReader.result.toString();
      this.postUrl = readableString;
      let postPreview = <HTMLImageElement>(
        document.getElementById('post-preview-image')
      );

      postPreview.src = readableString;
    });
  }

  createPost() {
    this.postDescription = this.placeholder.nativeElement.value;

    if (this.postDescription || this.postUrl) {
      console.log(this.postDescription, this.postUrl);
      this.newPost = {
        description: this.postDescription,
        photo: this.postUrl,
      };
      this.ref.close();
    } else {
      this.isPostValid = false;
    }
    console.log(this.postData);
  }
}
