import { ContactListItem } from "components/ContactListItem/ContactListItem";
import { useSelector } from "react-redux";
import { getContacts, getFilter } from "redux/contactsSlice";


export const ContactList = () => {
    const allContacts = useSelector(getContacts);
    const filter = useSelector(getFilter);
   
    const getFiltredContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        return allContacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
    };

    const filteredContacts = getFiltredContacts();

    const isContactsNotEmpty = filteredContacts.length > 0;
    
    return (
    isContactsNotEmpty ? 
    <ul>
        { filteredContacts.map( contact => { 
        const {id, name, number} = contact;
        return <ContactListItem key={id} id={id} name={name} number={number}/>;})
        }
    </ul>
    : <p>You dont have any contacts or matches</p>
    
    )

};

// ContactList.propTypes = {
//     contacts: PropTypes.arrayOf(PropTypes.exact({
//         id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         number: PropTypes.node.isRequired,
//     })),

// }