import React, { Component } from 'react'
import { Modal, Input, message, Button } from 'antd'
import { Link } from 'react-router-dom'
import { 
  reqAddContainer, 
  reqAddCard, 
  reqGetContainers, 
  reqDeleteCard, 
  reqDeleteContainer, 
  reqDeleteUser,
  reqEditContainer,
  reqEditCard
  } from '../../api'
import './container.less'

export default class Container extends Component {
  state = {
    containers: [],
    visibleContainer: false,
    visibleCard: false,
    visibleEditContainer: false,
    visibleEditCard: false,
    containerName: '',
    cardName: '',
    index: 0
  }
  
  add = (visible, index, name) => {
    this.setState({
      [visible]: true,
      index,
      containerName: name,
      cardName: name
    })
  }
  handleCancel = () => {
    this.setState({
      visibleContainer: false,
      visibleCard: false,
      visibleEditContainer: false,
      visibleEditCard: false,
    });
  };
  allContainer = () => {
    const { containers } = this.state;
    return containers && containers.map((item, index) => (
      <div className="container-each" key={item.id}>
        <h3>
          {item.containerName}
          <Button shape="circle" icon="close" style={{ float: "right" }} onClick={() => this.deleteContainer(item.id)} />
          <Button style={{ float: "right" }} icon="edit" onClick={() => this.add('visibleEditContainer', item.id, item.containerName)} ></Button>
        </h3>
        <div className="container-card">
          <ul>
            {item.cards && item.cards.map((card, i) => (<li className="each-card" key={card.id}>
              {card.cardName}
              <Button shape="circle" icon="close" className="icon-close" onClick={() => this.deleteCard(card.id)} />
              <Button style={{ float: "right" }} icon="edit" onClick={() => this.add('visibleEditCard', card.id, card.cardName)} ></Button>
              </li>))} 
          </ul>
          <Button type="primary" onClick={() =>this.add('visibleCard', item.id)}>card 추가</Button>
        </div>
      </div>
    ))
  }
    cardChange = (e) => {
      this.setState({
        cardName: e.target.value
      })
    }
    containerChange = (e) => {
      this.setState({
        containerName: e.target.value
      })
    }
    addContainer = async () => {
      const { containerName } = this.state;
      if(!/^[\uac00-\ud7ffA-z0-9]+$/.test(containerName)){
        message.error("한글, 영문, 수자만 입력해주세요!")
        return
      }
      // const { containers } = this.state;
      let board_id = +this.props.match.params.id
      await reqAddContainer({board_id, containerName})
      let result = await reqGetContainers({board_id})
      if(result.code === 0){
        this.setState({
          containers: result.data,
          visibleContainer: false,
          containerName: ''
        })
      }
    }
    addCard = async () => {
      const { index, cardName } = this.state;
      if(!/^[\uac00-\ud7ffA-z0-9]+$/.test(cardName)){
        message.error("한글, 영문, 수자만 입력해주세요!")
        return
      }
      await reqAddCard({cardName, container_id: index})
      let board_id = +this.props.match.params.id
      let result = await reqGetContainers({board_id})
      if(result.code === 0){
        this.setState({
          containers: result.data,
          visibleCard: false,
          cardName: ''
        })
      }
    }
    logout = () => {
      localStorage.removeItem("token")
      message.success('로그아웃 됬습니다!')
      this.props.history.replace('/login')
    }
    deleteCard = async (id) => {
      let card = await reqDeleteCard({ id })
      if(card.code === 0){
        message.success(card.message)
        let board_id = +this.props.match.params.id
        let result = await reqGetContainers({board_id})
        if(result.code === 0){
          this.setState({
            containers: result.data
          })
        }
      } else {
        message.error(card.message)
      }     
    }
    deleteContainer = async (id) => {
      let container = await reqDeleteContainer({ id })
      if(container.code === 0){
        message.success(container.message)
        let board_id = +this.props.match.params.id
        let result = await reqGetContainers({board_id})
        if(result.code === 0){
          this.setState({
            containers: result.data
          })
      }
      } else {
        message.error(container.message)
      }     
    }
    deleteUser = async () => {
      let result = await reqDeleteUser()
      if(result.code === 0){
        message.success(result.message)
        this.props.history.replace('/login')
      } else {
        message.error(result.message)
      } 
    }
    editContainer = async () => {
      const { containerName, index } = this.state;
      if(!/^[\uac00-\ud7ffA-z0-9]+$/.test(containerName)){
        message.error("한글, 영문, 수자만 입력해주세요!")
        return
      }
      let editResult = await reqEditContainer({ id: index, containerName })
      if(editResult.code === 0){
        message.success(editResult.message)
        let board_id = +this.props.match.params.id
        let result = await reqGetContainers({ board_id })
        if(result.code === 0){
          this.setState({
            containers: result.data,
            visibleEditContainer: false,
            containerName: ''
          })
        } else {
          message.error(result.message)
        }
      } else {
        message.error(editResult.message)
      }
    }
    editCard = async () => {
      const { cardName, index } = this.state;
      if(!/^[\uac00-\ud7ffA-z0-9]+$/.test(cardName)){
        message.error("한글, 영문, 수자만 입력해주세요!")
        return
      }
      let editResult = await reqEditCard({ id: index, cardName })
      if(editResult.code === 0){
        message.success(editResult.message)
        let board_id = +this.props.match.params.id
        let result = await reqGetContainers({ board_id })
        if(result.code === 0){
          this.setState({
            containers: result.data,
            visibleEditCard: false,
            cardName: ''
          })
        } else {
          message.error(result.message)
        }
      } else {
        message.error(editResult.message)
      }
    }
    async componentDidMount(){
      let board_id = +this.props.match.params.id
      let result = await reqGetContainers({board_id})
      if(result.code === 0){
        this.setState({
          containers: result.data
        })
      }
    }
    render() {
      const { visibleContainer, visibleCard, visibleEditContainer, visibleEditCard, containerName, cardName, containers } = this.state;
      return (
        <div style={{ padding: 30 }}>
          <div style={{ overflow: "hidden" }}>
            <Button type="primary" style={{ marginBottom: 10, float: "left" }} onClick={() =>this.add('visibleContainer')}>container 추가</Button>
            <Button style={{ float: "right"}} onClick={this.deleteUser}>회원탈퇴</Button>
            <Button style={{ float: "right"}}><Link to="/editPassword">비밀번호 수정</Link></Button>
            <Button style={{ float: "right"}} onClick={this.logout}>로그아웃</Button>
          </div>
          <div className="container" style={{display: "flex"}}>
           {containers && this.allContainer()}
          </div>
          <Modal
              title="container 추가"
              visible={visibleContainer}
              onOk={this.addContainer}
              onCancel={this.handleCancel}
            >
            <Input 
              onChange={ this.containerChange } 
              value={containerName} 
              placeholder="한글, 영문, 수자만 입력하세요!" />
          </Modal>
          <Modal
              title="card 추가"
              visible={visibleCard}
              onOk={this.addCard}
              onCancel={this.handleCancel}
            >
            <Input 
              onChange={ this.cardChange } 
              value={cardName} 
              placeholder="한글, 영문, 수자만 입력하세요!" />
          </Modal>
          <Modal
              title="container 수정"
              visible={visibleEditContainer}
              onOk={this.editContainer}
              onCancel={this.handleCancel}
            >
            <Input 
              onChange={ this.containerChange } 
              value={containerName} 
              placeholder="한글, 영문, 수자만 입력하세요!" />
          </Modal>
          <Modal
              title="card 수정"
              visible={visibleEditCard}
              onOk={this.editCard}
              onCancel={this.handleCancel}
            >
            <Input 
              onChange={ this.cardChange } 
              value={cardName} 
              placeholder="한글, 영문, 수자만 입력하세요!" />
          </Modal>
        </div>
          
      );
    }
  }

