import Utils from './../../../services/Utils.js'

let getInterviewsList = async() => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch('http://localhost:3000/api/v1/interviews', options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
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

let Interviews = {
        render: async() => {
          let interviews = await getInterviewsList()
          let view = /*html*/ `
        <section class="section">
            <h1> List of All Interviews </h1>
            <br>
            <table>
               <tr>
                  <th>Role</th>
                  <th>Start time</th>
                  <th>End Time</th>
      			      <th colspan="3"></th>
      			   </tr>

                ${interviews.map(interview =>
                  
                  `<tr>
                  <td>${interview.role}</td>
                  <td>${interview.start_time}</td>
                  <td>${interview.end_time}</td>
                  <td><a href = "#/interviews/${interview.id}">Show</a></td>
                  <td><a href = "#/interviews/${interview.id}/edit">edit</a></td>
                  <td><button type="button" id="delete_btn">Delete</button></td>
                  </tr>
                  `
                  )}
            </table>

            <button>
                 <a href = "/#/interviews/new">New</a>
            </button>

        </section>
       ` 
    
        return view
    },

    after_render: async() => {

        document.getElementById("delete_btn").addEventListener ("click", async () => {
            
            let request = Utils.parseRequestURL()
            let response = await DeleteInterview(request.id);
            routing.render('Interviews')
        })
    }

}

export default Interviews;
