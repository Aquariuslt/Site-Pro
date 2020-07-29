import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { RouterView } from '@editor/router';
import { EditorToolbar } from '@editor/components/EditorToolbar';

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <EditorToolbar />
        <RouterView />
      </Router>
    </React.Fragment>
  );
};
