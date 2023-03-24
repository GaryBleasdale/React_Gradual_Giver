import { render, fireEvent, getNodeText } from '@testing-library/react';
import { test, expect} from 'vitest'
import App from '../src/App'


describe('App component', async () => {
test ('Test that the paragraph text is showing up correctly', ()=>{
    const { container } = render(<App />);
    const p = container.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toBe('Write some text below, select how gradually you want me to give the text back to you, and then watch the magic happen.');
  })

  test('typing in textarea and clicking button displays text in answer-box', async () => {
    const { container } = render(<App />);
    const textarea = container.querySelector('textarea');
    const button = container.querySelector('button');

    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    fireEvent.click(button);
   
    await new Promise ((resolve) => setTimeout(resolve,5000))

    const answerBox = container.querySelector('.answer-box');
    expect(answerBox).toHaveTextContent('Hello world');
  });
});