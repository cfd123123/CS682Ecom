import React, {useState} from "reactn";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import SearchIcon from "../img/search-icon.png";

/**
 * This function renders the search box that is located in the navbar of
 * {@link App}.
 * @returns {ReactElement} the search box for the navbar
 */
function SearchBox() {
  /** Used to send the user to the results page. */
  const history = useHistory();
  /** Stores the user's typed search query. */
  const [searchContent, setSearchContent] = useState('');

  /**
   * Updates the searchContent variable with the user's typed query.
   * @param event - that triggered this function call
   */
  const handleChange = (event) => {
    setSearchContent(event.target.value);
  };

  /**
   * Updates the query string to be used as a path variable
   * @type {string}
   */
  const searchContentPara = queryString.stringify({
    searched: searchContent
  });

  /**
   * If the user presses enter in the search box, this function initiates the
   * search by calling the {@link handleSearch} function.
   * @param event - that triggered this function call
   */
  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      handleSearch();
    }
  };

  /**
   * Initiates the search by routing the user to results page.
   */
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
export default SearchBox;