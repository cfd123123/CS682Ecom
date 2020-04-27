import React ,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import queryString from 'query-string';
import Recommended from './Recommend/Recommended.js';
import SideBar from './SideBar.js';
//import Recommend from './Recommend.js';
import './HomePage.css';
// import SidebarIcon from './img/side-bar-icon.png'
import SearchIcon from './img/search-icon.png';
import Hydrocal from './img/hydrocal.jpg';
import EmptyProduct from './img/empty-product-icon.png';


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
            <Recommended recommendedProducts={
              [
                {
                  name: "Salad Bar",
                  shortDescription:
                    "Best Salad Bar in the WORLD!",
                  longDescription: "asd"
                },
                {
                  name: "SAMSUNG 123X",
                  shortDescription:
                    "The best one yet!",
                  longDescription: "asd"
                },
                {
                  name: "Le Beauty",
                  shortDescription:
                    "Soaps and other stuff.",
                  longDescription: "asd"
                }
              ]}
              />

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
