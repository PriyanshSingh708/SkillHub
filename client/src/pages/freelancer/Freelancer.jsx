import React, { useEffect, useState } from 'react'
import '../../styles/freelancer/freelancer.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Freelancer = () => {

  const [isDataUpdateOpen, setIsDataUpdateOpen] = useState(false);

  const navigate = useNavigate();

  const [freelancerData, setFreelancerData] = useState();

  const [skills, setSkills] = useState([]);

  const [description, setDescription] = useState('');

  const [freelancerId, setFreelancerId] = useState('');

  const [updateSkills, setUpdateSkills] = useState('');

  const [updateDescription, setUpdateDescription] = useState('');

  useEffect(()=>{
    fetchUserData(localStorage.getItem('userId'));
  },[])

  const fetchUserData = async(id) =>{
      axios.get(`http://localhost:6001/fetch-freelancer/${id}`).then(
        (response)=>{
          setFreelancerData(response.data);
          if(response.data){
            setFreelancerId(response.data._id);
            setSkills(response.data.skills);
            setDescription(response.data.description);
            setUpdateSkills(response.data.skills);
            setUpdateDescription(response.data.description);
          }
        }
      )
  }

  const updateUserData = async() =>{
    axios.post(`http://localhost:6001/update-freelancer`, {freelancerId, updateSkills: updateSkills, description: updateDescription}).then(
        (response)=>{
          fetchUserData();
          alert("User data updated")
        }
      )
  }


  const [applicationsCount, setApplicationsCount] = useState([]);

  useEffect(()=>{
    fetchApplications();
  },[])

  const fetchApplications = async() =>{
    await axios.get("http://localhost:6001/fetch-applications").then(
      (response)=>{
        setApplicationsCount(response.data.filter((application)=> application.freelancerId === localStorage.getItem('userId')));
        console.log(response.data);
      }
    ).catch((err)=>{
      console.log(err);
    })
  }


  return (
    <>
      {freelancerData ? 
      
          <div className="freelancer-home">

            
              <div className="home-cards">

                <div className="home-card">
                    <h4>Current projects</h4>
                    <p>{freelancerData.currentProjects.length}</p>
                    <button onClick={()=> navigate('/my-projects')} >View projects</button>
                </div>

                <div className="home-card">
                    <h4>Completed projects</h4>
                    <p>{freelancerData.completedProjects.length}</p>
                    <button onClick={()=> navigate('/my-projects')}>View projects</button>
                </div>

                <div className="home-card">
                    <h4>Applications</h4>
                    <p>{applicationsCount.length}</p>
                    <button onClick={()=> navigate('/myApplications')}>View Applications</button>
                </div>

                <div className="home-card">
                    <h4>Funds</h4>
                    <p>Available:  &#8377; {freelancerData.funds}</p>
                    {/* <button>Withdraw</button> */}
                </div>

              </div>


              <div className="freelancer-details">

                { !isDataUpdateOpen ?

                        <div className="freelancer-details-data">

                            <span>
                              <h4>My Skills</h4>
                              <div className="skills">
                              {skills.map((skill)=>(
                                <h5 className='skill' key={skill}>{skill}</h5>
                              ))}
                              {skills.length === 0 ?
                                <p>No skills available</p>
                              :
                              ""}
                              </div>
                            </span>

                            <span>
                              <h4>Description</h4>
                              <p>{description}</p>
                              {description === '' ?
                                <p>please add your description</p>
                              :
                              ""}
                            </span>

                            <button className='btn btn-outline-success' onClick={()=>setIsDataUpdateOpen(true)} >Update</button>

                        </div>
                  
                  :

                      <div className="freelancer-details-update">

                            <span>
                              <label htmlFor="mySkills"><h4>My Skills</h4></label>
                              <input type="text" className='form-control' id='mySkills' placeholder='Enter skills' value={updateSkills} onChange={(e)=> setUpdateSkills(e.target.value)}  />
                            </span>

                            <span>
                              <label htmlFor="description-textarea"><h4>Description</h4></label>
                              <textarea className='form-control' id="description-textarea" placeholder='Enter your description' value={updateDescription} onChange={(e)=> setUpdateDescription(e.target.value)}></textarea>
                            </span>

                            <button className='btn btn-outline-success mt-3' onClick={updateUserData} >Update</button>
                      </div>
                }

                  
              </div>



          </div>
      
      :""}
    </>
  )
}

export default Freelancer