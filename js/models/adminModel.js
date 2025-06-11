//------------------ ADMIN CLASS ----------------------
//----------------------------------------------------------
class Admin{
    id = ''
    name = ''
    email = ''
    password = ''
    priority = 3
    constructor(id, name, email, password, priority){
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.priority = priority
    }
}

function addAdmin(name, subject) {
  const id = admin.length + 1
  const admin = new Admin(id, name, subject)
  admins.push(admin)
  return admin
}