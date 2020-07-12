import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import SearchArticles from './components/SearchArticles';
import { Button, Row, Col, UncontrolledCollapse, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import './custom.css'
import { MostPopularArticles } from './components/MostPopularArticles';
import { UserDataProvider, UserDataContext } from './components/UserData';
export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.closeAllArticles = this.closeAllArticles.bind(this);

    this.state = {
      tabs: [],
      favorites: [],
    }
  }
  /**
   * Handle the Clicking of an article, takes an article as parameter.
   * @param Article article nyt article object https://developer.nytimes.com/docs/articlesearch-product/1/types/Article
   */
  handleArticleClick(article) {
    // simply opening some tabs and tracking them in state to close them later
    const url = article.url || article.web_url;
    const newTab = window.open(url);
    let newTabs = this.state.tabs;
    newTabs.push(newTab);
    this.setState({ tabs: newTabs })
  }

  /**
   * Close all tabs opened by the reader.
   */
  closeAllArticles() {
    for (let i = 0; i < this.state.tabs.length; i++) {
      this.state.tabs[i].close();
    }
    this.setState({ tabs: [] })
  }

  render() {
    return (
      <>
        <Layout>
          <UserDataProvider>
            <Row>
              <Col className="d-flex justify-content-center p-3">
                <Button onClick={this.closeAllArticles} className="center" color="primary" disabled={!(this.state.tabs.length > 0)}>Clean up tabs</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
                  Show Favorites
                </Button>
                <UncontrolledCollapse toggler="#toggler">
                  <UserDataContext.Consumer>{
                    ({ favorites, toggleFavorite }) =>
                      <ListGroup>
                        {favorites.map((article) => <>
                          <ListGroupItem tag="button" href="#" onClick={() => { this.handleArticleClick(article) }}>
                            <Button
                              close={true}
                              href="javascript:void(0);"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(article)
                              }}
                            />
                            <ListGroupItemHeading>{article.headline ? article.headline.main : article.title}</ListGroupItemHeading>
                            <ListGroupItemText>{article.byline.original || article.byline}</ListGroupItemText>
                          </ListGroupItem>
                        </>)}
                      </ListGroup>
                  }</UserDataContext.Consumer>
                </UncontrolledCollapse>
              </Col>
            </Row>
            <Route exact path='/' render={(props) => <MostPopularArticles
              onArticleClick={this.handleArticleClick}
              {...props}
            />} />
            <Route exact path='/explore' render={(props) => <SearchArticles
              onArticleClick={this.handleArticleClick}
              {...props}
            />} />
          </UserDataProvider>
        </Layout>
      </>
    );
  }
}
