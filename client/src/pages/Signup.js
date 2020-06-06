import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { register } from '../actions/auth_actions';

class SignupPage extends Component {

  componentDidUpdate() {
    const { error, isReg } = this.props;
    if (error && this.bag) {
      this.bag.setSubmitting(false);
    }

    if (isReg) {
      this.props.history.push('/login');
    }
  }
    _handleFormSubmit(values,bag) {
      this.props.register(values);
        this.bag = bag;
    }
    
  
    
    render() {
        return (
            <div style={{ padding: 20 }}>
        <h3>Create new account</h3>
        <hr />
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={this._handleFormSubmit.bind(this)}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string()
              .min(6)
              .required()
                  })}
                 >
                 { ({
                    handleChange,
                    handleSubmit,
                    isValid,
                    isSubmitting,
                    handleBlur,
                    errors,
                    touched
                       }) => (
                        <div>
                        <FormGroup>
                          <Label>Name</Label>
                          <Input
                            invalid={errors.name && touched.name}
                            name='name'
                            type='string'
                            placeholder='Your Name'
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
          
                          {errors.name && touched.name && (
                            <FormFeedback>{errors.name}</FormFeedback>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label>Email</Label>
                          <Input
                            invalid={errors.email && touched.email}
                            name='email'
                            type='email'
                            placeholder='someone@gmail.com'
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
          
                          {errors.email && touched.email && (
                            <FormFeedback>{errors.email}</FormFeedback>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label>Password</Label>
                          <Input
                            invalid={errors.password && touched.password}
                            name='password'
                            type='password'
                            placeholder='Your Password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.password && touched.password && (
                            <FormFeedback>{errors.password}</FormFeedback>
                          )}
                        </FormGroup>
                        <Button
                          color='primary'
                          block
                          onClick={handleSubmit}
                          disabled={!isValid || isSubmitting}
                        >
                          Create Account
                        </Button>
                      </div>
                 )}
                 </Formik>
                 <Link to='/login'>Have an account? Sign In</Link>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => {
  return {
    attempting: auth.attempting,
    error: auth.error,
    isReg: auth.isReg
  };
};

const Signup = connect(
  mapStateToProps,
  { register }
)(SignupPage);
export {Signup }