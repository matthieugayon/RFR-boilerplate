import React from 'react'
import { connect } from 'react-redux'
import { TransitionGroup, Transition } from 'transition-group'
import universal from 'react-universal-component'

import Loading from '../Loading'
import isLoading from '../../selectors/isLoading'
import styles from '../../styles/Switcher'

const UniversalComponent = universal(({ page }) => import(`../scenes/${page}`), {
  minDelay: 500,
  loading: Loading
})

const Switcher = ({ page, direction, isLoading }) =>
  <TransitionGroup
    className={`${styles.switcher} ${direction}`}
    duration={500}
    prefix='fade'
  >
    <Transition key={page}>
      <UniversalComponent page={page} isLoading={isLoading} />
    </Transition>
  </TransitionGroup>

const mapState = ({ page, direction, ...state }) => ({
  page,
  direction,
  isLoading: isLoading(state)
})

export default connect(mapState)(Switcher)
