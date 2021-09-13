import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise=(props)=> {
    const[user,setUser]= useState(
        {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
          }
    );
    const userInput= useRef("");
    const users=user.users;

    useEffect(() => {
        axios.get('/exercises/'+props.match.params.id)
      .then(response => {
        setUser({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
          
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

        axios.get('/users/')
  .then(response => {
    if (response.data.length > 0) {
      setUser({ 
        users: response.data.map(user => user.username)
      });
    }
  })
  .catch((error) => {
    console.log(error);
  })
      },[])

   const onChangeUsername=(e)=> {
       setUser({...user,
        username: e.target.value});
      };

      const onChangeDescription=(e)=> {
        setUser({...user,
            description: e.target.value});
       };

       const onChangeDuration=(e)=> {
        setUser({...user,
            duration: e.target.value});
       };

       const onChangeDate=(date)=> {
        setUser({...user,
            date:date});
       };

      const onSubmit=(e) =>{
        e.preventDefault();
        const exercise = {
          username: user.username,
          description: user.description,
          duration: user.duration,
          date: user.date
        };
        console.log(exercise);

        axios.post('/exercises/update/'+props.match.params.id, exercise)
        .then(res => console.log(res.data));

      
      window.location = '/';
      };

    
  

    return (
        <div>
             <h3>Edit Exercise Log</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select 
            ref={userInput}
               
                className="form-control"
                value={user.username}
                onChange={onChangeUsername}>
                
                    <option key={user.username} value={user.username}>{user.username}</option>
                    {/* users.map((user)=> {
            return <option 
              key={user}
              value={user}>
              {user}
              </option>;
          }) */}
      
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={user.description}
                onChange={onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={user.duration}
                onChange={onChangeDuration}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
              key={user.date}
                selected={user.date}
                onChange={onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit"
             value="Edit Exercise Log" 
             className="btn btn-primary" />
          </div>
        </form>
        </div>
    
    )
}

export default EditExercise
