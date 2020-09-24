import Utils from '../../../services/Utils.js'

let getUser = async(id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch('http://localhost:3000/api/v1/users/' + id , options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error in getting user details', err)
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


let ShowUser = {

    render: async() => {
        console.log("Inside render")
        let request = Utils.parseRequestURL()
        let user = await getInterview(request.id)

        return /*html*/ ` 
            <section class = "section">
                <p id="name"> Name: ${user.name} </p> 
                <p id="email"> Email: ${ user.email} </p> 
                <p id="mobile"> Mobile No.: ${ user.mobile} </p> 
                <p id="address"> Address: ${ user.address} </p> 
                <a href="#/users/${user.id}/edit">
                    <button class="button is-primary" id="edit_btn">Edit</button>
                </a>
                <button type="button" id="delete_btn">Delete</button>    
            </section>
                    `
    },

    after_render: async() => {
        document.getElementById("delete_btn").addEventListener ("click", async () => {
            
            let request = Utils.parseRequestURL()
            let response = await DeleteInterview(request.id);
            routing.render('Users')
        })
    }
        
}

export default ShowUser;