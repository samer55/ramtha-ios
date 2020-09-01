import React from 'react';
import {ThemedView, Header} from 'src/components';
import {IconHeader, TextHeader} from 'src/containers/HeaderComponent';

class LinkingWebview extends React.Component {
  render() {
    const {screenProps: {t}} = this.props;
    const url = this.props.navigation.getParam('url', '');
    return (
      <ThemedView isFullView>
    
      </ThemedView>
    );
  }
}

export default LinkingWebview;
