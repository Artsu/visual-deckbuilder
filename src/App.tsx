import * as React from 'react';

// Material UI initialization
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {MuiThemeProvider, lightBaseTheme} from 'material-ui/styles';
const lightMuiTheme = getMuiTheme(lightBaseTheme);
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Material UI components
import AppBar from 'material-ui/AppBar';

// Custom components
import DeckBuilder from './components/DeckBuilder';

// Styles
import './App.css';
import { grey500 } from 'material-ui/styles/colors';

const appBarStyles = {
  backgroundColor: grey500,
};

const titleStyles: React.CSSProperties = {
  fontWeight: 200,
};

class App extends React.Component<{}, null> {
  render() {
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div className="App">
          <AppBar
            style={appBarStyles}
            title="Visual MTG-Deckbuilder"
            titleStyle={titleStyles}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <DeckBuilder />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
