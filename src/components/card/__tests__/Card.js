import React from 'react';
import { TextInput } from 'react-native';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { create } from 'react-test-renderer';

import theme from '../../config/theme';
import { ThemeProvider } from '../../config';

import ThemedCard, { Card } from '../Card';

describe('Card Component', () => {
  it('should render without issues', () => {
    const component = shallow(<Card theme={theme} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have Card title without image', () => {
    const component = shallow(
      <Card
        theme={theme}
        title="Card Title"
        containerStyle={{ backgroundColor: '#800020' }}
        dividerStyle={{ backgroundColor: '#800020' }}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have Card title with image', () => {
    const component = shallow(
      <Card
        theme={theme}
        title="HELLO WORLD"
        image={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
        containerStyle={{ backgroundColor: '#800020' }}
        titleStyle={{ backgroundColor: '#800020' }}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have Card with Featured title', () => {
    const component = shallow(
      <Card
        theme={theme}
        title="foo title"
        image={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
        imageWrapperStyle={{ backgroundColor: '#800020' }}
        imageStyle={{ backgroundColor: '#800020' }}
        wrapperStyle={{ backgroundColor: '#800020' }}
        FeaturedTitle="Featured title"
        FeaturedSubtitle="Featured sub title"
        FeaturedTitleStyle={{ backgroundColor: '#800020' }}
        FeaturedSubtitleStyle={{ backgroundColor: '#800020' }}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have custom component as title', () => {
    const component = shallow(<Card theme={theme} title={<TextInput />} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should apply values from theme', () => {
    const testTheme = {
      Card: {
        title: 'Yea b',
      },
    };

    const component = create(
      <ThemeProvider theme={testTheme}>
        <ThemedCard />
      </ThemeProvider>
    );

    expect(
      component.root.findByProps({ testID: 'cardTitle' }).props.children
    ).toBe('Yea b');
    expect(component.toJSON()).toMatchSnapshot();
  });
});
