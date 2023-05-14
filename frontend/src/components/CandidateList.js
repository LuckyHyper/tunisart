import React, { useEffect, useState } from 'react';
import x_icon from '../assets/X-icon.png';
import axiosInstance from '../interceptors/axiosInstance';
import doc_icon from '../assets/document-icon.png';
import no_doc_icon from '../assets/no-document-icon.png';

function CandidateList(props) {
  const [candidates, setCandidates] = useState();
  useEffect(() => {
    axiosInstance.get(`/api/poste/condidates/${props.id}`).then((res) => {
      if (res.status === 200) {
        console.log(res.data[0].candidates);
        setCandidates(res.data[0].candidates);
      }
    });
  }, [props.id]);
  return (
    <div className="candidate-list">
      <div className="list-box">
        <div className="close">
          <img
            src={x_icon}
            alt="x"
            width="40px"
            height="40px"
            className="x-icon p-2"
            onClick={() => props.setList({ ...props.list, value: false })}
          />
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Candidates
        </h2>
        <div class="my-custom-scrollbar">
          <table className="table" id="candidate-list-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">Email</th>
                <th scope="col">Resume </th>
              </tr>
            </thead>
            <tbody>
              {candidates &&
                candidates.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        {!item.CV ? (
                          <img
                            src={no_doc_icon}
                            alt=""
                            width="40px"
                            height="40px"
                          />
                        ) : (
                          <a
                            href={
                              process.env.REACT_APP_API_URL +
                              'public/' +
                              item.CV.split('cv/')[1]
                            }
                            target="_blanc"
                          >
                            <img
                              src={doc_icon}
                              alt=""
                              width="40px"
                              height="40px"
                            />
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CandidateList;
