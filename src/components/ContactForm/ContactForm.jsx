import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormWrapper, AddButton, InputForm } from "./ContactForm.styled";
import { useDispatch, useSelector } from "react-redux";
import { addContact, getContacts } from "redux/contactsSlice";
import shortid from "shortid";

const schema = Yup.object().shape({
    name: Yup.string().matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, `Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`).required(),
    number: Yup.string().matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, 'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +').required(),
});

export const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const initialValues = {
        name: '',
        number: '',
    };
    
    const handleSubmit = (data, {resetForm}) => {
        const isDuplicate = contacts.map(a => a.name).includes(data.name);
        if (isDuplicate) {
        alert(`${data.name} is already in your contacts`)
        return
        };
        
        const newContactId = shortid.generate();
        const newContact = {
        id: newContactId,
        ...data,
        };
        dispatch(addContact(newContact));
        resetForm();
    };

    return (
        <Formik initialValues={initialValues} 
        validationSchema={schema} 
        onSubmit={handleSubmit}>
            <FormWrapper>
                <label htmlFor="name"> Name</label>
                    <InputForm type="text" name="name"/>
                    <ErrorMessage name='name' component='div' />
                <label htmlFor="number"> Number</label>
                    <InputForm type='tel' name="number"/>
                    <ErrorMessage name='number' component='div' />
                <AddButton type="submit">Add contact</AddButton>
            </FormWrapper>
        </Formik>
    )
}
