import React from 'react';
import axios from 'axios';
import moment from 'moment';
class SavedArticle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.article.notes || ''
    }
    this.timeout = null;
    this.event = null;
  }

  handleRemove = (article) => {
    axios.delete(`/api/articles/${article._id}`)
    .then(response => this.props.handleRemove(article))
    .catch(response => console.log('nope'));
  }

  handleChange = (event) => {
    clearTimeout(this.timeout);
      this.setState({notes: event.target.value}, () => this.timeout = setTimeout(() => {
        axios.post(`/api/articles/${this.props.article._id}/update`,{params: {...this.props.article, notes: this.state.notes }})
        .then(response => {console.log('saved')})
        .catch((response)=>console.log('not saved'));
      }, 1000)); // only update after no typing after a second
  }

  render() {
    return(
      <div style={{ display: 'flex', width: '100%', border: 'solid', borderWidth: 1, borderColor: 'grey', justifyContent: 'space-between', margin: 10, flexDirection: 'column' }}>
        <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between', margin: 10 }}>
          <h1 style={{ width: 300}}>{this.props.article.title}</h1>
          <h2>{`Saved ${moment(this.props.article.date).format('MM/DD/YYYY')}`}</h2>
          <button className="button is-success" onClick={() => this.handleRemove(this.props.article)}>
            Remove
          </button>
        </div>
        <textarea className="textarea" placeholder="Notes on this article" onChange={this.handleChange} value={this.state.notes}/>
      </div>
    );
  }
}

export default SavedArticle;