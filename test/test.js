import React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'react-addons-test-utils';
import KaraokeLyric from '../src';

function setup(props) {
  const renderer = createRenderer();
  renderer.render(<KaraokeLyric {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer,
  };
}


describe('KaraokeLyric', () => {
  it('should render default style correctly', () => {
    const { output } = setup({
      text: 'Test',
      percentage: 80,
    });

    expect(output.type).to.equal('div');
    expect(output.props.style).to.deep.equal({
      position: 'relative',
      display: 'inline-block',
    });

    const [defaultLyric, activeLyric] = output.props.children;

    expect(defaultLyric.type).to.equal('div');
    expect(defaultLyric.props.children).to.equal('Test');
    expect(defaultLyric.props.style).to.deep.equal({
      whiteSpace: 'nowrap',
      fontSize: '60px',
      color: 'white',
      textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    });

    expect(activeLyric.type).to.equal('div');
    expect(activeLyric.props.children).to.equal('Test');
    expect(activeLyric.props.style).to.deep.equal({
      whiteSpace: 'nowrap',
      fontSize: '60px',
      position: 'absolute',
      left: 0,
      top: 0,
      color: 'blue',
      overflow: 'hidden',
      zIndex: 1,
      width: '80%',
      textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white',
    });
  });

  it('should can overwrite wrapper style', () => {
    const { output } = setup({
      text: 'Test',
      percentage: 80,
      wrapperStyle: {
        lineHeight: '2em',
      },
    });

    expect(output.type).to.equal('div');
    expect(output.props.style).to.deep.equal({
      position: 'relative',
      display: 'inline-block',
      lineHeight: '2em',
    });
  });

  it('should can overwrite font style', () => {
    const { output } = setup({
      text: 'Test',
      percentage: 80,
      fontStyle: {
        color: 'red',
      },
    });

    const [defaultLyric] = output.props.children;

    expect(defaultLyric.type).to.equal('div');
    expect(defaultLyric.props.children).to.equal('Test');
    expect(defaultLyric.props.style).to.deep.equal({
      whiteSpace: 'nowrap',
      fontSize: '60px',
      color: 'red',
      textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    });
  });

  it('should can overwrite active style', () => {
    const { output } = setup({
      text: 'Test',
      percentage: 80,
      activeStyle: {
        color: 'red',
      },
    });

    const [, activeLyric] = output.props.children;

    expect(activeLyric.type).to.equal('div');
    expect(activeLyric.props.children).to.equal('Test');
    expect(activeLyric.props.style).to.deep.equal({
      whiteSpace: 'nowrap',
      fontSize: '60px',
      position: 'absolute',
      left: 0,
      top: 0,
      overflow: 'hidden',
      zIndex: 1,
      width: '80%',
      color: 'red',
      textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white',
    });
  });
});
