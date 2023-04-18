import ContactSearch from "./ContactSearch/ContactSearch";
import ContactDetails from "./ContactDetails/ContactDetails";

const AddressBook = () => {
  return (
    <main className="bg-gradient-to-r from-cyan-500 to-blue-500 dark:bg-gradient-to-r dark:from-slate-500 dark:to-slate-700 p-4 rounded-xl">
      <h1 className="text-2xl font-bold mb-2.5">Address Book</h1>
      <ContactSearch/>
      <ContactDetails/>
    </main>
  )
}
export default AddressBook;