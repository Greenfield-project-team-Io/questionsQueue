import React from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const TagArray = (props) => {
  function renderChip(tag) {
    return (
      <Chip
        key={ tag.key }
        onRequestDelete={ () => props.handleTagDelete(tag.key) }
        style={ styles.chip }
       >
        { tag.label }
      </Chip>
    );
  }

  return (
    <div style={ styles.wrapper }>
      { props.tags.map(renderChip) }
    </div>
  );
};

export default TagArray;
