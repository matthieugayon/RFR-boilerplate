import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'redux-first-router-link'
import styles from '../styles/Sidebar'

const Sidebar = () =>
  <div className={styles.sidebar}>
    <h2>HOME</h2>
    <NavLink activeClassName={styles.active} exact to='/'>HOME</NavLink>
  </div>


const mapState = ({ location }) => ({ path: location.pathname })

export default connect(mapState)(Sidebar)
