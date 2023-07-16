const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const uniqueId = uuidv4();


const contactPath = path.join(__dirname, 'db',"contacts.json");


const listContacts= async()=> {
    const data = await fs.readFile(contactPath);
    return JSON.parse(data);
  }
  
const getContactById= async(contactId) =>{
    const contacts = await listContacts();
    const oneContact = contacts.find(item => item.id === contactId);
    return oneContact || null;
  }
  
  const removeContact = async(contactId)=>{
    const contacts = await listContacts();
    const index = contacts.findIndex(item=>item.id===contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return result;
  }
  
const addContact = async ( name, email, phone) =>{
    const contacts = await listContacts();
    const newContact = {
        id: uniqueId,
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return newContact;
   
  }


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}