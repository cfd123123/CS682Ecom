import React, {useState} from 'reactn';
import SidebarIcon from './img/side-bar-icon.png'

const SideBar = () => {
    const [leftSideBar, setLeftSideBar] = useState(false);

    const toggleLeftSidebar = () => {
      setLeftSideBar(!leftSideBar);
    };

    return(
        <div className='homepage__left-part'>
          <img src={SidebarIcon} className='homepage__icon' onClick={toggleLeftSidebar} alt={""}/>
          <b className='homepage__left-part--font'>Ecom</b>
        </div>
    )
};
export default SideBar;
