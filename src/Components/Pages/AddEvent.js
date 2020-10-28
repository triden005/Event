import React from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import "./addevent.css";
class AddEvent extends React.Component {
    state = {};
    handelchange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
    };
    onFileChange = (e) => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
        });
    };
    render() {
        return (
            <div className="div1-addevent">
                <div className="addevent">
                    <h1>Add Event</h1>
                    <p>Make memories with Events...</p>
                    <div className="container">
                        <form onSubmit={null} className="left">
                            <div>
                                <label for="eventname">Eventname</label>
                            </div>
                            <input type="text" value={this.state.eventname} placeholder="The name" onChange={this.handelchange} name="eventname" id="eventname" required />
                            <div>
                                <label for="date">date</label>
                            </div>
                            <input type="date" value={this.state.date} placeholder="The name" onChange={this.handelchange} name="date" id="date" required />
                            <div>
                                <label for="duration">Duration</label>
                            </div>
                            <div style={{ display: "flex" }}>
                                <input type="time" value={this.state.stime} style={{ marginRight: "5px" }} placeholder="The name" onChange={this.handelchange} name="stime" id="duration" required />
                                <input type="time" value={this.state.etime} placeholder="The name" onChange={this.handelchange} name="etime" id="time" required />
                            </div>
                            <div>
                                <label for="discription">Discription</label>
                            </div>
                            <textarea type="text" row="5" column="50" name="discription" id="discription" value={this.state.description} onChange={this.handelchange}></textarea>
                            <div>
                                <input type="file" onChange={this.onFileChange} />
                                <input type="submit" onClick={this.fileupload} value="Upload " style={{ marginRight: "10px" }} />
                                <input type="submit" value="Add" />
                            </div>
                            <div></div>
                        </form>
                    </div>
                </div>
                <div className="addevent right">
                    <div className="center">
                        <img src={this.state.file} />
                    </div>
                    <div>
                        <h3>{this.state.eventname}</h3>
                    </div>
                    {this.state.stime ? `Duration :${this.state.stime}` : null} {this.state.etime ? ` - ${this.state.etime}` : null}
                    {this.state.stime ? <br /> : null}
                    {this.state.date ? `On :${this.state.date}` : null}
                    {this.state.date ? <br /> : null}
                    <Markdown plugins={[gfm]} source={this.state.discription} />
                </div>
            </div>
        );
    }
}

export default AddEvent;
