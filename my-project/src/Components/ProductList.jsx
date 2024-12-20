import { func } from 'prop-types';
import { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class ProductList extends Component {
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
    handleRemove = (id) => {
       
        axios.delete(`http://127.0.0.1:5000/products/${id}`)
            .then(response => {
                console.log('products deleted successfully Submitted:', response.data);
            })
            .catch(error => {
                console.error('There was an error submitting  Form:', error);
            });
    };


    render() {
        const { products } = this.state;

        

        return (
            <div className="products-list">
                <h3>Products</h3>
                <ul>
                    {products.map(products => (
                        <li key={products.id}>
                            <Link to={'/customer.Order}'}></Link>
                            <Link to={'/ProductForm/${Products.id}'}>{products.name} | price:${products.price}  </Link>
                            <button type="button" onClick={() => this.handleRemove(products.id)}>
                                Delete
                            </button>

                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

ProductList.propTypes = {
    onProductSelect: func
}
export default ProductList;