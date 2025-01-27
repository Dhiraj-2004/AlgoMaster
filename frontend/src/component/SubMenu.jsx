import PropTypes from 'prop-types';
import {  NavLink } from 'react-router-dom';

const SubMenu = ({ item }) => {
  return (
    <div>
      <NavLink
        to={item.path}
        className="flex items-center px-5 py-4 text-gray-700 dark:text-gray-200 text-lg hover:bg-gray-500 hover:text-white hover:border-l-4 hover:border-purple-500 transition-all duration-200"
      >
        <div className="flex items-center space-x-4">
          {item.icon}
          <span className="ml-4">{item.title}</span>
        </div>
      </NavLink>
    </div>
  );
};

SubMenu.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SubMenu;
