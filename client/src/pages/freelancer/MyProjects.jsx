import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../../styles/freelancer/MyProjects.css'

const MyProjects = () => {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(()=>{
    fetchProjects();
  },[])

  const fetchProjects = async()=>{
    await axios.get('http://localhost:6001/fetch-projects').then(
      (response)=>{
        const pros = response.data.filter(pro=> pro.freelancerId === localStorage.getItem('userId'));
        setProjects(pros);
        setDisplayProjects(pros.reverse());
      }
    ).catch((err)=>{
      console.log(err);
      fetchProjects();
    })
  }



const handleFilterChange = (data) =>{
  if(data === ""){
    setDisplayProjects(projects.reverse());
  } else  if(data === "In Progress"){
    setDisplayProjects(projects.filter((project)=> project.status === "Assigned").reverse());
  } else  if(data === "Completed"){
    setDisplayProjects(projects.filter((project)=> project.status === "Completed").reverse());
  }
}



  return (
    <div className="client-projects-page">

      <div className="client-projects-list">
        <div className="client-projects-header">
              <h3>My projects</h3>
                <select className='form-control' placeholder='Project status' onChange={(e)=> handleFilterChange(e.target.value)} >
                  <option value="">Choose project status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

        </div>
        <hr />

        {
          displayProjects.map((project)=>(
            <div className="listed-project" key={project._id} onClick={()=> navigate(`/project/${project._id}`)}>
              <div className='listed-project-head'>
                  <h3>{project.title}</h3>
                  <p>{project.postedDate}</p>
              </div>
              <h5>Budget -  &#8377; {project.budget}</h5>
              <p>{project.description}</p>
    
              <div className="bids-data">
                {/* <p>Applications - {project.applications.length}</p> */}
                <h6>Status - {project.status} </h6>
              </div>
              <hr />
            </div>
          ))
        }
        

      </div>

    </div>
  )
}

export default MyProjects