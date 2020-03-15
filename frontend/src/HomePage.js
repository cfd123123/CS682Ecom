import React ,{useState}from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

import './HomePage.css';
import SidebarIcon from './img/side-bar-icon.png'
import SearchIcon from './img/search-icon.png';

const HomePage = () => {
    const [leftSideBar, setLeftSideBar]=useState(false);
    const [searchContent, setSearchContent] =useState('');

    const toggleLeftSidebar =()=>{
        setLeftSideBar(!leftSideBar);
    };
    console.log(searchContent)

    const toggleSearchContent =(event)=>{
        setSearchContent(event.target.value)
    };

    const searchContentPara = queryString.stringify(
        {
            content: searchContent
        }
    )

    return (
        <div className ='container'>
        {
            leftSideBar && (
                <div className ='homepage__side-bar'></div>
            )

        }
        <div className ='homepage__container'>
            <div className='homepage__header'> 
                <div className ='homepage__left-part'>
                    <img src={SidebarIcon} className = 'homepage__icon' onClick={toggleLeftSidebar}/>
                  <b className = 'homepage__left-part--font'>Black</b> 
                </div>
                <div className ='homepage__search--container'>
                    <input type='text' className  ='homepage__search' placeholder="search specific item" onChange ={toggleSearchContent}/>
                    <Link to= {`/Result?${searchContentPara}`} className="search_btn">
                        <img src={SearchIcon} className = 'homepage__search--icon'/>
                    </Link>
                </div>
                <ul className ='homepage__right-part'>
                    <li>
                        My&nbsp;Account
                    </li>

                    <li>
                        Orders
                    </li>

                    <li>
                        Cart
                    </li>
                </ul>
            </div>

        </div>
        </div>
    )
}

export default HomePage
