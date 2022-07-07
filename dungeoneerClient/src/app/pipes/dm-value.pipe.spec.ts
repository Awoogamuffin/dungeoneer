import { DmValuePipe } from './dm-value.pipe';

describe('DmValuePipe', () => {
  it('create an instance', () => {
    const pipe = new DmValuePipe('en_US');
    expect(pipe).toBeTruthy();
  });
});
