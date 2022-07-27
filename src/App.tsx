import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Search from './components/Search/Search';
import Table from './components/Table/Table';
import './styles/App.scss';

const App: React.FC = () => {

  const TableWrap = () => useRoutes([
    { path: "/", element: <Table /> },
    { path: "/:pageNumber", element: <Table /> },
  ]);

  return <div className="App">
    <Search />
    <Router>
      <TableWrap />
    </Router>
  </div>;
}

export default App;
