import React, { Component } from 'react';
import { Spinner, Input, CardColumns, Card, CardBody, CardText, CardTitle, CardImg, CardLink } from 'reactstrap';
import { UserDataContext } from './UserData';

/**
 * Class component example. Fetches the most popular articles and displays them
 */
export class MostPopularArticles extends Component {
  static displayName = MostPopularArticles.name;

  constructor(props) {
    super(props);
    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.handleArticleFavorite = this.handleArticleFavorite.bind(this);
    this.state = { articles: [], loading: true };
  }

  componentDidMount() {
    this.populateArticleData();
  }

  handleArticleClick(article) {
    if (this.props.onArticleClick)
      this.props.onArticleClick(article);
  }

  handleArticleFavorite(article) {
    if (this.props.onArticleFavorite)
      this.props.onArticleFavorite(article);
  }

  static renderMostPopularArticles(articles, handleArticleClick, handleArticleFavorite) {
    return (
      <UserDataContext.Consumer>{
        ({ toggleFavorite, isFavorite }) => (
          <CardColumns>
            {articles.map((article, i) =>
              <Card>
                <CardBody>
                  {/* Quick and dirty image grab */}
                  {article.media.length > 0 &&
                    <CardImg top width="100%" src={article.media[0]["media-metadata"][1].url} alt="Card image cap" />
                  }
                  <CardTitle>{article.title}</CardTitle>
                  <CardText>{article.abstract}</CardText>
                  <CardText>
                    <small className="text-muted">{article.byline}</small>
                  </CardText>
                  <CardLink href="javascript:void(0);" onClick={() => handleArticleClick(article)}>Read article (opens in new tab)</CardLink>
                  <CardLink href="javascript:void(0);" onClick={() => toggleFavorite(article)}>{isFavorite(article.uri) ? "Remove from favorites" : "Add to favorites"}</CardLink>
                </CardBody>
              </Card>
            )}
          </CardColumns>
        )
      }</UserDataContext.Consumer>
    )
  }

  render() {
    let contents = this.state.loading
      ? <Spinner size="lg" />
      : MostPopularArticles.renderMostPopularArticles(this.state.articles, this.handleArticleClick, this.handleArticleFavorite);

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
