import { TestBed } from '@angular/core/testing';

import { IUser } from 'app/interfaces';

import { UserInfo } from './user-info';

const mockUser: IUser = { id: 'user-1', email: 'test@example.com' };

describe('UserInfo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfo],
    })
      .overrideComponent(UserInfo, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UserInfo);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should default user to undefined', () => {
    const fixture = TestBed.createComponent(UserInfo);
    expect(fixture.componentInstance.user()).toBeUndefined();
  });

  it('should reflect user input', () => {
    const fixture = TestBed.createComponent(UserInfo);
    fixture.componentRef.setInput('user', mockUser);

    expect(fixture.componentInstance.user()).toEqual(mockUser);
  });
});
