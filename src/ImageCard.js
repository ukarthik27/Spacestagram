import React from "react";
import { debounce } from "./helpers";
// import "./loader.scss";

class ImageCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      collapse: true,
      descHeight: 0,
      imgLoaded: false,
      imgLoadError: false
    };
    this.childRef = React.createRef();
    this.parentRef = React.createRef();
    this.likeWrapper = React.createRef();
    this.imgRef = React.createRef();
    this.curious = "&#129300;";
    this.happy = "&#128515;";
    this.yellowHeart = "&#128155;";
    this.redHeart = "&#128150;";
    this.shareIcon = "&#128640;";
  }

  calculateHeight = () => {
    if (
      this.childRef &&
      this.childRef.current &&
      this.childRef.current.clientHeight > this.state.descHeight
    ) {
      this.setState({ descHeight: this.childRef.current.clientHeight });
    } else {
      console.error("no child ref");
    }
  };

  resizeHandler = () => {
    if (this.props.selected) {
      this.calculateHeight();
    }
    if (!this.state.collapse && this.parentRef && this.parentRef.current)
      this.parentRef.current.style.maxHeight =
        this.state.descHeight + 20 + "px";
  };

  toggleDesc = (e) => {
    e.preventDefault();
    const prevStateCollapse = this.state.collapse;
    this.setState({ collapse: !prevStateCollapse });
    this.parentRef.current.style.maxHeight = prevStateCollapse
      ? this.state.descHeight + 20 + "px"
      : 0;
  };

  toggleLike = (e) => {
    e.preventDefault();
    // console.log("qwer", this.likeWrapper);
    // console.log("qwer", this.likeWrapper.current);
    // console.log("qwer", this.likeWrapper.current.style);
    // // console.log("qwer",this.likeWrapper)
    // this.likeWrapper.current.style.transform = this.state.like
    //   ? "rotate(360deg)"
    //   : "rotate(180deg)";
    this.setState((prevState) => ({
      ...prevState,
      like: !prevState.like
    }));
  };

  componentDidMount() {
    const elem = this.childRef;
    if (elem) setTimeout(this.calculateHeight, 100);
    window.addEventListener("resize", debounce(this.resizeHandler, 250));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", debounce(this.resizeHandler, 250));
  }

  descIcon() {
    return { __html: this.state.collapse ? this.curious : this.happy };
  }
  onShareClick = (event) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Spacestagram",
          url: "https://csb-ydwbd.netlify.app/"
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      console.log("no navigator share");
    }
  };

  imgLoad = (event) => {
    console.log("imageloaded", this.imgRef.current);
    this.imgRef.current.className = "loaded";
    this.setState({ imgLoaded: true });
  };
  imgError = (event) => {
    console.log("imageerror");
    this.imgRef.current.className = "loaderror";
    this.setState({ imgLoaded: true, imgLoadError: true });
  };
  render() {
    const { data } = this.props;
    if (!data) return null;

    return (
      <div className="image_card">
        <figure>
          <img
            src={data.hdurl}
            alt={data.title}
            onLoad={this.imgLoad}
            onError={this.imgError}
            ref={this.imgRef}
            className="loading"
          />
          <figcaption className="image_caption">{data.title}</figcaption>
          <footer className="image_cprt">
            <small>&#169; {data.copyright}</small>
          </footer>
        </figure>
        <div className="image_content" ref={this.parentRef}>
          <p ref={this.childRef}>{data.explanation}</p>
        </div>
        <div className="card_controls">
          <button
            className="image_card__btn"
            onClick={this.toggleDesc}
            dangerouslySetInnerHTML={{
              __html: this.state.collapse ? this.curious : this.happy
            }}
          ></button>
          <button
            className="image_card__btn --like --mask"
            onClick={this.toggleLike}
            dangerouslySetInnerHTML={{
              __html: this.state.like ? this.redHeart : this.yellowHeart
            }}
          >
            {/* <div className="btn_wrapper" ref={this.likeWrapper}>
              <div
                className="btn yellow"
                dangerouslySetInnerHTML={{ __html: this.yellowHeart }}
              />
              <div
                className="btn red"
                dangerouslySetInnerHTML={{ __html: this.redHeart }}
              />
            </div> */}
          </button>
          <button
            className="image_card__btn --share"
            onClick={this.onShareClick}
            dangerouslySetInnerHTML={{ __html: this.shareIcon }}
          />
        </div>
      </div>
    );
  }
}
export default ImageCard;
