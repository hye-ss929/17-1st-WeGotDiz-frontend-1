import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pw: '',
      emailError: '',
      pwError: '',
      loginError: '',
    };
  }

  handleInput = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  isEmail = email => {
    const emailRegex = /^[a-zA-Z0-9.^+_-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9.]+$/;
    return emailRegex.test(email);
  };

  onEmailCheck = () => {
    !this.isEmail(this.state.email)
      ? this.setState({ emailError: '이메일 형식이 올바르지 않습니다.' })
      : this.setState({ emailError: '' });
  };

  isPassword = pw => {
    const pwRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    return pwRegex.test(pw);
  };

  onPwValidation = () => {
    !this.isPassword(this.state.pw)
      ? this.setState({ pwError: '영문, 숫자, 특수문자를 조합한 8자 이상' })
      : this.setState({ pwError: '' });
  };

  onSubmit = e => {
    e.preventDefault();
    fetch('http://10.58.1.63:8000/user/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.pw,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.TOKEN) {
          localStorage.setItem('access_token', result.TOKEN);
          this.props.history.push('/');
        } else alert('로그인 실패!');
      });
  };

  render() {
    const { emailError, pwError } = this.state;
    return (
      <section className="login">
        <div className="loginContainer">
          <h1 className="title">로그인</h1>
          <form onSubmit={this.onSubmit}>
            <input
              onChange={this.handleInput}
              onKeyUp={this.onEmailCheck}
              className="loginId"
              type="text"
              name="email"
              placeholder="이메일 아이디"
            />
            {<div className="errorMessage">{emailError}</div>}
            <input
              onKeyUp={this.onPwValidation}
              onChange={this.handleInput}
              className="loginPw"
              type="password"
              name="pw"
              placeholder="비밀번호(영문, 숫자, 특수문자 포함 8자 이상)"
            />
            {<div className="errorMessage">{pwError}</div>}
            {<div className="errorMessage">{this.state.passwordError}</div>}
            <button type="submit" className="loginBtn">
              로그인
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(Login);
