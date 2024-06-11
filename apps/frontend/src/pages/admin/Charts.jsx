import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const ChartsAdmin = () => {
  const context = useContext(AppContext);

  console.log(context);

  return <div>Charts Admin</div>;
};

export default ChartsAdmin;
