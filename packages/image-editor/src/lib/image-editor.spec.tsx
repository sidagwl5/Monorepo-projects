import { render } from '@testing-library/react';

import ImageEditor from './image-editor';

describe('ImageEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageEditor />);
    expect(baseElement).toBeTruthy();
  });
});
