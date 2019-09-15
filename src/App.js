import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar.component';

class App extends React.Component {
	render() {
		return (
			// returnnya, harus one parent element kalau di react jsx.
      <div className="App">
        <Navbar />
      </div>
		);
	}
}

export default App;
