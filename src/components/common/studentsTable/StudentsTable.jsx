import React from 'react';
import './StudentsTable.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';
import StudentsRow from '../studentsRow/StudentsRow';
import SitesDropdown from '../sitesDropdown/SitesDropdown';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState('');
  const [loading, setLoading] = useState(true);

  const GAS_URL =
    'https://script.google.com/macros/s/AKfycbyQX7V9R8g1VEMAww_G8UMW9iTQyewe1CcZi90-SU0YFne3xTg5Qa_40lbqWp2w6Tlu/exec';

  useEffect(() => {
    Promise.all([
      axios.get(GAS_URL + '?type=students'),
      axios.get(GAS_URL + '?type=sites'),
    ])
      .then(([studentsResponse, sitesResponse]) => {
        setStudents(studentsResponse.data);
        setSites(sitesResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="table-container">
      {loading ? (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <SitesDropdown
            sites={sites}
            onSiteSelected={setSelectedSite}
            selectedSite={selectedSite}
          />
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Student Name</Table.HeadCell>
              <Table.HeadCell>Age</Table.HeadCell>
              <Table.HeadCell>Site</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {students
                .filter(
                  (student) => !selectedSite || student.site === selectedSite
                )
                .map((student) => (
                  <StudentsRow student={student} key={student.name} />
                ))}
            </Table.Body>
          </Table>
        </>
      )}
    </div>
  );
};

export default StudentsTable;
