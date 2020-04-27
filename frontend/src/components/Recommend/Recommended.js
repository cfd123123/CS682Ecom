import React from "react";
import { render } from "react-dom";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./styles.css";

class Recommended extends React.Component {
  constructor(props){
    super(props);

    this.createRecommended = this.createRecommended.bind(this);
  }

  createRecommended(content) {
    return (
      <div>
        <div className="wrapper">

        </div>
        <Slider className="slider-wrapper">
          {content.map((item, index) => (
            <div
              key={index}
              className="slider-content"
              style={{ background: `url('${item.image}') no-repeat center center` }}
            >
              <div className="inner">
                <h1>{item.name}</h1>
                <p>{item.shortDescription}</p>
                <button>{item.button}</button>
              </div>
              <section>
                <img src={item.userProfile} alt={item.user} />
                <span>
                  <strong>People who have bought this</strong>
                </span>
              </section>
            </div>
          ))}
        </Slider>
      </div>
    );
  }


  render () {
    const userPics = [
      "https://i.imgur.com/JSW6mEk.png",
      "https://i.imgur.com/0Clfnu7.png",
      "https://i.imgur.com/4KeKvtH.png",
    ];

    const productPics = [
      "https://images.squarespace-cdn.com/content/v1/54a165c5e4b00c1193b290e9/1420730405327-AX4NR0C2ATGE6BTKQ6P7/ke17ZwdGBToddI8pDm48kPqQfq0L3n3wpHIsRapTfg8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKczo5Zn4xktlpMsMj-QlHXeMfNK6GwvtVkYEWiR8XAPyD3GfLCe_DXOSC_YcAacWL_/WisdomKitchenPersonalChef_WebRes_049.jpg",
      "https://images.samsung.com/is/image/samsung/p5/ph/smartphones/galaxy_a50_blue.png?$ORIGIN_PNG$",
      "https://si.wsj.net/public/resources/images/B3-DU938_COSMET_P_20190425155544.jpg"
    ];

    const buttonOptions = [
      "Buy now",
      "View Details",
      "View Offers"
    ];

    const rcProd = this.props.recommendedProducts;

    let content = rcProd.map((x) => {
        const container = {};
        container.name = x.name;
        container.shortDescription = x.shortDescription;
        container.button = buttonOptions[Math.floor(Math.random()*buttonOptions.length)];
        container.userProfile = userPics[Math.floor(Math.random()*userPics.length)];
        container.image = productPics[Math.floor(Math.random()*productPics.length)];
        return container;
    });
    return (
      this.createRecommended(content)
    );
  }
}

export default Recommended;
