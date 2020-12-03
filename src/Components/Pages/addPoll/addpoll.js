import React, { useState } from "react";
import "./addpoll.css";
import axios from "axios"
import { connect } from "react-redux";
import proptypes from "prop-types";

function AddPoll(props){

    const [question,setQuestion] = useState('');
    const [inputList, setInputList] = useState([{ input:''},{input:''}]);
  const[sdate,setStartdate] = useState( formatDate(new Date()));
  const[edate,setEnddate] = useState( formatDate(new Date()));
// console.log(props);
function formatDate(date) {
  var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}


 // handle input change
const handleChange = (e, index) => {
    const {value } = e.target;
    console.log(index);
    const list = [...inputList];
    list[index].input = value;
    setInputList(list);
  };
   //questionUPdate
   const questionUpdate = (e)=>{
     setQuestion(e.target.value)
   }
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
   
  // handle click event of the Add button
  const handleAddClick = () => {
    //console.log(inputList.length);
    if(inputList.length==4)
    {
      alert('options limit is 4');
      return ;
    }
    setInputList([...inputList, {input:''}]);
  };
  // submit
  const Submit =(e)=>{
    e.preventDefault();
    var formdata = new FormData();
    // formdata.append('author',props.user._id);
    formdata.append("poll_name", question);
    formdata.append('sdate',sdate);
    formdata.append('edate',edate);
   let sz=2;
    inputList.map((x,i)=>{
      formdata.append('option_'+i+1,x.input);
      sz=i;
    })
    for(sz;sz<3;sz++)
    {
      formdata.append('option_'+(sz+1),null);
    }

  //   for (var value of formdata.values()) {
  //     console.log(value); 
  //  }
    var config = {
      method: "post",
      url: "localhost:8000/api/v1/poll/create/"+props.user._id ,
      headers: { "Content-Type": "multipart/form-data" },

      data: formdata,
  };
  axios(config)
      .then((response) => {
        console.log(response);
          if (response.status === 200) {
              console.log('poll posted');
          }
          console.log('poll posted');
          console.log(response);
      })
      .catch((error) => {
          if (error.response.status === 401) {
              console.log('poll not uploaded');
          }
      });
  }
  return (
    <form onSubmit={Submit}   >
         <div className="Poll">
        <div className="addPoll">
          <div className="addpoll-box">
            <div className="header">
              <div>
                <label>question</label>
                <br></br>
                <input onChange={questionUpdate} ></input> 
                <br></br>
              </div>
     
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <label>
              option {i+1}
            </label>
            <br></br>
            <input
              // value=''
               value={inputList[i].input}
              onChange={e => handleChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 2 &&  <button    onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add option</button>}
            </div>
          </div>
        );
         })}
          <div className="formdate">
                                    <div>
                                        <div>
                                            <label htmlFor="date">StartDate</label>
                                        </div>
                                        <input
                                            type="date"
                                           value={sdate}
                                            placeholder="The name"
                                          onChange={(e)=>{setStartdate(e.target.value)}}
                                            name="sdate"
                                            id="date"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="date">endDate</label>
                                        </div>
                                        <input
                                            type="date"
                                            value={edate}
                                            placeholder="The name"
                                            onChange={(e)=>{setEnddate(e.target.value)}}
                                            name="edate"
                                            id="date"
                                            required
                                        />
                                    </div>
                                </div>
                  <div className="Time">
                                    <div>
                                        <div>
                                            <label htmlFor="duration">StartTime</label>
                                        </div>
                                        <input
                                            type="time"
                                            name="stime"                                            
                                            style={{ marginRight: "5px" }}
                                            // value  
                                            // onChange = {}
                                            placeholder="The name"
                                            id="duration"
                                            required
                                        />
                                    </div>
                                    <span style={{ width: "3px" }} />
                                    <div>
                                        <div>
                                            <label htmlFor="duration">EndTime</label>
                                        </div>
                                        <input
                                            type="time"
                                            name="etime"
                                            placeholder="The name"
                                            // value
                                            // onChange = {}
                                            id="time"
                                            required
                                        
                                        />
                                    </div>
                                </div>
      </div>
      <div className="submitbutton">
            <input type="submit" value="submit" />
            </div>
          </div>
          </div>
          </div>
        
    </form>
 
  );
}

const mapstatetoprops = (state) => ({
  user: state.auth.user
});

export default connect(mapstatetoprops)(AddPoll);