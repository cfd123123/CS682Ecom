import React from "reactn";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./styles.css";

/**
 * Slide widget for displaying products and their info.
 * An optional autoplay timer can be set, which cycle through different products.
 */

class Recommended extends React.PureComponent {
  /**
   * Constructs the component using the following props
   * @param props {object} contents:<br>
   * >  autoplay - autoplay interval in milliseconds<br>
   * >  duration - aniimation duration in milliseconds<br>
   * >  recommendedProducts - an array of products to showcase in the Slider animation
   */
  constructor(props){
    super(props);
    this.createRecommended = this.createRecommended.bind(this);
  }

  /**
   * Returns the value of the autoplay prop.
   */
  get autoplay() {
    const {autoplay} = this.props;
    return autoplay;
  }

  /**
   * Returns the value of the duration prop, or 2000 if not present.
   * @returns {*}
   */
  get duration() {
    const {duration} = this.props;
    return duration ? duration : 2000;
  }

  /**
   * Constructs the Slider animation ReactElement from the given content.
   * @param content - a list of recommended products
   * @returns {*} a Slider animation ReactElement
   */
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

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
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

    const {recommendedProducts} = this.props;

    let content = recommendedProducts.map((x) => {
        const container = {};
        container.name = x.name;
        container.shortDescription = x.shortDescription;
        container.button = buttonOptions[Math.floor(Math.random()*buttonOptions.length)];
        container.userProfile = userPics[Math.floor(Math.random()*userPics.length)];
        container.image = productPics[Math.floor(Math.random()*productPics.length)];
        return container;
    });

    return (this.createRecommended(content));
  }
}
export default Recommended;