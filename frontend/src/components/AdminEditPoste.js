import React, { useEffect, useState } from 'react';
import x_icon from '../assets/X-icon.png';
import add_icon from '../assets/add-icon.png';
import document_icon from '../assets/document-icon.png';
import Swal from 'sweetalert2';
import axios from 'axios';

function AdminEditPoste({
  setFormEdit,
  setReload,
  reload,
  form,
  setForm,
  posteId,
}) {
  const [domaine, setDomaine] = useState([]);

  useEffect(() => {
    axios.get(`/api/domaine`).then((res) => {
      setDomaine(res.data);
    });
    axios.get(`/api/poste/${posteId}`).then((res) => {
      if (res.status === 201) {
        setForm(res.data);
      }
    });
  }, [posteId, setForm]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`/api/poste/${posteId}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Post Updated Successfully',
          });
          setReload(reload + 1);
          setFormEdit(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="admin-add-poste">
      <form className="poste-admin-box" onSubmit={handleSubmit}>
        <div className="close">
          <img
            src={x_icon}
            alt="x"
            width="40px"
            height="40px"
            className="x-icon p-2"
            onClick={() => setFormEdit(false)}
          />
        </div>
        <h2>Formulaire</h2>
        <h4 className="mb-0">Detail du poste</h4>
        <div className="row">
          <div className="col-4">
            <div className="detail-box mt-3">
              <label className="mb-1">Profession</label>
              <input
                type="text"
                className="form-control form-input"
                id="exampleInputEmail1"
                name="title"
                value={form.title}
                onChange={handleChange}
              />

              <label className="mt-2 mb-1">Company Email</label>
              <input
                type="text"
                className="form-control form-input"
                id="exampleInputEmail1"
                name="company_email"
                value={form.company_email}
                onChange={handleChange}
              />

              <label className="mt-2 mb-1">Country</label>
              <input
                type="text"
                className="form-control form-input"
                id="exampleInputEmail1"
                name="country"
                value={form.country}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-4 mt-3 d-flex flex-column align-items-center justify-content-center">
            <label className="mb-1">Company Email</label>
            <input
              type="text"
              className="form-control form-input"
              id="exampleInputEmail1"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
            />

            <label className="mt-2 mb-1">domainId</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              name="domaineId"
              value={form.domaineId}
              onChange={(e) => setForm({ ...form, domaineId: e.target.value })}
            >
              <option></option>
              {domaine &&
                domaine.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.domaine_name}
                    </option>
                  );
                })}
            </select>
            <label className="mt-2 mb-1">Address</label>
            <input
              type="text"
              className="form-control form-input"
              id="exampleInputEmail1"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-4 mt-3 d-flex flex-column">
            <label className="mb-1">Logo</label>
            <div id="logo-picture">
              <input
                type="file"
                className="form-input"
                onChange={(e) =>
                  setForm({ ...form, company_logo: e.target.files[0] })
                }
              />
              {form.company_logo ? (
                <img src={document_icon} alt="" width="38px" height="38px" />
              ) : (
                <img
                  src={add_icon}
                  id="add-file"
                  alt=""
                  width="38px"
                  height="38px"
                />
              )}
            </div>

            <label className="mt-1">Job Schedule</label>
            <input
              type="text"
              className="form-control form-input"
              id="exampleInputEmail1"
              name="work_schedule"
              value={form.work_schedule}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col" id="job-description">
            <h4 className="mt-3 w-100">Job Description</h4>
            <textarea
              className="form-control"
              id="poste-description"
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4 className="mt-3 w-100">Qualification</h4>
            <table className="table  qualification-box">
              <tbody>
                <tr>
                  <td>
                    <p className="border-title">Vacant Postes</p>
                    <input
                      type="text"
                      className="form-control form-input"
                      id="exampleInputEmail1"
                      name="job_vacancy"
                      value={form.job_vacancy}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <p className="border-title">Contract Type</p>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      name="contract_type"
                      value={form.contract_type}
                      onChange={handleChange}
                    >
                      <option></option>
                      <option>CDI</option>
                      <option>CDD</option>
                    </select>
                  </td>
                  <td>
                    <p className="border-title">Experience</p>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                    >
                      <option></option>
                      <option>Without Experience</option>
                      <option> {'<'} 2 years Experience</option>
                      <option> Between 2 and 5 years Experience</option>
                      <option>{'>'}5 years Experience</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="border-title">Study level</p>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      name="level_of_study"
                      value={form.level_of_study}
                      onChange={handleChange}
                    >
                      <option></option>
                      <option>BTP</option>
                      <option>BTS</option>
                      <option>Licence (bac+3)</option>
                      <option>bac+5</option>
                    </select>
                  </td>
                  <td>
                    <p className="border-title">Languages</p>
                    <input
                      type="text"
                      className="form-control form-input"
                      id="exampleInputEmail1"
                      name="language_requirement"
                      value={form.language_requirement}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <p className="border-title">Genre</p>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      name="genre"
                      value={form.genre}
                      onChange={handleChange}
                    >
                      <option></option>
                      <option>undifferent</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-dark">
            Edit Poste
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminEditPoste;
