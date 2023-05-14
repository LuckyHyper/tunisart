import axios from 'axios';
import React, { useEffect, useState } from 'react';
import x_icon from '../assets/X-icon.png';
import Swal from 'sweetalert2';
import axiosInstance from '../interceptors/axiosInstance';

function PosteForm(props) {
  const [formData, setFormData] = useState();
  useEffect(() => {
    axios.get(`/api/poste/${props.index}`).then((res) => {
      if (res.status === 201) {
        console.log(res.data);
        setFormData(res.data);
      }
    });
  }, [props.index]);

  const applyHandler = async () => {
    await axiosInstance
      .post(`/api/poste/condidate?id=${props.index}`)
      .then((res) => {
        if (res.status === 200)
          Swal.fire({
            icon: 'success',
            title: 'Applied Successfully',
          });
        if (res.status === 206)
          Swal.fire({
            icon: 'info',
            title: 'Already Applied',
          });
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'User does not exist!',
            text: 'Login first',
          });
        }
      });
  };

  return (
    <div className="poste-form">
      <div className="poste-form-box">
        <div className="row py-2 head-box">
          <div className="close">
            <img
              src={x_icon}
              alt="x"
              width="40px"
              height="40px"
              className="x-icon p-2"
              onClick={() => props.setForm({ ...props.form, value: false })}
            />
          </div>
          <div className="col-5 ">
            <div className="detail-box">
              <h4>Poste Details</h4>
              <h6>Work Schedule</h6>
              <p className="ml-2">{formData && formData.work_schedule}</p>
              <h6>Address</h6>
              <p className="ml-2 mb-0">{formData && formData.address}</p>
            </div>
          </div>
          <div className="col-7 applie-section">
            <h2 className="text-center">{formData && formData.title}</h2>
            <button
              className="btn  w-75 mt-4"
              style={{ backgroundColor: '#0e96f1', color: '#ffffff' }}
              onClick={applyHandler}
            >
              Apply
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col description">
            <h4 className="mt-2">Job description</h4>
            <p>{formData && formData.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4>Qualification</h4>
            <table className="table table-bordered qualification-box">
              <tbody>
                <tr>
                  <td>
                    <p className="border-title">Vacant Postes</p>
                    <p className="border-subtitle">
                      {formData && formData.job_vacancy}
                    </p>
                  </td>
                  <td>
                    <p className="border-title">Contract Type</p>
                    <p className="border-subtitle">
                      {formData && formData.contract_type}
                    </p>
                  </td>
                  <td>
                    <p className="border-title">Experience</p>
                    <p className="border-subtitle">
                      {formData && formData.experience}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="border-title">Study level</p>
                    <p className="border-subtitle">
                      {formData && formData.level_of_study}
                    </p>
                  </td>
                  <td>
                    <p className="border-title">Languages</p>
                    <p className="border-subtitle">
                      {formData && formData.language_requirement}
                    </p>
                  </td>
                  <td>
                    <p className="border-title">Genre</p>
                    <p className="border-subtitle">
                      {formData && formData.genre}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosteForm;
