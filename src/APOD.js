import axios from "axios";
import React from "react";
import ImageCard from "./ImageCard";

class APOD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetch: false,
      error: false,
      data: {}
      // data: {
      //   copyright: "Jarmo RuuthTelescope LiveHeaven's Mirror Observatory",
      //   date: "2022-01-17",
      //   explanation:
      //     "Sometimes the dark dust of interstellar space has an angular elegance.  Such is the case toward the far-south constellation of Chamaeleon. Normally too faint to see, dark dust is best known for blocking visible light from stars and galaxies behind it. In this four-hour exposure, however, the dust is seen mostly in light of its own, with its strong red and near-infrared colors giving creating a brown hue. Contrastingly blue, the bright star Beta Chamaeleontis is visible just to the right of center, with the dust that surrounds it preferentially reflecting blue light from its primarily blue-white color.  All of the pictured stars and dust occur in our own Milky Way Galaxy with -- but one notable exception: the white spot just below Beta Chamaeleontis is the galaxy IC 3104 which lies far in the distance.  Interstellar dust is mostly created in the cool atmospheres of giant stars and dispersed into space by stellar light, stellar winds, and stellar explosions such as supernovas.",
      //   hdurl:
      //     "https://apod.nasa.gov/apod/image/2201/DarkNebulaVd_HmoRuuth_4096.jpg",
      //   media_type: "image",
      //   service_version: "v1",
      //   title: "Chamaeleon Dark Nebulas",
      //   url:
      //     "https://apod.nasa.gov/apod/image/2201/DarkNebulaVd_HmoRuuth_960.jpg"
      // }
    };
  }
  async componentDidMount() {
    const response = await axios.get(
      "https://api.nasa.gov/planetary/apod?api_key=wPSajhfKy9y1xg7vQDImlWxk0Mh2vMnz0nsgqSIo"
    );
    if (response.status !== 200) {
      this.setState({ error: true, fetch: true });
      return;
    }
    const { data } = response;
    console.log(data);
    this.setState({ fetch: true, data: data });
    this.setState({ fetch: true });
  }
  render() {
    if (!this.state.fetch) return <div>Loading...</div>;
    return (
      <div className="apod">
        <h3>Astronomy Picture of the day</h3>
        <ImageCard error={this.state.error} data={this.state.data} />
      </div>
    );
  }
}
export default APOD;
