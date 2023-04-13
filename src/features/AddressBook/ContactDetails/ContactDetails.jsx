import { useSelector } from "react-redux";
import { useGetContactByIdQuery } from "../../Api/api";

const ContactDetails = () => {
  const id = useSelector(state => state.addressBook.selectedContactId);
  const {data: contact, error, isLoading } = useGetContactByIdQuery(id, {skip: !id});

  if(!id) {
    return <div className="text-slate-500 dark:text-white mt-2 mb-2">Select a contact</div>
  }

  if(isLoading) {
    return <div className="text-slate-500 dark:text-white mt-2 mb-2">Loading contact details...</div>
  }

  if(!contact || error) {
    return <div className="text-slate-500 dark:text-white mt-2 mb-2">No contact found!</div>
  }

  return (
    <main className="text-white pt-2 pb-2">
      <div><span className="font-bold">Name:</span> {contact.name}</div>
      <div><span className="font-bold">Address:</span> {contact.address}</div>
      <div><span className="font-bold">Phone:</span> {contact.phone}</div>
    </main>
  )
}

export default ContactDetails;