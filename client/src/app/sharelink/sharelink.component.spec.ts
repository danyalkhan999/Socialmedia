import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharelinkComponent } from './sharelink.component';

describe('SharelinkComponent', () => {
  let component: SharelinkComponent;
  let fixture: ComponentFixture<SharelinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharelinkComponent]
    });
    fixture = TestBed.createComponent(SharelinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
