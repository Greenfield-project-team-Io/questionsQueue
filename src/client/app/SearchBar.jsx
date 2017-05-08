import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

// note: refactor this component to use the material-ui 'toolbar' and avoid css workarounds
// element position is using px and not scalable

// const handleChange = (event, index, value) => this.setState({ value });
const SearchBar = props => (
    <Paper className="searchToolBar">
      <TextField
        className="search-field"
        value={props.searchText}
        floatingLabelText="Seach questions for..."
        onChange={props.handleSearchChange} />
      <DropDownMenu
        className="search-dropdown"
        value={props.filterBy}
        onChange={(e, idx, val) => props.handleFilterByChange(val)} >
        <MenuItem value="all" primaryText = "in all fields" />
        <MenuItem value="questionText" primaryText="in question text" />
        <MenuItem value="codeSnippet" primaryText="in code snippets" />
        <MenuItem value="tags" primaryText="in tags" />
      </DropDownMenu>
        <DropDownMenu
          className="sort-dropdown"
          value={props.sortBy}
          onChange={(e, idx, val) => props.handleSortByChange(val)} >
          <MenuItem value="createdAt" primaryText="Sort by Date"/>
          <MenuItem value="votes" primaryText="Sort by Votes" />
        </DropDownMenu>
        <IconButton
          className="sortButton"
          tooltip="Reverse Order"
          onTouchTap={props.handleReverse}>
          <FontIcon className="material-icons">
            {props.reverseSort ? 'arrow_upward' : 'arrow_downward'}
          </FontIcon>
        </IconButton>
  </Paper>
);
export default SearchBar;
