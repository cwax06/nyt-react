import React from 'react';
import axios from 'axios';

import SavedArticle from './SavedArticle';

class Saved extends React.Component {
  constructor() {
    super();

    this.state = {
      articles: []
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);  
  }

  handleUpdate(article) {

  }

  handleRemove(article) {
    this.setState({
      articles: [
        ...this.state.articles.filter(artic => article._id !== artic._id)
      ]
    });
  }

  componentWillMount() {
    axios.get('/api/articles')
    .then(response => {
      this.setState({
        articles: response.data
      });
    })
    .catch(response => {
      console.log(response);
    });
  }

  render() {
    return(
      <div>
        <section className='section'>
          <div className='container'>
            <nav className="panel">
              <p className="panel-heading">
                Saved Articles
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right' }} className="panel-block">
                {this.state.articles.map(article => {
                  return(
                    <SavedArticle
                      article={article}
                      handleRemove={this.handleRemove}
                    />
                  );
                })}
              </div>
            </nav>
          </div>
        </section>
      </div>
    );
  }
}

export default Saved;