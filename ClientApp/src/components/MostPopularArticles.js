import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

export class MostPopularArticles extends Component {
  static displayName = MostPopularArticles.name;

  constructor(props) {
    super(props);
    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.state = { articles: [], loading: true };
  }

  componentDidMount() {
    this.populateArticleData();
  }

  handleArticleClick(article) {
    if (this.props.onArticleClick)
      this.props.onArticleClick(article);
  }

  static renderMostPopularArticles(articles, handleArticleClick) {

    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Title</th>
            <th>Something else</th>
            <th>Favorite?</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, i) =>
            <tr key={article.date}>
              <td><a href="javascript:void" onClick={() => handleArticleClick(article)}>{article.title}</a></td>
              <td>{article.abstract}</td>
              <td><input type="checkbox" id={`${article.id}-favorite`} /></td>
            </tr>
          )}
        </tbody>
      </table >
    );
  }

  render() {
    let contents = this.state.loading
      ? <Spinner size="lg" />
      : MostPopularArticles.renderMostPopularArticles(this.state.articles, this.handleArticleClick);

    return (
      <div>
        <h1 id="tabelLabel" >Most Popular Articles</h1>
        <p>Last 7 days</p>
        {contents}
      </div>
    );
  }

  async populateArticleData() {
    const response = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=cRUWrdNFZ9m0K1fnTL4KyuicGQyAeIN4');
    const data = await response.json();
    this.setState({ articles: data.results, loading: false });
  }
}
