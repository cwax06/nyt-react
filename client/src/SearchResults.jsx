import React from 'react';
import axios from 'axios';

class SearchResults extends React.Component {
  constructor() {
    super();

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(article) {
    axios.post('/api/articles', {
      title: article.headline.main,
      date: Date.now(),
      url: article.web_url
    })
    .then((article) => console.log(article))
    .catch(() => console.log('there was an error saving the article'));
  }

  render() {
    return(
      <div>
        <section className='section'>
          <div className='container'>
            <p className="panel-heading">
              Search Results
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }} className="panel-block">
              {this.props.articles.map((article)=>{
                return(
                  <div 
                    key={article._id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      border: 'solid',
                      padding: 25,
                      borderColor: 'grey',
                      borderWidth: 1,
                      margin: 5
                    }}
                  >
                    <p>
                      {article.headline.main}
                    </p>
                    <button className="button is-success" onClick={()=>this.handleSave(article)}>
                      Save
                    </button>
                  </div>
                );
              })}
        
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SearchResults;