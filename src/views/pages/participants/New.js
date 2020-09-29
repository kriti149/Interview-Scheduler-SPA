import Utils from '../../../services/Utils.js'

let CreateUsers = async (data) => {
    const options = {
       method: 'POST',
       body: data
   };
   try {
       const response = await fetch('http://localhost:3000/api/v1/users/',  options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       alert(err)
       console.log('Error getting documents', err)
   }
}

let NewUser = {
    render: async () => {
        
        return `
        <form id = "edit_user" >
            <div>
                Name
                <input class="form-control" type="text"  name="name" id="name" >
            </div>
                <br/>
            <div>
                Email
                <input class="form-control" type="text" name="email" id="email" >
            </div>
                <br/>
            <div>
                Mobile
                <input class="form-control" type="text" name="mobile" id="mobile" >
            </div>
                <br/>
            <div>
                Address
                <input class="form-control" type="text" name="address" id="address" >
            </div>
                <br/>
            <div id = "participation">
                Choose Participation
                <br/>
                    <input type="radio" id="interviewer" name="participation" value="Interviewer">
                    <label for="Interviewer">Interviewer</label><br>
                    <input type="radio" id="candidate" name="participation" value="Candidate">
                    <label for="Candidate">Candidate</label><br>
            </div>
            
        <form>`
    }
    , after_render: async () => {
        document.getElementById("edit").addEventListener ("click",  async () => {
            const form = document.getElementById( "edit_user" );
            const FD = new FormData( form );
            console.log(FD);
            let response = await CreateUsers(FD);
            routing.render("Users")

        })
    }
}

export default NewUser