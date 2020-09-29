import Utils from './../../../services/Utils.js'

let getUsersList = async () => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch('http://localhost:3000/api/v1/users', options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let DeleteUser = async (id) => {
    const options = {
       method: 'DELETE',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch('http://localhost:3000/api/v1/users/' + id, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let Users = {
   render : async () => {
       let users = await getUsersList()
       let view =  /*html*/`
            <section class="section">
              <h1> List of All Users </h1>
              <br>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Emaile</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th colspan="3"></th>
                </tr>

                ${users.map(user =>
                  
                  `<tr>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>${user.mobile}</td>
                  <td>${user.address}</td>
                  <td><a href = "#/users/${user.id}">show</a></td>
                  <td><a href = "#/users/${user.id}/edit">edit</a></td>
                  <button type="button" id="delete_btn">Delete</button>
                  </tr>
                  `
                  )}
              </table>     
              
              <button>
                 <a href = "/#/users/new">New</a>
              </button>

            </section>
       `
       return view
   }
   , after_render: async () => {
         document.getElementById("delete_btn").addEventListener ("click", async () => {
            
            let request = Utils.parseRequestURL()
            let response = await DeleteInterview(request.id);
            routing.render('Users')
        })
    
   }

}

export default Users;
