import React from "react";

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
