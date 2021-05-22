import React, {useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = ()=> {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = ()=>{
        if(state){
            return[
                <li><Link to="/profile"><i class="material-icons">perm_identity</i></Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li>
                    <button className="logout"  onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                    }}>
                    <i class="material-icons" style={{color:"black", cursor:"pointer"}}>exit_to_app</i>
                    </button> 
                </li>
            ]
        }else{
            return[
                <li><Link to="/signin">Нэвтрэх</Link></li>,
                <li><Link to="/signup">Бүртгүүлэх</Link></li>
            ]
        }
    }
    return(
        <nav>
            <div className="nav-wrapper white">
               <Link to={state?"/":"/signin"} className="brand-logo left">Mbppeee</Link>
               <ul id="nav-mobile" className="right">
                  {renderList()}
               </ul>
            </div>
        </nav>
    )
}

export default NavBar
