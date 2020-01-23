import React, { Component } from "react";
import { Form, Icon, Input, Button, message, Modal } from "antd";
import { reqEditPassword, reqEditUsername } from "../../api";
import "./index.less";

class EditPassword extends Component {
  state = {
    username: "",
    visible: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (values.password2 === values.password3) {
          let result = await reqEditPassword(values);
          if (result.code === 0) {
            this.props.history.replace("/board");
            message.success(result.message);
          } else {
            message.error(result.message);
          }
        } else {
          message.error("새 비밀번호 일치하지 않음");
        }
      }
    });
  };
  handleConfirmPassword = (rule, value, callback) => {
    value = value.trim();
    if (!value) {
      callback("비밀번호를 입력하세요!");
    } else if (value.length < 5) {
      callback("5개 자리 넘어야 합니다!");
    } else if (value.length > 15) {
      callback("15개 자리 넘으면 안됩니다!");
    } else if (!/^[A-z0-9]+$/.test(value)) {
      callback("영문 혹은 수자로 이루어져야합니다!");
    } else {
      callback();
    }
  };
  handleChange = e => {
    this.setState({
      username: e.target.value
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  handleOk = async () => {
    const { username } = this.state;
    if (!/^[\uac00-\ud7ffA-z0-9]+$/.test(username)) {
      message.error("한글, 영문, 수자만 입력해주세요!");
      return;
    }
    let result = await reqEditUsername({ username });
    if (result.code === 0) {
      this.setState({
        visible: false,
        username: ""
      });
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };
  editUsername = () => {
    this.setState({
      visible: true
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { username, visible } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form registerForm">
        <h3>트&nbsp;&nbsp;렐&nbsp;&nbsp;로</h3>
        <Button
          type="primary"
          onClick={this.editUsername}
          style={{ width: "100%", marginBottom: 15 }}
        >
          유저네임 수정
        </Button>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ validator: this.handleConfirmPassword }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="예전 비밀번호"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password2", {
            rules: [{ validator: this.handleConfirmPassword }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="새 비밀번호"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password3", {
            rules: [{ validator: this.handleConfirmPassword }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="새 비밀번호 확인"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            비밀번호 수정
          </Button>
        </Form.Item>
        <Modal
          title="board 추가"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            onChange={this.handleChange}
            value={username}
            placeholder="한글, 영문, 수자만 입력하세요!"
          />
        </Modal>
      </Form>
    );
  }
}

export default Form.create({})(EditPassword);
