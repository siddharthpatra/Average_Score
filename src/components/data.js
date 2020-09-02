import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default class data extends Component {
    render () {
        return (
            <Container>
                <Row>
                    <Col sm="4">
                        Source of data:
                    </Col>
                    <Col sm="4">
                        <label>
                            Test Data:
                            <input type="radio" value="TestData" checked={this.props.value === "TestData"} onChange={this.props.change}/>
                        </label>
                    </Col>
                    <Col sm="4">
                        <label>
                            Server Data:
                            <input type="radio" value="ServerData" checked={this.props.value === "ServerData"} onChange={this.props.change}/>
                        </label>
                    </Col>
                </Row>
            </Container>
        )
    }
}