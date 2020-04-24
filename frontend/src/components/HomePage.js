import React ,{useState}from 'react';
import {Link, useHistory} from 'react-router-dom';
import queryString from 'query-string';
import SideBar from './SideBar.js';
//import Recommend from './Recommend.js';
import './HomePage.css';
import SidebarIcon from './img/side-bar-icon.png'
import SearchIcon from './img/search-icon.png';
import Hydrocal from './img/hydrocal.jpg';

const HomePage = () => {
    //const [leftSideBar, setLeftSideBar]=useState(false);
    const [searchContent, setSearchContent] =useState('');
    const [toggleLogin,setToggleLogin] = useState(false);
    const history = useHistory();

    const accountLogin = () =>{
        setToggleLogin(!toggleLogin);
    }

    const signIn = ()=>{
    sessionStorage.getItem('username') && sessionStorage.getItem('password') ? alert('already login') : history.push('/login')
    };
    const cartCheck = () =>{
        history.push('/cart')
    }
    /*
    const toggleLeftSidebar =()=>{
        setLeftSideBar(!leftSideBar);
    };
    */

    const toggleSearchContent =(event)=>{
        setSearchContent(event.target.value)
    };

    const searchContentPara = queryString.stringify(
        {
            content: searchContent
        }
    )

    const handleKeyPress = (event) =>{
        if(event.key === 'Enter'){
            history.push(`/Result?${searchContentPara}`)
        }
    }

    return (
        <div className =''>
        {/* {
            leftSideBar && (
                <div className ='homepage__side-bar'></div>
            )

        } */}
        <div className ='homepage__container'>
            <div className='homepage__header'>
                {/*
                <div className ='homepage__left-part'>
                    <img src={SidebarIcon} className = 'homepage__icon' onClick={toggleLeftSidebar}/>
                <b className = 'homepage__left-part--font'>Ecom</b>
                </div>
                */}
                <SideBar />
                <div className ='homepage__search--container'>
                    <input type='text' className  ='homepage__search' placeholder="search specific item" onChange ={toggleSearchContent}
                    onKeyPress={handleKeyPress} />
                    <Link to= {`/Result?${searchContentPara}`} className="search_btn">
                        <img src={SearchIcon} className = 'homepage__search--icon'/>
                    </Link>
                </div>
                <ul className ='homepage__right-part'>
                    <li className='account_Management' onClick={accountLogin} >
                        My&nbsp;Account
                        {toggleLogin && (
                    <div className = 'login__container'>
                        <div class = 'login__container--sign-in' onClick = {signIn}> Sign In</div>
                        <div className='login__border'></div>
                        <div class = 'login__container--create'>Create Account</div>
                    </div>
                )}
                    </li>

                    <li>
                        Orders
                    </li>

                    <li className='cart_Management' onClick={cartCheck}>
                        Cart
                    </li>
                </ul>
            </div>
      
            <div className='homepage__content'>
            <div className='homepage__items-part'>
                <Link to='showingItems?category=all'>
           
                <div className='homepage__item--cate'>
                    <span>Explore All Items</span>
                    <src src='' className=""></src>
                </div> 
                 </Link>
                 <Link to='showingItems?category=all'>
           
           <div className='homepage__item--cate'>
               <span>Lightweight Hydrocal</span>
               <img src={Hydrocal} className = 'homepage__item1'/>
               <span> recommended quick-setting product!</span>
           </div> 
            </Link>
            <Link to='showingItems?category=all'>
           
           <div className='homepage__item--cate'>
               <span>Explore category</span>
           </div> 
            </Link>
            <Link to='showingItems?category=all'>
           
                <div className='homepage__item--cate'>
                    <span>Explore All Items</span>
                </div> 
                 </Link>
            </div>
              {/* <Recommend isHomepage={true}/> */}
            </div>         
       
                            {/*
            <div className = 'homepage__footer'>
                <h1 class = 'contact_us' style={{fontSize: '20px', color: 'white'}}>connect with us</h1>
                <div className = 'contact_email'>
                <span>Fangda.Chi001@umb.edu</span> <br />
                <span>james.michaud001@umb.edu</span> <br/>
                <span>zhenrong.liew001@umb.edu</span>
                </div>
                            
            </div>    
            */}
        </div>
        </div>
    )
}

export default HomePage
