import React, { Component } from 'react'
import { Modal, Input, message, Button } from 'antd'
import './container.less'

export default class Container extends Component {
  state = {
    containers: [],
    visibleContainer: false,
    visibleCard: false,
    containerName: '',
    cardName: '',
    index: 0
  }
  
  add = (name, index) => {
    this.setState({
      [name]: true,
      index
    })
  }
  handleCancel = () => {
    this.setState({
      visibleContainer: false,
      visibleCard: false
    });
  };
  allContainer = () => {
    const { containers } = this.state;
    return containers.map((item, index) => (
      <div className="container-each" key={index}>
        <h3>{item.containerName}</h3>
        <div className="container-card">
          <ul>
            {item.children && item.children.map((item, i) => (<li className="each-card" key={i}>
              {item.cardName}
              </li>))} 
          </ul>
          <Button type="primary" onClick={() =>this.add('visibleCard', index)}>card 추가</Button>
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
    addContainer = () => {
      const { containerName } = this.state;
      if(!/^[\uac00-\ud7ffA-z0-9]+$/.test(containerName)){
        message.error("한글, 영문, 수자만 입력해주세요!")
      }
      const { containers } = this.state;
      const container = {id: 1, containerName, children: []}
      this.setState({
        containers: [...containers, container],
        visibleContainer: false,
        containerName: ''
      })
    }
    addCard = () => {
      const { containers, index, cardName } = this.state;
      if(!/^[\uac00-\ud7ffA-z0-9]+$/.test(cardName)){
        message.error("한글, 영문, 수자만 입력해주세요!")
      }
      let containersNew = JSON.parse(JSON.stringify(containers))
      containersNew[index].children.push({id: 5, cardName})
      this.setState({
        containers: containersNew,
        visibleCard: false,
        cardName: ''
      })
    }  
    componentDidMount(){
      this.setState({
        containers: [
          {id: 1, containerName: "콘테이너1", children: [{id: 2, cardName: "카드네임2"}, {id: 3, cardName: "코드네임3"}]},
          {id: 2, containerName: "콘테이너2", children: [{id: 4, cardName: "카드네임4"}, {id: 5, cardName: "코드네임5"}]},
          {id: 3, containerName: "콘테이너3", children: []}
        ]
      })
    }
    render() {
      const { visibleContainer, visibleCard, containerName, cardName, containers } = this.state;
      return (
        <div style={{ padding: 30 }}>
          <Button type="primary" style={{marginBottom: 10}} onClick={() =>this.add('visibleContainer')}>container 추가</Button>
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
        </div>
          
      );
    }
  }

