import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../../styles/client/newProject.css'


const NewProject = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState(0);
    const [skills, setSkills] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async() =>{
      await axios.post("http://localhost:6001/new-project", {title, description, budget, skills, clientId: localStorage.getItem('userId'),  clientName: localStorage.getItem('username'),  clientEmail: localStorage.getItem('email')}).then(
        (response)=>{
            alert("new project added!!");
            setTitle('');
            setDescription('');
            setBudget(0);
            setSkills('');
            navigate('/client');
        }
      ).catch((err)=>{
        alert("operation failed!!");
      })
    }

  return (
    <div className="new-project-page">

          <h3>Post new project</h3>

          <div className="new-project-form">

              <div className="form-floating">
                <input type="text" className="form-control mb-3" id="floatingPassword" placeholder="Password" onChange={(e)=>setTitle(e.target.value)} />
                <label htmlFor="floatingPassword">Project title</label>
              </div>

              <div className="form-floating">
                <textarea type="text" className="form-control mb-3" id="floatingPassword" placeholder="Password"  onChange={(e)=>setDescription(e.target.value)}/>
                <label htmlFor="floatingPassword">Description</label>
              </div>

              <span>
                <div className="form-floating">
                  <input type="number" className="form-control mb-3" id="floatingPassword" placeholder="Password" onChange={(e)=>setBudget(e.target.value)} />
                  <label htmlFor="floatingPassword">Budget (in &#8377;)</label>
                </div>

                <div className="form-floating">
                  <input type="text" className="form-control mb-3" id="floatingPassword" placeholder="Password" onChange={(e)=>setSkills(e.target.value)} />
                  <label htmlFor="floatingPassword">Required skills (seperate each with ,)</label>
                </div>
              </span>

              <button className='btn' onClick={handleSubmit} >Submit</button>

          </div>

    </div>
  )
}

export default NewProject