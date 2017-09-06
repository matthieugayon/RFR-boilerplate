import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import LoginForm from '../forms/LoginForm'

export default () =>
  <Row middle='xs'>
    <Col xs={12}>
      <Row center='xs'>
        <Col xs={6}>
          <LoginForm />
        </Col>
      </Row>
    </Col>
  </Row>
