import React, { Component } from "react";
import { Button, Card, Modal, Input, message } from "antd";
import { Link } from "react-router-dom";
import {
  reqGetBoards,
  reqAddBoard,
  reqDeleteBoard,
  reqDeleteUser,
  reqEditBoard
} from "../../api";

import "./board.less";

export default class Board extends Component {
  state = {
    boards: [],
    visible: false,
    visibleEdit: false,
    boardName: "",
    boardId: 0
  };

  boardPlus = (visible, boardName, boardId) => {
    this.setState({
      [visible]: true,
      boardName,
      boardId
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      visibleEdit: false
    });
  };
  allBoards = () => {
    const { boards } = this.state;
    return (
      boards &&
      boards.map((board, index) => {
        return (
          <div key={board.id}>
            <Button style={{ marginBottom: 10 }}>
              <Link to={`/board/${board.id}`}>{board.boardName}</Link>
            </Button>
            <Button
              shape="circle"
              icon="close"
              style={{ float: "right" }}
              onClick={() => this.deleteBoard(board.id)}
            />
            <Button
              style={{ float: "right" }}
              icon="edit"
              onClick={() =>
                this.boardPlus("visibleEdit", board.boardName, board.id)
              }
            ></Button>
          </div>
        );
      })
    );
  };
  handleChange = e => {
    this.setState({
      boardName: e.target.value
    });
  };
  handleOk = async () => {
    const { boardName } = this.state;
    if (!/^[\uac00-\ud7ffA-z0-9]+$/.test(boardName)) {
      message.error("한글, 영문, 수자만 입력해주세요!");
      return;
    }
    await reqAddBoard({ boardName });
    let result = await reqGetBoards();
    if (result.code === 0) {
      this.setState({
        boards: result.data,
        visible: false,
        boardName: ""
      });
    } else {
      message.error(result.message);
    }
  };
  handleOkEdit = async id => {
    const { boardName } = this.state;
    if (!/^[\uac00-\ud7ffA-z0-9]+$/.test(boardName)) {
      message.error("한글, 영문, 수자만 입력해주세요!");
      return;
    }
    let editResult = await reqEditBoard({ id, boardName });
    if (editResult.code === 0) {
      message.success(editResult.message);
      let result = await reqGetBoards();
      if (result.code === 0) {
        this.setState({
          boards: result.data,
          visibleEdit: false,
          boardName: ""
        });
      } else {
        message.error(result.message);
      }
    } else {
      message.error(editResult.message);
    }
  };
  logout = () => {
    localStorage.removeItem("token");
    message.success("로그아웃 됬습니다!");
    this.props.history.replace("/login");
  };
  deleteBoard = async id => {
    let board = await reqDeleteBoard({ id });
    if (board.code === 0) {
      message.success(board.message);
      this.getBoards();
    } else {
      message.error(board.message);
    }
  };
  deleteUser = async () => {
    let result = await reqDeleteUser();
    if (result.code === 0) {
      message.success(result.message);
      this.props.history.replace("/login");
    } else {
      message.error(result.message);
    }
  };
  componentDidMount() {
    this.getBoards();
  }
  getBoards = async () => {
    let result = await reqGetBoards();
    if (result.code === 0) {
      this.setState({
        boards: result.data
      });
    } else {
      message.error(result.message);
    }
  };
  render() {
    const { boards, visible, boardName, boardId, visibleEdit } = this.state;
    return (
      <div className="board">
        <div className="board-div">
          <Button className="board-button" onClick={this.deleteUser}>
            회원탈퇴
          </Button>
          <Button className="board-button">
            <Link to="/editPassword">유저정보 수정</Link>
          </Button>
          <Button onClick={this.logout} className="board-button">
            로그아웃
          </Button>
        </div>
        <Card title="모든 board" style={{ width: 300 }}>
          {boards && this.allBoards()}
          <Button
            type="primary"
            style={{ border: "none" }}
            onClick={() => this.boardPlus("visible")}
          >
            board 추가
          </Button>
          <Modal
            title="board 추가"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input
              onChange={this.handleChange}
              value={boardName}
              placeholder="한글, 영문, 수자만 입력하세요!"
            />
          </Modal>
          <Modal
            title="board 수정"
            visible={visibleEdit}
            onOk={() => this.handleOkEdit(boardId)}
            onCancel={this.handleCancel}
          >
            <Input
              onChange={this.handleChange}
              value={boardName}
              placeholder="한글, 영문, 수자만 입력하세요!"
            />
          </Modal>
        </Card>
      </div>
    );
  }
}
