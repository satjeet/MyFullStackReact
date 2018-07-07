import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

//el amount esta en centavos americanos
//token va a representar un callback ,cuando se autorize el pago
class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily Alfaro"
        description=" 5 credits por 5 Dolares"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn"> Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
