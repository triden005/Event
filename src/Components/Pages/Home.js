import React from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
class Home extends React.Component {
    state = {};

    handelchange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return <div>Home Route</div>;
    }
}

export default Home;
