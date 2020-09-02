import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default class search extends Component {
    render () {
        return (
            <Container style={{maxWidth: '95%'}}>
                <Row className="second">
                    <Col >
                    <label>
                        Country Name: 
                        <input type="text" value={this.props.textvalue} placeholder="Please type to select" 
                            onChange={this.props.search}/>
                        <ul>
                            {this.props.datas()}
                        </ul>
                    </label>
                    </Col>
                    <Col  >
                    <label>
                        Average Score: 
                        <input type="number" value={this.props.scorevalue} onChange={this.props.searchscore} 
                            placeholder="Please select from the below options"/>
                        <ul>
                            {this.props.score()}
                        </ul>
                    </label>
                    </Col>
                    <Col  className="Horizbar" style={{lineHeight: "130px"}}>
                       {this.props.renderInput()}
                    </Col>
                </Row>
            </Container>
        )
    }
}