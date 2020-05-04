import React from "reactn";
// import { render } from "react-dom";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./styles.css";

export default class Recommended extends React.Component {
  constructor(props){
    super(props);
    this.createRecommended = this.createRecommended.bind(this);
  }

  get autoplay() {
    return (
      this.props.autoplay !== undefined
        ?  this.props.autoplay : undefined
    )
  }

  get duration() {
    return (
      this.props.duration !== undefined
        ?  this.props.duration : 2000
    )
  }

  createRecommended(content) {
    let autoplay = this.autoplay;
    let duration = this.duration;

    return (
        <div>
          <div className="wrapper" />
          <Slider className="slider-wrapper" autoplay={autoplay} duration={duration}>
            {content.map((item, index) => (
                <div key={index} className="slider-content"
                     style={{ background: `url('${item.image}') no-repeat center center` }} >
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
      "https://si.wsj.net/public/resources/images/B3-DU938_COSMET_P_20190425155544.jpg",
      "https://cdn.dashhudson.com/media/640/1572361963.115447556367.jpeg",
      "https://cdn.pixabay.com/photo/2019/07/13/13/42/watch-4334815_960_720.jpg",
      "https://mackiebiernacki.com/wp-content/uploads/2017/10/HARRINGTON_2616E.jpg",
      "https://media.gucci.com/content/DarkGray_ProductPush_Standard_700x700/1573729203/ProductPush_443497HVKEG9772_001_Light.jpg"
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