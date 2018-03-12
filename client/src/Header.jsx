import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <section className="hero is-info">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                NYT Scrubber
              </h1>
              <h2 className="subtitle">
                Find articles and save them
              </h2>
            </div>
          </div>
          <div className="hero-foot">
            <nav className="tabs">
              <div className="container">
                <ul>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/saved'>Saved</Link></li>
                </ul>
              </div>
            </nav>
          </div>
        </section>
    );
  }
}

export default Header;