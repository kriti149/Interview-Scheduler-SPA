import Utils from './../../../services/Utils.js'

let getUsers = async (id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch('http://localhost:3000/api/v1/users/',  options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let CreateInterview = async (data) => {
    const options = {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   };
   try {
        const response = await fetch('http://localhost:3000/api/v1/interviews/',  options)
        const json = await response.json();
        console.log(json)
        return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let NewInterview = {
    

    render: async () => {
        let users = await getUsers()
    
        return `
        <form>
            <div>
                Role
                <input class="form-control" type="text"  name="role" id="role" >
            </div>
                <br/>
            <div>
                Start Time
                <input class="form-control" type="datetime-local"  name="startTime" id="startTime" >
            </div>
                <br/>
            <div>
                End Time
            <input class="form-control" type="datetime-local" name="endTime" id="endTime" >
            </div>
                <br/>
            <div>
                Select Interviewer
                <select  class="form-control" id="interviewer_id" name="interviewer_id">
                    ${users.map(user => {
                        if (user.participation == 'Interviewer') return `<option value=${user.id}> ${user.name}</option>`
                        else return `` 
                    } )}
                </select>
            </div>
            <div>
                Select Candidate
                <select  class="form-control" id="candidate_id" name="candidate_id">
                    ${users.map(user => {
                        if (user.participation == 'Candidate') return `<option value=${user.id}> ${user.name}</option>`
                        else return `` 
                    } )}
                </select>
            </div>
            <button type="button" id="create_interview_button">CREATE</button>
        <form>`
    }
     

    , after_render: async () => {
        document.getElementById("create_interview_button").addEventListener ("click",  async () => {
            let role = document.getElementById("role").value;
            let startTime = document.getElementById("startTime").value;
            let endTime = document.getElementById("endTime").value;
            let Candidate = document.getElementById("candidate_id").value;
            let Interviewer = document.getElementById("interviewer_id").value;

            let data = {
                    "role" : role,
                    "start_time" : startTime,
                    "end_time" : endTime,
                    "interviewer_id" : Interviewer,
                    "candidate_id" : Candidate
            };
            console.log(data);
            let response = await CreateInterview(data);
            routing.render("Interviews")
            
        })
    }
}

export default NewInterview