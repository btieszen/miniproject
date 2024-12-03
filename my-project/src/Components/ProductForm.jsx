import { Component } from 'react';
import axios from 'axios';

class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: '',
            error: {},
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(name, value)
    };

    validateForm = () => {
        const { name, price } = this.state;
        const error = {};
        if (!name) error.name = 'Name is Required';
        if (!price) error.price = 'Price is Required';
        return error;
    };


    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
            console.log('Submitted product:', this.state);

            const productsData = {
                name: this.state.name.trim(),
                price: this.state.price.trim(),
            };
            axios.post('http://127.0.0.1:5000/products', productsData)
                .then(response => {
                    console.log('Data successfully Submitted:', response.data);
                })
                .catch(error => {
                    console.error('There was an error submitting  Form:', error);
                });
        } else {
            this.setState({ errors });
        }
    };

    render(){
        const { name,price } = this.state;
        
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Add/Edit Products</h3>
                <label>
                    Name:
                    <input type='text' name='name' value={name} onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    Price:
                    <input type='text' name='price' value={price} onChange={this.handleChange}
                    />
                </label>
                <br />
          
                <button type ='submit'>submit</button>
            </form>
        );  
    };
    }
export default ProductForm;