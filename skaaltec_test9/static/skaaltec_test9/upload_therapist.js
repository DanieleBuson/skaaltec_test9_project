console.log("ciao")

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    console.log("inside openNav")
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
  
/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    console.log("inside closeNav")
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}


const url = window.location.href
const patientsDropdownBox = document.getElementById("patients-dropdown-box")
const patientButtonsBox = document.getElementById("patient-buttons-box")
const submitFormButton = document.getElementById("submit-form-button")
const uploadInfoP = document.getElementById("upload-info")
const sessionInfoBox = document.getElementById("sessions-info-box")
const sessionCountBox = document.getElementById("sessions-count-box")
var selectedPatientID = null

const loadPatients = () => {

    $.ajax({

        type: "GET",
        url: url + "load_patients_upload/",
        success: function(response){
            console.log('response', response)
            const data = response.data
            console.log("data", data)
            setTimeout(() => {
                console.log("Inside setTimeout()")
                patients = data.map(patient => {
                    return {
                        id: patient.id,
                        patient_name: patient.patient_name,
                        age: patient.age,
                        height: patient.height,
                        weight: patient.weight
                    }
                })

                

                function selectPatient(patients, patient_id){
                    for (i = 0; i < patients.length; i ++){
                        if (patients[i].id == patient_id){
                            selectedPatientID = patients[i].id
                            patientButtonsBox.innerHTML = `
                                <div class="table-responsive">
                                    <table class="table shadow">
                                        <tbody>
                                            <tr>
                                                <td>Patient:</td>
                                                <td>${patients[i].patient_name} </td>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <td>${patients[i].age}</td>
                                            </tr>
                                            <tr>
                                                <td>Weight</td>
                                                <td>${patients[i].weight}</td>
                                            </tr>
                                            <tr>
                                                <td>Height</td>
                                                <td>${patients[i].height}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            `
                            loadSessions(patients[i].id)
                            submitFormButton.disabled = false
                            uploadInfoP.innerHTML = `
                                <p>Uploading data for patient: ${patients[i].patient_name}</p>
                            `
                        }
                    }
                }




                // spinnerBox.classList.add("not-visible")
                data.forEach(element => {
                    console.log("inside forEach()")
                    patientsDropdownBox.innerHTML += `
                        <a id="patient-${element.id}" class="btn btn-light btn-block background-radial-gradient text-light rounded-3"><i>${element.patient_name}</i></a>
                    `
                    
                    console.log(patientsDropdownBox.innerHTML)
                    
                });

                data.forEach(element => {
                    document.getElementById(`patient-${element.id}`).addEventListener('click', function(){
                        selectPatient(patients, element.id)
                    })
                })

            }, 100)
        },
        error: function(error){
            console.log('error', error)
        }

    })

}

loadPatients()

const alertBox = document.getElementById('alert-box')
const pForm = document.getElementById("p-form")
const date = document.getElementById("id_date")
const data_file = document.getElementById("id_data_file")

const csrf = document.getElementsByName("csrfmiddlewaretoken")
console.log(csrf[1])

const handleAlerts = (type, text) => {
    alertBox.innerHTML = `
    <div class="alert alert-${type}" role="alert">
        ${text}
    </div>
    `
}

pForm.addEventListener('submit', e=>{
    e.preventDefault()

    const fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf[1].value)
    fd.append('date', date.value)
    fd.append('data_file', data_file.files[0])
    if (selectedPatientID !== null) {
        fd.append('patient_id', selectedPatientID);
    }
    console.log(selectedPatientID)
    $.ajax({
        type:'POST', 
        url: url,
        enctype: 'multipart/form-data',
        data: fd,
        success: function(response){
            const successText = `
                successfully saved file from ${response.date}
            `
            handleAlerts('success', successText)

            setTimeout(()=> {
                alertBox.innerHTML = ""
                date.value=""
                data_file.value=""
            }, 2000)
            console.log(response)
        },
        error:function(error){
            handleAlerts('danger', 'ups, something went wrong')
            console.log(error)
        },
        cache:false,
        contentType:false,
        processData:false,
    })
})

const loadSessions = (patient_id) => {
    $.ajax({

        type:"GET", 
        url: url + `load_session_upload/${patient_id}`,
        success: function(response){
            const data = response.data
            console.log("data", data)
            sessionInfoBox.innerHTML = ""
            setTimeout(() => {
                data.forEach(element => {
                    sessionInfoBox.innerHTML += `
                        <div class="col-xl-12 my-1" id="session-${element.id}">
                            <div class="card  border border-light rounded-total bg-element">
                                <div class="card-body">
                                    <p style="text-align: left; font-size:16;">There is a session booked for <b>${element.patient}</b> the day: <i style="color: ${element.color_text}; font-size:14;">${element.date} </i></p>
                                    <hr>
                                    <div style="display: flex; justify-content: space-around;">
                                        <div>
                                            <a href="" class="btn btn-light btn-block background-radial-gradient text-white rounded-total border border-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-check" viewBox="0 0 16 16">
                                                    <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                                                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="" class="btn btn-light btn-block background-radial-gradient text-white rounded-total border border-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-plus" viewBox="0 0 16 16">
                                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                                                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM8 8a.5.5 0 0 1 .5.5V10H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V11H6a.5.5 0 0 1 0-1h1.5V8.5A.5.5 0 0 1 8 8z"/>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="" class="btn btn-light btn-block background-radial-gradient text-white rounded-total border border-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-x" viewBox="0 0 16 16">
                                                    <path d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z"/>
                                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                                                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>       
                    `
                });
                
                if (response.size === 0){
                    sessionCountBox.innerHTML = `
                        <p class="card-text">No therapy sessions registered</p>
                    `
                }
                else if (response.size === 1){
                    sessionCountBox.innerHTML = `
                        <p class="card-text">There is ${response.size} not yet completed session</p>
                    `
                }
                else if (response.size > 1){
                    sessionCountBox.innerHTML = `
                        <p class="card-text">There are ${response.size} not yet completed sessions</p>
                    `
                }
            }, 100)
        },
        error: function(error){
            console.log(error)
        }

    })
}