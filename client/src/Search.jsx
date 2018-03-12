import React from 'react';
import axios from 'axios';

import SearchResults from './SearchResults';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      startYear: '',
      endYear: '',
      articlesReturned: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);  
  }

  isNumber(char) {
    if (!isNaN(parseInt(char, 10))) {
      return true;
    }
    return false;
  }

  handleChange(event) {
    if (event.target.name !== 'search' && (this.isNumber(event.target.value) || event.target.value === '')) {
      this.setState({ [event.target.name]: event.target.value });
    } else if (event.target.name === 'search') {
      this.setState({ [event.target.name]: event.target.value });      
    }
  }

  handleSearch() {
    // date must be YYYYMMDD
    var body = {
      search: this.state.search,
      startYear: this.state.startYear + '0101',
      endYear: this.state.endYear + '1231'      
    };
    axios.post('/api/nytsearch', body)
    .then((results) => this.setState({ articlesReturned: results.data }))
    .catch(console.log('oops'));
  }

  render() {
    return(
      <div>
        <section className='section'>
          <div className='container'>
            <nav className="panel">
              <p className="panel-heading">
                Search For Articles
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right' }} className="panel-block">
                <label className="label">Search Term</label>
                <input 
                  className="input" 
                  type="text" 
                  placeholder="NASA" 
                  onChange={this.handleChange}
                  name={'search'}
                  value={this.state.search}
                />
                <label className="label">Start Year</label>
                <input 
                  className="input" 
                  type="text" 
                  placeholder="2001" 
                  onChange={this.handleChange} 
                  name={'startYear'}                
                  value={this.state.startYear}
                />
                <label className="label">End Year</label>              
                <input 
                  className="input" 
                  type="text" 
                  placeholder="2002" 
                  onChange={this.handleChange}
                  name={'endYear'}                
                  value={this.state.endYear}
                />              
                <div className="field" style={{ marginTop: 10 }}>
                  <p className="control">
                    <button className="button is-success" onClick={this.handleSearch}>
                      SEARCH
                    </button>
                  </p>
                </div>
              </div>
            </nav>
          </div>
        </section>
        {this.state.articlesReturned && 
          <SearchResults
            articles={this.state.articlesReturned}
          />
        }
      </div>
    );
  }
}

export default Search;