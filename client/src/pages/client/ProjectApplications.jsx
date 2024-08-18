import React, { useEffect, useState } from 'react'
import '../../styles/client/ClientApplications.css'
import axios from 'axios';

const ProjectApplications = () => {

  const [applications, setApplications] = useState([]);
  const [displayApplications, setDisplayApplications] = useState([]);

  const [projectTitles, setProjectTitles] = useState([]);

  useEffect(()=>{
    fetchApplications();
  },[])

  const fetchApplications = async() =>{
    await axios.get("http://localhost:6001/fetch-applications").then(
      (response)=>{
        setApplications(response.data.filter((application)=> application.clientId === localStorage.getItem('userId')));
        setDisplayApplications(response.data.filter((application)=> application.clientId === localStorage.getItem('userId')).reverse());

      }
    ).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    if(applications.length > 0){
      applications.map((application)=> {projectTitles.includes(application.title) ? setProjectTitles([...projectTitles]) :setProjectTitles([...projectTitles, application.title])});
    }
  },[applications])

  useEffect(()=>{
    if(projectTitles.length > 0){
      projectTitles.filter((title)=> !projectTitles.includes(title));
    }
  },[projectTitles])

  const handleApprove = async(id)=>{
    await axios.get(`http://localhost:6001/approve-application/${id}`).then(
      (response)=>{
        alert("Application approved");
        fetchApplications();
      }
    ).catch((err)=>{
      alert("Operation failed!!");
    })
  }

  const handleReject = async(id)=>{
    await axios.get(`http://localhost:6001/reject-application/${id}`).then(
      (response)=>{
        alert("Application rejected!!");
        fetchApplications();
      }
    ).catch((err)=>{
      alert("Operation failed!!");
    })
  }


  const [projectFilter, setProjectFilter] = useState('');


  const handleFilterChange = (value) =>{
    if(value === ''){
        setDisplayApplications(applications.reverse());
    }else{
      setDisplayApplications(applications.filter((application)=>application.title === value).reverse())
    }
  }


  return (
    <div className="client-applications-page">
    
    {projectTitles ?
      <span>
          <h3>Applications</h3>

          <select className='form-control' onChange={(e)=> handleFilterChange(e.target.value)}>
            <option value="">All Projects</option>
            {projectTitles.map((title)=>(
             <option key={title} value={title}>{title}</option>
            ))}
          </select>

      </span>
    :""}

    <div className="client-applications-body">


        {displayApplications.map((application)=>(

            <div className="client-application" key={application._id}>

                <div className="client-application-body">

                    <div className="client-application-half">

                          <h4>{application.title}</h4>
                          <p>{application.description}</p>
                          <span>
                            <h5>Skills</h5>
                            <div className="application-skills">
                              {application.requiredSkills.map((skill)=>(
                                <p key={skill}>{skill}</p>
                              ))}
                            </div>
                          </span>
                          <h6>Budget - &#8377; {application.budget}</h6>

                    </div>

                    <div className="vertical-line"></div>

                    <div className="client-application-half"> 

                        <span>
                          <h5>Proposal</h5>
                          <p>{application.proposal}</p>
                        </span>
                        <span>
                            <h5>Skills</h5>
                            <div className="application-skills">
                            {application.freelancerSkills.map((skill)=>(
                                <p key={skill} >{skill}</p>
                              ))}
                            </div>
                        </span>
                        <h6>Proposed Budget - &#8377; {application.bidAmount}</h6>
                        <div className="approve-btns">
                          {application.status === 'Pending' ?
                          <>
                              <button className="btn btn-success" onClick={()=> handleApprove(application._id)} >Approve</button>
                              <button className="btn btn-danger" onClick={()=> handleReject(application._id)} >Decline</button>
                          </>
                          :
                            <h6>Status: <b>{application.status}</b></h6>    
                          }
                        </div>
                    </div>

                </div>
                  <hr />
            </div>
        ))}

    </div>

  </div>
  )
}

export default ProjectApplications