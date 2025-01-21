import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SubMenu = ({ item }) => {
  return (
    <div>
      <Link
        to={item.path}
        className="flex items-center px-5 py-4 text-white text-lg hover:bg-gray-700 hover:border-l-4 hover:border-purple-500 transition-all duration-200"
      >
        <div className="flex items-center space-x-4">
          {item.icon}
          <span className="ml-4">{item.title}</span>
        </div>
      </Link>
    </div>
  );
};

SubMenu.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SubMenu;
