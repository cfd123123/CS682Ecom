import React, {useState} from "reactn";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import SearchIcon from "../img/search-icon.png";

export default function SearchBox() {
  const history = useHistory();
  const [searchContent, setSearchContent] = useState('');

  const handleChange = (event) => {
    setSearchContent(event.target.value);
  };

  const searchContentPara = queryString.stringify({
    content: searchContent
  });

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    history.push(`/Result?${searchContentPara}`)
  };

  return (
      <li>
        <input type="text" placeholder="Search..." value={searchContent} onChange={handleChange} onKeyPress={handleKeyPress} />
        <img src={SearchIcon} style={{cursor: 'pointer'}} onClick={handleSearch} width={30} className='search--icon' alt={"Go"}/>
      </li>
  )
}
