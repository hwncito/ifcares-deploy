import './Home.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StudentsTable from '../../common/studentsTable/StudentsTable';

const Home = () => {
  return (
    <div className="body">
      <div className="nav">
        <div className="title-container">
          <h2 className='title'>Students</h2>
          <Link to="/addStudent">
            <Button
              variant="contained"
              size="small"
              style={{ textTransform: 'capitalize', fontWeight: 'bold' }}
            >
              Add Student
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <StudentsTable />
      </div>
    </div>
  );
};

export default Home;
