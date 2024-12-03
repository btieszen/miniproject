

import CustomerForm from './Components/CustomerForm';
import './AppStyles.css';
import NavigationBar from './Components/NavigationBar';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from './Components/HomePage';
import CustomerList from './Components/CustomerList';
import CustomerFormWrapper from './Components/CustomerFormWrapper';
import Display from './Components/Display';
import ProductList from './Components/ProductList';
import ProductForm from './Components/ProductForm';
import PlaceOrder from './Components/PlaceOrder';
import NewDate from './Components/NewDate';


function App() {
    return (
    
        <div className='app-container'>
            <NavigationBar />
            <HomePage />
            <NewDate />

            <Routes>

                <Route path='homepage' element={<HomePage />} />
                <Route path='customerform' element={<CustomerForm />} />
                <Route path='customerlist' element={<CustomerList />} />
                <Route path='/customers' element={<CustomerList />} />
                <Route path='/add-customers' element={<CustomerFormWrapper />} />
                <Route path='/add-customers' element={<CustomerForm />} />
                <Route path='/customers' element={<CustomerFormWrapper />} />
                <Route path='/display' element={<Display/>}/>
                <Route path='/productlist' element={<ProductList/>}/>
                <Route path='/productform' element={<ProductForm/>}/>
                <Route path='/placeorder' element={<PlaceOrder/>}/>
          

            </Routes>



        </div>
    );
}

export default App;