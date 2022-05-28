import { DmSafeHTMLPipe } from './dm-safe-html.pipe';

describe('DmSafeHTMLPipe', () => {
  it('create an instance', () => {
    const pipe = new DmSafeHTMLPipe();
    expect(pipe).toBeTruthy();
  });
});
