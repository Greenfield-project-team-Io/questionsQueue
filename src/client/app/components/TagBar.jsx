import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import TagArray from './TagArray.jsx';

const tags = ['Node', 'Express', 'React', 'Angular', 'Closures', 'Promises'];

const TagBar = (props) => {

  const handleTagAdd = (newTag) => {
    props.handleTagAdd(newTag);
    
  }

  return (
    <div>
        <AutoComplete
          floatingLabelText="Add tags..."
          filter={AutoComplete.fuzzyFilter}
          dataSource={tags}
          onNewRequest={chosenRequest => handleTagAdd(chosenRequest)}
          maxSearchResults={5}
        />
        <TagArray tags={props.appliedTags} />
    </div>
  )
};

export default TagBar;
