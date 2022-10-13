import {Route, Redirect} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


const PrivateRoutes = ({children, ...rest}) => {

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    return (
        <Route {...rest}>
            {!userInfo ? 

            <Redirect to={'/#/login'}/>

            :

            children}

        </Route>
    )
}

export default PrivateRoutes