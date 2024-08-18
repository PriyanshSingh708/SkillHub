import React, { useEffect, useState } from 'react'
import '../../styles/freelancer/MyApplications.css'
import axios from 'axios'


const MyApplications = () => {

  const [applications, setApplications] = useState([]);

  useEffect(()=>{
    fetchApplications();
  },[])

  const fetchApplications = async() =>{
    await axios.get("http://localhost:6001/fetch-applications").then(
      (response)=>{
        setApplications(response.data.reverse());
        console.log(response.data);
      }
    ).catch((err)=>{
      console.log(err);
    })
  }


  return (
    <div className="user-applications-page">
      
      <h3>My Applications</h3>

      <div className="user-applications-body">

        {applications.filter((application)=> application.freelancerId === localStorage.getItem('userId')).map((application)=>(

            <div className="user-application" key={application._id}>

                <div className="user-application-body">

                    <div className="user-application-half">

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

                    <div className="user-application-half"> 

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
                        <h6>Status: <b>{application.status}</b></h6>
                    </div>

                </div>
                  <hr />
            </div>
        )) }


      </div>

    </div>
  )
}

export default MyApplications