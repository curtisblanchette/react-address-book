import { useSelector } from "react-redux";
import { useGetContactByIdQuery } from "../../Api/api";

const ContactDetails = () => {
  const id = useSelector(state => state.addressBook.selectedContactId);
  const { data: contact, error, isLoading, isFetching } = useGetContactByIdQuery(id, {skip: !id});

  if(!id) {
    return <div className="mt-2">Select a contact</div>
  }

  if(isLoading || isFetching) {
    return (
      <div data-testid="loading" className="flex mt-2">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Loading contact...
      </div>
    )
  }

  if(!contact || error) {
    return <div className="mt-2">No contact found!</div>
  }

  return (
    <main data-testid="contact-details" className="text-white pt-2 pb-2">
      <div><span className="font-bold">Name:</span> {contact.name}</div>
      <div><span className="font-bold">Address:</span> {contact.address}</div>
      <div><span className="font-bold">Phone:</span> {contact.phone}</div>
    </main>
  )
}

export default ContactDetails;