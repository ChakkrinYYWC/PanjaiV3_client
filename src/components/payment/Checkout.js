import React, { Component } from "react";
import Script from "react-load-script";
import { publicKey } from "../../confidential/keys";

let OmiseCard;

export class Checkout extends Component {

  state = {
    cart: {
      email: "guest@test.com",
      name: "Guest",
      amount: 10000,
      //totalQty: 0
    },
    addToCartMessage: undefined,
  };

  handleScriptLoad = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey,
      frameLabel: "ปันใจ",
      submitLabel: "PAY NOW",
      currency: "THB"
    });
  };

  creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: []
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    const { cart } = this.state;
    const { createCreditCardCharge } = this.props;
    const { user_id, my_coin } = this.props;
    //const { cart, createCreditCardCharge } = this.props;
    console.log(cart)
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: cart.amount,
      onCreateTokenSuccess: token => {
        createCreditCardCharge(cart.email, cart.name, cart.amount, token, user_id, my_coin);
      },
      onFormClosed: () => { }
    });
  };

  handleClick = money => async e => {
    //console.log(money)
    const { user_name, user_email } = this.props;
    await this.setState({
      cart: {
        email: user_email,
        name: user_name,
        amount: money * 100,
        totalQty: 0
      }
    })
    e.preventDefault();
    this.creditCardConfigure();
    this.omiseCardHandler();
  };

  render() {

    const { money } = this.props;
    //console.log(user_name)
    //console.log(money)

    return (
      <>
        <div className="own-form">
          <Script
            url="https://cdn.omise.co/omise.js"
            onLoad={this.handleScriptLoad}
          />
          <form>
            <button
              id="credit-card"
              type="button"
              className="btn"
              onClick={this.handleClick(money)}
            >
              {money} บาท
            </button>
          </form>
        </div>

      </>
    );
  }

}

export default Checkout;
