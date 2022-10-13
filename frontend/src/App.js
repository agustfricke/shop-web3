import { HashRouter as Router,Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Pay from "./components/Pay";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import SoloProduct from "./components/SoloProduct";
import Cart from "./components/Cart";
import ShippingScreen from "./components/ShippingScreen";
import PlaceOrderScreen from "./components/PlaceOrderScreen";
import OrderScreen from "./components/OrderScreen";
import MiPerfil from "./components/MiPerfil";
import EditProfile from "./components/EditProfile";
import ProductEditScreen from "./components/ProductEditScreen";
import ProductListScreen from "./components/ProductListScreen";
import OrderListScreen from "./components/OrderListScreen";
import UserListScreen from "./components/UserListScreen";
import UserEditScreen from './components/UserEditScreen';
import Transactions from "./components/Transactions";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <Router>

    <Header />
      <Switch>
        <Container>
        <div className='mt-10 '>  
          <Route path="/" component={Home} exact/>
          <Route path="/Pay" component={Pay } />
          <Route path="/product/:id" component={SoloProduct } />
          <Route path='/cart/:id?' component={Cart} />
          <Route path="/Register" component={Register } />
          <Route path="/Login" component={Login } />

          <PrivateRoutes path='/shipping' component={ShippingScreen} />
          <PrivateRoutes path='/placeorder' component={PlaceOrderScreen} />
          <PrivateRoutes path='/order/:id' component={OrderScreen} />
          <PrivateRoutes path='/profile' component={MiPerfil} />
          <PrivateRoutes path='/editprofile' component={EditProfile} />
          <PrivateRoutes path='/admin/product/:id/edit' component={ProductEditScreen} />
          <PrivateRoutes path='/admin/products' component={ProductListScreen} />
          <PrivateRoutes path='/admin/orders/' component={OrderListScreen} />
          <PrivateRoutes path='/admin/users' component={UserListScreen} />
          <PrivateRoutes path='/admin/user/:id/edit' component={UserEditScreen} />
          <PrivateRoutes path='/transactions' component={Transactions} />
        </div>
      </Container>
      </Switch>

    </Router>


  );
}

export default App;
