import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

import Remote from "./remote/Remote";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: new Date()
      });
    }, 3000);
  }

  render() {
    const classForMode = {
      tablet: "tabletClassName",
      mobile: "mobileClassName",
      desktop: "desktopClassName"
    };

    return (
      <div>
        <Remote classForMode={classForMode} />
      </div>
    );
  }
}

export default Index;
