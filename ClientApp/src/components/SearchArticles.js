import React, { useState } from 'react';
import { Form, Input, Spinner, Col, Row } from 'reactstrap';
const SearchArticles = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const onSearch = async (e) => {

        e.preventDefault();
        setLoading(true);
        // use form data to call nytimes api and set response list to state
        const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=cRUWrdNFZ9m0K1fnTL4KyuicGQyAeIN4&q=test`);
        const data = await response.json();
        setArticles(data.response.docs);
        setLoading(false);

    };

    const handleArticleClick = (article) => {
        if (props.onArticleClick)
            props.onArticleClick(article);
    }

    const list = loading ?
        <Spinner size="lg" className="mx-auto" /> :
        <SearchResults articles={articles} handleArticleClick={handleArticleClick} />


    return <>

        <Form onSubmit={onSearch}>
            <Input type="search" placeholder="search for articles" />
        </Form>
        <Row>
            <Col xs={12}>
                {list}
            </Col>
        </Row>

    </>
}

const SearchResults = ({ articles, handleArticleClick }) => {

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
                        <td><a href="javascript:void" onClick={() => handleArticleClick(article)}>{article.headline.main}</a></td>
                        <td>{article.abstract}</td>
                        <td><input type="checkbox" id={`${article.id}-favorite`} /></td>
                    </tr>
                )}
            </tbody>
        </table >
    );
}

export default SearchArticles;