import React, { Component } from 'react';
import "./userInfo.css"

class WalletDropdown extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  render() {
    return (
      <div id="walletDropdown">
        <button onClick={this.showMenu}>
        <h1>Wallet Adress</h1>
        </button>
        {
          this.state.showMenu
            ? (
              <div id="dropdownTabs"
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <button id="dropdownBtn1"><h4>View Transactions</h4></button>
                <button id="dropdownBtn2"><h4>Disconnect Wallet</h4> </button>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}
export default WalletDropdown;
