import PropTypes from "prop-types";
import { P, Li, DelButton } from "./ContactListItem.styled";
import { deleteContact } from "redux/contactsSlice";
import { useDispatch } from "react-redux";

export const ContactListItem = ({id, name, number}) => {
    const dispatch = useDispatch();
    return (
    <Li>
        <P>{name}: {number}</P>
        <DelButton type="button" onClick={() => dispatch(deleteContact(id))}>Delete</DelButton> 
    </Li>
    )

};

ContactListItem.propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.node.isRequired,
    };
