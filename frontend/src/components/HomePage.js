import React from 'reactn';
import Recommended from './Recommend/Recommended.js';
import './HomePage.css';

const HomePage = () => {
  return (
      <div className =''>
        <div className ='homepage__container'>
          <div className='homepage__content'>
            <div className='homepage__items-part'>
              <div className='homepage__item--cate'>
                <Recommended autoplay={6000} recommendedProducts={[
                    {
                      name: "Salad Bar",
                      shortDescription: "Best Salad Bar in the WORLD!",
                      longDescription: "asd"
                    },{
                      name: "SAMSUNG 123X",
                      shortDescription: "The best one yet!",
                      longDescription: "asd"
                    },{
                      name: "Le Beauty",
                      shortDescription: "Soaps and other stuff.",
                      longDescription: "asd"
                    }
                ]} />
              </div>
              <div className='homepage__item--cate'>
                <Recommended autoplay={6000} recommendedProducts={[
                    {
                      name: "Coca Cola",
                      shortDescription: "Your favourite soft drink.",
                      longDescription: "asd"
                    },{
                      name: "Pens",
                      shortDescription: "More permanent than pencils",
                      longDescription: "asd"
                    },{
                      name: "Bags",
                      shortDescription: "Put your valuables in here!",
                      longDescription: "asd"
                    }
                ]} />
              </div>
              <div className='homepage__item--cate'>
                <Recommended autoplay={6000} recommendedProducts={[
                    {
                      name: "Salad Bar",
                      shortDescription: "Best Salad Bar in the WORLD!",
                      longDescription: "asd"
                    },{
                      name: "SAMSUNG 123X",
                      shortDescription: "The best one yet!",
                      longDescription: "asd"
                    },{
                      name: "Le Beauty",
                      shortDescription: "Soaps and other stuff.",
                      longDescription: "asd"
                    }
                ]} />
              </div>
              <div className='homepage__item--cate'>
                <Recommended autoplay={6000} recommendedProducts={[
                    {
                      name: "Salad Bar",
                      shortDescription: "Best Salad Bar in the WORLD!",
                      longDescription: "asd"
                    },{
                      name: "SAMSUNG 123X",
                      shortDescription: "The best one yet!",
                      longDescription: "asd"
                    },{
                      name: "Le Beauty",
                      shortDescription: "Soaps and other stuff.",
                      longDescription: "asd"
                    }
                ]} />
              </div>
            </div>
            {/* <Recommend isHomepage={true}/> */}
          </div>
          <div className = 'black_margin' />
          <Recommended recommendedProducts={[
              {
                name: "Salad Bar",
                shortDescription: "Best Salad Bar in the WORLD!",
                longDescription: "asd"
              },{
                name: "SAMSUNG 123X",
                shortDescription: "The best one yet!",
                longDescription: "asd"
              },{
                name: "Le Beauty",
                shortDescription: "Soaps and other stuff.",
                longDescription: "asd"
              }
          ]} />
        </div>
      </div>
  )
};
export default HomePage
