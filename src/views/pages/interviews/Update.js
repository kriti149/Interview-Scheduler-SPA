import Utils from './../../../services/Utils.js'

let getList = async (resource, id = "") => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch('http://localhost:3000/api/v1/'+ resource +`/`+ id,  options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let CreateInterview = async (data, id) => {
    const options = {
       method: 'PATCH',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   };
   try {
       const response = await fetch('http://localhost:3000/api/v1/interviews/' + id,  options)
       const json = await response.json();
       console.log(json)
       console.log(response.status)
       if (response.status == 401) {
           var o = json;
           for (var key in o) {
               if (o.hasOwnProperty(key)) {
                   alert(key, o[key]);
               }
           }   
       }
       json["status"] = response.status;
       return json
   } catch (err) {
       alert(err)
       console.log('Error getting documents', err)
   }
}

let UpdateInterview = {

    render: async () => {
        let request = Utils.parseRequestURL()
        let users = await getList('users')
        let interview = await getReq('interviews', request.id)
        console.log(interview)
        let start = interview.start_time.substr(0, interview.start_time.length - 1);
        let end = interview.end_time.substr(0, interview.end_time.length - 1);
        return `
        <form >
            <div>
                Role
                <input class="form-control" type="text"  name="role" id="role" value = ${interview.role}>
            </div>
                <br/>
            <div>
                Start Time
                <input class="form-control" type="datetime-local"  name="startTime" id="startTime" value = ${start}>
            </div>
                <br/>
            <div>
                End Time
                <input class="form-control" type="datetime-local" name="endTime" id="endTime" value = ${end}>
            </div>
            
            <br/>
            <div>
                Select Interviewer
                <select  selected = ${interview.interviewer_id} class="form-control" name="interviewer_id" id="interviewer_id" >
                    ${users.map(user => {
                        if (user.participation == 'Interviewer') return `<option value=${user.id}> ${user.name}</option>`
                        else return `` 
                    } )}
                </select>
            </div>
            <div>
                Select Candidate
                <select  selected = ${interview.candidate_id} class="form-control" name="candidate_id" id="candidate_id" >
                    ${users.map(user => {
                        if (user.participation == 'Candidate') return `<option value=${user.id}> ${user.name}</option>`
                        else return `` 
                    } )}
                </select>
            </div>
            <button type="button" id="edit_interview_button">Edit</button>
        <form>`
    }
     

    , after_render: async () => {
        document.getElementById("edit_interview_button").addEventListener ("click",  async () => {
            let role = document.getElementById("role").value;
            let startTime     = document.getElementById("startTime").value;
            let endTime      = document.getElementById("endTime").value;
            let Interviewer  = document.getElementById("interviewer_id").value;
            let Candidate = document.getElementById("candidate_id").value;
            let request = Utils.parseRequestURL()
            let data = {
                    "role" : role,
                    "start_time" : startTime,
                    "end_time" : endTime,
                    "interviewer_id" : Interviewer,
                    "candidate_id" : Candidate,
                    "id" : request.id

            };
            console.log(data);
            let response = await CreateInterview(data, request.id);
            if (response["status"] != 401)
            routing.render("Interviews")
            
        })
    }
}

export default UpdateInterview