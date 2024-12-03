import { func } from 'prop-types';
import { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import NewDate from './NewDate';


class PlaceOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            selectedProductsId: null
        };
    }

    componentDidMount() {

        axios.get('http://127.0.0.1:5000/products')

            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(error => {
                console.error('Error Fetching Data:', error);
            })
    }

    selectProducts = (id) => {
        this.setState({ selectedProductsId: id })
        this.props.onProductsSelect(id);
    }


    render() {
        const { products } = this.state;

        function handleClick() {
                alert('Thank You, Your Order Has been Placed',{NewDate});
            <br />


            }



        return (
            <div className="products-list">
                <h3>Products</h3>
                <ul>
                    {products.map(products => (
                        <li key={products.id}>
                            <Link to={'/CustomerOrder'}>{products.name}|price:${products.price}</Link>
                        
                            <button onClick={handleClick}>
                                Place Order
                            </button>

                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

PlaceOrder.propTypes = {
    onProductSelect: func
}
export default PlaceOrder;