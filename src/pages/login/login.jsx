import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { reqLogin } from "../../api";
import "./login.less";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let data = await reqLogin(values);
        if (data.code === 0) {
          localStorage.setItem("token", data.token);
          this.props.history.replace("/board");
        } else {
          message.error(data.message);
        }
      }
    });
  };
  handleConfirmEmail = (rule, value, callback) => {
    value = value.trim();
    if (!value) {
      callback("이메일을 입력하세요!");
    } else if (
      !/[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/.test(value)
    ) {
      callback("이메일의 규칙에 맞춰주세요!");
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form loginForm">
        <h3>트&nbsp;&nbsp;렐&nbsp;&nbsp;로</h3>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ validator: this.handleConfirmEmail }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="이메일"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                whitespace: true,
                message: "비밀번호를 입력하세요!"
              },
              { min: 5, message: "5개 자리 넘어야 합니다!" },
              { max: 15, message: "15개 자리 넘으면 안됩니다!" },
              {
                pattern: /^[A-z0-9]+$/,
                message: "영문 혹은 수자로 이루어져야합니다!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="비밀번호"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            로그인
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="login-form-button">
            <Link to="/register">회원가입&nbsp;하러가기</Link>
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({})(LoginForm);
