import React from 'react';
import { Card, CardText, CardHeader, CardTitle, CardActions } from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';


// const handleChange = (event, index, value) => this.setState({ value });
const SearchBar = (props) => {
  const styles = {
    customWidth: {
      width: 200,
    },
  };

  return (
    <Card className="searchbar">
      <div>
        <CardHeader title= "Sort by" />
        <CardActions>
          <span>Sort by </span>
          <DropDownMenu
            value={props.sortBy}
            onChange={(e, idx, val) => { props.handleSortByChange(val); }} >
            <MenuItem value="createdAt" primaryText="Time" />
            <MenuItem value="votes" primaryText="Votes" />
          </DropDownMenu>
          <IconButton
            tooltip="Reverse"
            onTouchTap={props.handleReverse}>
          <FontIcon className="material-icons">swap_vert</FontIcon>
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
};
export default SearchBar;
