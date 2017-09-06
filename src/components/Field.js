import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import { Errors } from 'react-redux-form'

class Field extends Component {

  renderError = () => {
    const { valid, touched } = this.props.inputState

    if (!touched) return null
    if (valid) return null

    return (
      <Errors
        model={this.props.name}
        messages={this.props.messages}
        wrapper={props => {
          let children = props.children

          if (children && children.length > 1) {
            children = children.find(child => child.key === 'required')
          }

          return (
            <div>{children}</div>
          )
        }
        }
      />
    )
  }

  render() {
    if (this.props.name === 'email') console.log('this.props', this.props)

    const { messages, inputState, ...inputProps } = this.props

    return (
      <Input {...inputProps} error={this.renderError()} />
    )
  }
}

export default Field
