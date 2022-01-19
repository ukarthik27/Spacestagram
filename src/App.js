import "./styles.scss";
import APOD from "./APOD";
import { Stars } from "./helpers";
Stars(100, "starscontainer");
export default function App() {
  return (
    <div className="App">
      <div>
        <header>
          <figure>
            <img src="hubble.png" alt="welcome" />
          </figure>
          <h1>Spacestagram</h1>
        </header>
        <main>
          <APOD />
        </main>
      </div>
    </div>
  );
}
