import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import SearchArticles from './components/SearchArticles';
import { Button, Row, Col } from 'reactstrap';
import './custom.css'
import { MostPopularArticles } from './components/MostPopularArticles';

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.closeAllArticles = this.closeAllArticles.bind(this);

    this.state = {
      tabs: [],
    }
  }

  handleArticleClick(article) {
    const url = article.url || article.web_url;
    const newTab = window.open(url);
    let newTabs = this.state.tabs;
    newTabs.push(newTab);
    this.setState({ tabs: newTabs })
  }

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
          <Row>
            <Col className="d-flex justify-content-center p-3">
              <Button onClick={this.closeAllArticles} className="center" color={this.state.tabs.length > 0 ? 'primary' : 'secondary'}>Clean up tabs</Button>
            </Col>
          </Row>
          <Route exact path='/' render={(props) => <MostPopularArticles onArticleClick={this.handleArticleClick} {...props} />} />
          <Route exact path='/explore' render={(props) => <SearchArticles onArticleClick={this.handleArticleClick} {...props} />} />
        </Layout>
      </>
    );
  }
}
