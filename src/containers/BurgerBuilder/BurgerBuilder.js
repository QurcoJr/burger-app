import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuidlControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  };

  updatePurchaseState = updatedIngredient => {
    const ingredientsArr = Object.values(updatedIngredient);
    const ingredientsSum = ingredientsArr.reduce((sum, el) => (sum += el), 0);

    this.setState({
      purchasable: ingredientsSum > 0
    });
  };

  addIngredientHandler = type => {
    const updatedCont = this.state.ingredients[type] + 1;
    const updatedIngredient = {
      ...this.state.ingredients,
      [type]: updatedCont
    };
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredient
    });

    this.updatePurchaseState(updatedIngredient);
  };

  removeIngedientHandler = type => {
    if (this.state.ingredients[type] > 0) {
      const updatedCount = this.state.ingredients[type] - 1;
      const updatedIngredient = {
        ...this.state.ingredients,
        [type]: updatedCount
      };
      const priceDeduction = INGREDIENT_PRICES[type];
      const newPrice = this.state.totalPrice - priceDeduction;

      this.setState({
        totalPrice: newPrice,
        ingredients: updatedIngredient
      });

      this.updatePurchaseState(updatedIngredient);
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (const [key, value] of Object.entries(disabledInfo)) {
      disabledInfo[key] = value <= 0;
    }

    return (
      <>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuidlControls
          price={this.state.totalPrice}
          disabledInfo={disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngedientHandler}
          purchasable={this.state.purchasable}
        />
      </>
    );
  }
}

export default BurgerBuilder;
