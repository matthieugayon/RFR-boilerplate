import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import Sidebar from '../Sidebar'
import Switcher from './Switcher'

import styles from '../../styles/App'

class App extends PureComponent {

  renderSideBar() {
    if (this.props.page === 'Login') return null
    return (
      <Sidebar />
    )
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          {this.renderSideBar()}
          <Switcher />
        </Row>
      </Grid>
    )
  }
}

/*
<div>
  <div className={styles.app}>
    {this.renderSideBar()}
    <Switcher />
  </div>
</div>
*/

const mapState = ({ page }) => ({ page })

export default connect(mapState)(App)
