import Utils from '../../../services/Utils.js'

let getList = async(resource, id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch('http://localhost:3000/api/v1/' + resource + '/' + id , options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error in getting interview details', err)
    }
}

let DeleteInterview = async (id) => {
    const options = {
       method: 'DELETE',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch('http://localhost:3000/api/v1/interviews/' + id, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let ShowInterview = {

    render: async() => {
        console.log("Inside render")
        let request = Utils.parseRequestURL()
        let interview = await getList('interviews',request.id)
        let interviewer = await getList('users', interview.interviewer_id)
        let candidate = await getList('users', interview.candidate_id)
        console.log(interviewer)
        console.log(candidate)

        return /*html*/ ` 
            <section class = "section">
                <p id="role"> Interview Role: ${interview.role} </p> 
                <p id="start_time"> Start Time: ${ interview.start_time} </p> 
                <p id="end_time"> End Time: ${ interview.end_time} </p> 
                <p id="name"> Interviewer Name: ${ interviewer["user"].name} </p> 
                <p id="name"> Interviewer Email: ${ interviewer["user"].email} </p> 
                <p id="name"> Candidate Name: ${ candidate["user"].name} </p> 
                <p id="name"> Candidate Email: ${ candidate["user"].email} </p> 
                <a href="#/interviews/${interview.id}/edit">
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
            routing.render('Interviews')
        })
    }    
        
}

export default ShowInterview;