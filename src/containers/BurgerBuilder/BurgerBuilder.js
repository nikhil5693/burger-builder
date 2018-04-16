import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 15,
    cheese: 10,
    meat: 50,
    bacon: 40
};

class BurgerBuilder extends Component {
    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 40,
        purchasable: false,
        purchasing: false
    };

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] <= 0) {
            return;
        };
        const updatedCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const updatedTotalPrice = this.state.totalPrice - priceAddition;

        this.setState({ingredients: updatedIngredients, totalPrice: updatedTotalPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum>0});
    };

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const updatedTotalPrice = this.state.totalPrice + priceAddition;

        this.setState({ingredients: updatedIngredients, totalPrice: updatedTotalPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    updatePurchaseHandler = () => {
        this.setState({purchasing: true});
    };

    updateContinueHandler = () => {
        alert("Congrats!!");
    };

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (const key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return(
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.updateContinueHandler}
                        totalPrice={this.state.totalPrice}
                        />
                </Modal>
                <div><Burger ingredients = {this.state.ingredients}/></div>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchasing={this.updatePurchaseHandler}
                    disabledInfo={disabledInfo}/>
            </Aux>
        );
    };
}

export default BurgerBuilder;