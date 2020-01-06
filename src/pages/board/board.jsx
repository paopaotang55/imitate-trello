import React, { Component } from 'react'
import { Button, Card, Modal, Input, message } from 'antd'
import { Link } from 'react-router-dom'

import './board.less'

export default class Board extends Component {
  state = {
    boards: [],
    visible: false,
    boardName: ''
  }
  
    boardPlus = () => {
      this.setState({
        visible: true,
      });
    }
    handleCancel = () => {
      this.setState({
        visible: false
      });
    };
    allBoards = () => {
      const { boards } = this.state;
      return boards.map((board, index) => {
        return (
          <div>
            <Button key={board.id} style={{marginBottom: 10}}>
              <Link to={`/board/${board.id}`}>
                {board}
              </Link>
            </Button>
          </div>
        )
      })
    }
    handleChange = (e) => {
      this.setState({
        boardName: e.target.value
      })
    }
    handleOk = () => {
      const { boardName } = this.state;
      if(!/^[\uac00-\ud7ffA-z0-9]+$/.test(boardName)){
        message.error("한글, 영문, 수자만 입력해주세요!")
      }
      const {boards} = this.state;
      this.setState({
        boards: [...boards, boardName],
        visible: false,
        boardName: ''
      })
    }
    componentDidMount(){
      this.setState({
        boards: ["aaa","bbb"]
      })
    }
    render() {
      const { boards, visible, boardName } = this.state;
      return (
        <div style={{ padding: 30}}>
          <Card title="모든 board">
            {boards && this.allBoards()}
            <Button type="primary" style={{border: 'none'}} onClick={this.boardPlus}>board 추가</Button>
            <Modal
              title="board 추가"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
            <Input 
            onChange={ this.handleChange } 
            value={boardName} 
            placeholder="한글, 영문, 수자만 입력하세요!" />
            </Modal>
         </Card>
        </div>
      );
    }
  }
