import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
    };
  }
  render() {
    return (
      <form>
        <div>
          <label for="name">Search</label>
          <input type="text" id="name" name="name" />
        </div>
      </form>
    );
  }
}

export default Search;
