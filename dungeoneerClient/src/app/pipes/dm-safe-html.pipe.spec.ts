import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { DmSafeHTMLPipe } from './dm-safe-html.pipe';

let pipe: DmSafeHTMLPipe;

beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer]
    });
    const sanitized = TestBed.get(DomSanitizer);
    pipe = new DmSafeHTMLPipe(sanitized);
});
  
describe('DmSafeHTMLPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
