import { observable, action } from 'mobx';
import * as ReactDOM from 'react-dom'

type CardState = {
  index: number;  
  alertLeft: boolean;
  alertRight: boolean;
  alertTop: boolean;
  alertBottom: boolean;
  loaded: boolean;
  containerSize: { x: number, y: number }
};

export class CardStore {
  @observable
  state: CardState = {
    index: 0,
    alertLeft: false,
    alertRight: false,
    alertTop: false,
    alertBottom: false,
    loaded: false,
    containerSize: { x: 0, y: 0 }
  };

  @action
  public setSize = (container: HTMLElement) => {
    const containerSize = {
      x: container.offsetWidth,
      y: container.offsetHeight
    }
    this.state.containerSize = containerSize;
    this.state.loaded = true;
  }

  @action
  public unmount = () => {
    this.state.loaded = false;
  }

  @action
  public removeCard = (side: string, children: React.ReactNode[], onEnd?: () => void) => {
    const stateAfterAlert: CardState = {...this.state}
    stateAfterAlert[`alert${side}`] = false;
    stateAfterAlert.index = stateAfterAlert.index + 1
    setTimeout(action(() => {this.state = stateAfterAlert}), 300)
    
    if ((children as React.ReactNode[]).length === (this.state.index + 1) && onEnd) {
      onEnd()
    }

    const stateWhileAlerting = {index: this.state.index + 1, ...this.state}
    stateWhileAlerting[`alert${side}`] = true
    stateWhileAlerting.index = stateWhileAlerting.index + 1
    this.state = stateWhileAlerting
  }

  @action
  public goBack = () => {
    if (this.state.index > 0) {
      this.state.index = this.state.index - 1
      return true
    } else {
      return false
    }
  }

  @action
  public increaseIndex = () => {
    this.state.index = this.state.index + 1
  }
}

export default new CardStore();