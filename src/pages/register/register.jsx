import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import { reqRegister } from '../../api'
import './register.less'

class RegisterForm extends Component {
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields( async (err, values) => {
        if (!err) {
          if(values.password === values.password2){
            let data = await reqRegister(values)
            if(data.code === 0){
              localStorage.setItem('token', data.token);
              this.props.history.replace('/board')
            } else {
              message.error(data.message)
            }
          } else {
            message.error('두번 비밀번호 일치하지 않음')
          }
        }
      });
    };
    handleConfirmPassword = (rule, value, callback) => {
      value = value.trim()
      if(!value){
        callback('비밀번호를 입력하세요!')
      } else if(value.length < 5){
        callback('5개 자리 넘어야 합니다!')
      } else if(value.length > 15){
        callback('15개 자리 넘으면 안됩니다!')
      } else if(!/^[A-z0-9]+$/.test(value)){
        callback('영문 혹은 수자로 이루어져야합니다!')
      } else {
        callback()
      }
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form registerForm">
          <h3>트&nbsp;&nbsp;렐&nbsp;&nbsp;로</h3>
          <Form.Item>
            {getFieldDecorator('username', {  
              rules: [
                { required: true, whitespace: true, message: '아이디를 입력하세요!'},
                { min: 5, message: '5개 자리 넘어야 합니다!'},
                { max: 15, message: '15개 자리 넘으면 안됩니다!'},
                { pattern: /^[A-z0-9]+$/, message: '영문 혹은 수자로 이루어져야합니다!'}
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="아이디"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [ {validator: this.handleConfirmPassword} ],
            })( 
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="비밀번호"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password2', {
              rules: [ {validator: this.handleConfirmPassword} ],
            })( 
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="비밀번호확인"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              회원가입
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="login-form-button">
              <Link to='login'>로그인&nbsp;하러가기</Link> 
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
export default Form.create({})(RegisterForm);
