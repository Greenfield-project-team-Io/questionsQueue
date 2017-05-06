import React from 'react';
import { Card, CardText, CardHeader, CardTitle, CardActions } from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';


// const handleChange = (event, index, value) => this.setState({ value });
const SearchBar = props => (
  <Card className="searchbar">
    <div>
      <CardHeader title= "Sort by" />
      <CardActions>
        <span>Sort by </span>
        <DropDownMenu
          value={props.sortBy}
          onChange={(e, idx, val) => props.handleSortByChange(val)} >
          <MenuItem value="createdAt" primaryText="Time" />
          <MenuItem value="votes" primaryText="Votes" />
        </DropDownMenu>
        <IconButton
          tooltip="Reverse"
          onTouchTap={props.handleReverse}>
          <FontIcon className="material-icons">swap_vert</FontIcon>
        </IconButton>
        <TextField
          className="search-field"
          value={props.searchText}
          floatingLabelText="Seach questions for..."
          onChange={props.handleSearchChange} />
        <span>in</span>
        <DropDownMenu
          value={props.filterBy}
          onChange={(e, idx, val) => props.handleFilterByChange(val)} >
          <MenuItem value="all" primaryText = "All fields" />
          <MenuItem value="questionText" primaryText="Question text" />
          <MenuItem value="codeSnippet" primaryText="Code snippet" />
          <MenuItem value="tags" primaryText="Tag" />
        </DropDownMenu>
      </CardActions>
    </div>
  </Card>
);
export default SearchBar;
