import React from 'react';
import Chip from 'material-ui/Chip';


const TagArray = (props) => {
  const styles = {
    chip: {
      margin: 4,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

  function renderChip(tag, idx) {
    const handleTagDelete = props.question
      ? props.handleTagDelete(tag, props.question)
      : props.handleTagDelete(tag, null);
    return (
      <Chip
        key={ idx }
        onRequestDelete={props.handleTagDelete ? () => props.handleTagDelete(tag) : null}
        style={ styles.chip }
       >
        { tag }
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
