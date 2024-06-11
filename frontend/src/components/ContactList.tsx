import ContactItem from "./ContactItem"
import ProfileElement from "./ProfileElement"
import SearchBar from "./SearchBar"

const ContactList = () => {
  return (
    <div className = "w-1/4 bg-neutral-700 flex flex-col">
        <ProfileElement />
        <SearchBar />
        <div className="flex-1 overflow-auto border-t">
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
        
        </div>
        
    </div>
  )
}

export default ContactList