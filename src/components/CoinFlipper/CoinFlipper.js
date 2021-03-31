import React, { Component } from "react";
import Coin from "../Coin/Coin";
import "./CoinFlipper.css";

class CoinFlipper extends Component {
  constructor(props) {
    super(props);
    // State üzerinde paranın başlangıçtaki durumunu veriyoruz, başlangıçta "tura" olsun.
    // Daha sonra şu anda paranın dönüp dönmeme durumunu da veriyoruz, başlangıçta para atılmamış olduğundan "false" olarak verdik.
    this.state = {
      side: this.options[0],
      flipping: false,
      count: 0,
      yazi: 0,
      tura: 0
    };
  }
  options = ["yazı", "tura"];
  randomElement = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  handleClick = () => {
    // "At!" butonuna tıkladığımızda paranın dönmesini istiyoruz, bu yüzden "flipping" durumunu "true" yapıyoruz.
    this.setState({ flipping: true });
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
    const random = this.randomElement(this.options);

    // 1 saniye kadar dönmesi yeterli, bu yüzden 1 saniye sonra "flipping" durmunu tekrar "false" yapıyoruz.
    setTimeout(() => {
      this.setState({ flipping: false, side: this.options[random] });
      if (this.state.side === "yazi") {
        this.setState((prevState) => ({ yazi: prevState.yazi + 1 }));
      }
      if (this.state.side === "tura") {
        this.setState((prevState) => ({ tura: prevState.tura + 1 }));
      }
    }, 1000);
  };

  render() {
    return (
      <div className="CoinFlipper">
        <h1>Yazı mı Tura mı?</h1>
        <Coin side={this.state.side} flipping={this.state.flipping} />
        <button onClick={this.handleClick}>At!</button>
        <p>
          Toplam
          <strong> {this.state.count} </strong>
          atıştan
          <strong> {this.state.tura} </strong>ü tura
          <strong> {this.state.yazi} </strong>
          si yazı geldi.
          <strong>{this.state.side}</strong>
        </p>
      </div>
    );
  }
}

export default CoinFlipper;
