import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'
import { Button } from 'react-toolbox/lib/button'

import CustomField from '../Field'
import { required, isEmail } from '../../forms/validators'
import { loginUser } from '../../actions/auth/auth'

class LoginForm extends PureComponent {

  login = creds => {
    const { dispatch } = this.props

    dispatch(loginUser(creds))
  }

  render() {
    const { emailInputState, passwordInputState } = this.props
    return (
      <Form
        model='forms.loginForm'
        onSubmit={this.login}
      >
        <Control
          type='text'
          label='Email'
          model='forms.loginForm.email'
          component={CustomField}
          icon='email'
          validators={{
            required,
            isEmail
          }}
          messages={{
            required: 'Please provide an email address.',
            isEmail: val => `${val} is not a valid email.`
          }}
          inputState={emailInputState}
        />
        <Control
          type='password'
          label='Password'
          model='.password'
          component={CustomField}
          validators={{
            required
          }}
          messages={{
            required: 'A password is required.'
          }}
          inputState={passwordInputState}
        />
        <Button type='submit' label='Login' />
      </Form>
    )
  }
}

const mapState = ({ forms }) => ({
  emailInputState: forms.forms.loginForm.email,
  passwordInputState: forms.forms.loginForm.password,
  pass: forms.forms.loginForm.password.value
})

const mapDispatch = dispatch => ({ dispatch })

export default connect(mapState, mapDispatch)(LoginForm)
