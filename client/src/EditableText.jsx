import { useState } from 'react';

function EditableText(props) {
    const { initialText, task, updateTaskText } = props;

    const [isEditing, setEditing] = useState(false);
    const [text, setText] = useState(initialText);      // We have an attribute text that is set to initialText by default and can be modified by setText

    const handleClick = () => {
        setEditing(true);                    // If we click on text -> Editing is activated
    };

    const handleChange = (event) => {
        setText(event.target.value);        // As user types, the value of attribute text is updated
    };

    const handleBlur = () => {
        setEditing(false);                  // Once user clicks away, Editing is set to false
        updateTaskText(task._id, text);
    };

    return(
        <div onClick={handleClick}>
            {isEditing ? (                  // If Editing is activate text becomes an input
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            ) : (                           // If Editing is set to false display the value of attribute text
                <span>{text}</span>
            )}
        </div>
    );
}


export default EditableText;