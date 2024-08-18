import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../../styles/freelancer/AllProjects.css' 


const AdminProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [displayprojects, setDisplayProjects] = useState([]);

  const [allSkills, setAllSkills] = useState([]); 

  useEffect(()=>{
    fetchProjects();
  },[])

  const fetchProjects = async()=>{
    await axios.get('http://localhost:6001/fetch-projects').then(
      (response)=>{
          setProjects(response.data);
          setDisplayProjects(response.data.reverse());

          response.data.map((project)=>{
            project.skills.map((skill)=>{
              if(!allSkills.includes(skill)){
                allSkills.push(skill); 
              }
            })
          })
      }
    ).catch((err)=>{
      console.log(err);
      fetchProjects();
    })
  }


  const [categoryFilter, setCategoryFilter] = useState([]);

  const handleCategoryCheckBox = (e) =>{
    const value = e.target.value;
    if(e.target.checked){
      setCategoryFilter([...categoryFilter, value]);
    }else{
        setCategoryFilter(categoryFilter.filter(size=> size !== value));
    }
  }

  useEffect(()=>{


    if (categoryFilter.length > 0){
        setDisplayProjects(projects.filter(project => categoryFilter.every(skill => project.skills.includes(skill))).reverse());
    }else{
        setDisplayProjects(projects.reverse());
    }


}, [categoryFilter])


  return (
    <div className="all-projects-page">

      <div className="project-filters">

        <h3>Filters</h3>
        <hr />

        <div className="filters">
          <h5>Skills</h5>

          {allSkills.length > 0 ? 
          
              <div className="filter-options">

                  {allSkills.map((skill)=>(
                    <div className="form-check" key={skill}>
                      <input className="form-check-input" type="checkbox" value={skill} id="flexCheckDefault" onChange={handleCategoryCheckBox} />
                      <label className="form-check-label" htmlFor="flexCheckDefault">{skill}</label>
                    </div>
                  ))}

              </div>
          :""}
        </div>

      </div>

      <div className="projects-list">

        <h3>All projects</h3>
        <hr />

        {displayprojects.map((project)=>(

            <div className="listed-project" key={project._id}  >
              <div className='listed-project-head'>
                  <h3>{project.title}</h3>
                  <p>{project.postedDate}</p>
              </div>
              <h5>Budget &#8377; {project.budget}</h5>
              <h5>Client name: {project.clientName}</h5>
              <h5>Client email: {project.clientEmail}</h5>
              <p>{project.description}</p>
              <div className="skills">
                {
                  project.skills.map((skill)=>(
                    <h6 key={skill} >{skill}</h6>
                  ))
                }
              </div>

              <div className="bids-data">
                <p>{project.bids.length} bids</p>
                <h6>&#8377; {project.bids.length > 0 ? project.bidAmounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : 0} (avg bid)</h6>
              </div>
              <h5>Status - {project.status}</h5>
              <hr />
            </div>
        ))}


      </div>

    </div>
  )
}


export default AdminProjects