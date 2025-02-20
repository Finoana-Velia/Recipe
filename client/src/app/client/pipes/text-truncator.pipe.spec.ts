import { TextTruncatorPipe } from './text-truncator.pipe';

describe('TextTruncatorPipe', () => {
  it('create an instance', () => {
    const pipe = new TextTruncatorPipe();
    expect(pipe).toBeTruthy();
  });
});
