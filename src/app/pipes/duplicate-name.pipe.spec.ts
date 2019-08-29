import { DuplicateNamePipe } from './duplicate-name.pipe';

describe('DuplicateNamePipe', () => {
  it('create an instance', () => {
    const pipe = new DuplicateNamePipe();
    expect(pipe).toBeTruthy();
  });
});
