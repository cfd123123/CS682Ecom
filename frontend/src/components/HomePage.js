import React /*,{useState}*/ from 'react';
import {Link, /*useHistory*/} from 'react-router-dom';
// import queryString from 'query-string';
import Recommended from './Recommend/Recommended.js';
// import SideBar from './SideBar.js';
//import Recommend from './Recommend.js';
import './HomePage.css';
// import SidebarIcon from './img/side-bar-icon.png'
// import SearchIcon from './img/search-icon.png';
import Hydrocal from './img/hydrocal.jpg';
// import EmptyProduct from './img/empty-product-icon.png';


const HomePage = () => {
  //const [leftSideBar, setLeftSideBar]=useState(false);
  // const [searchContent, setSearchContent] =useState('');
  // const [toggleLogin,setToggleLogin] = useState(false);
  // const history = useHistory();

  // const accountLogin = () =>{
  //   setToggleLogin(!toggleLogin);
  // }

  // const signIn = ()=>{
  //   sessionStorage.getItem('username') && sessionStorage.getItem('password') ? alert('already login') : history.push('/login')
  //
  //   };
  //   const cartCheck = () =>{
  //       history.push('/cart')
  //   }
    /*
    const toggleLeftSidebar =()=>{
        setLeftSideBar(!leftSideBar);
    };
    */


  // const toggleSearchContent =(event)=>{
  //   setSearchContent(event.target.value)
  // };

  // const searchContentPara = queryString.stringify(
  //     {
  //       content: searchContent
  //     }
  // )


    // const handleKeyPress = (event) =>{
    //     if(event.key === 'Enter'){
    //         history.push(`/Result?${searchContentPara}`)
    //     }
    // }

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
            <div className='homepage__item--cate'>
           <Recommended autoplay={6000} recommendedProducts={
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
           </div>
           <div className='homepage__item--cate'>
           <Recommended autoplay={6000} recommendedProducts={
              [
                {
                  name: "Coca Cola",
                  shortDescription:
                    "Your favourite soft drink.",
                  longDescription: "asd"
                },
                {
                  name: "Pens",
                  shortDescription:
                    "More permanent than pencils",
                  longDescription: "asd"
                },
                {
                  name: "Bags",
                  shortDescription:
                    "Put your valuables in here!",
                  longDescription: "asd"
                }
              ]}
              />
           </div>

           <div className='homepage__item--cate'>
           <Recommended autoplay={6000} recommendedProducts={
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
           </div>

           <div className='homepage__item--cate'>
           <Recommended autoplay={6000} recommendedProducts={
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
           </div>
            </div>
              {/* <Recommend isHomepage={true}/> */}
            </div>
            <div className = 'black_margin' />

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
        </div>
      </div>
  )
}

export default HomePage
