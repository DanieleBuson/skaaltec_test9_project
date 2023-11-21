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

const patientInfoBox = document.getElementById("patient-info-box")
const spinnerBox = document.getElementById("spinner-box")
const endBox = document.getElementById("end-box")

const searchInput = document.querySelector("[data-search]")

const url = window.location.href
const url_analysis = window.location.href + "analysis_dashboard/"
const url_upload = window.location.href + "upload/"
const url_message = window.location.href + "messages/"

const getData = () => {

    $.ajax({

        type: "GET",
        url: url + "patients_data/",
        success: function(response){
            console.log('response', response)
            const data = response.data
            console.log("data", data)
            setTimeout(() => {
                spinnerBox.classList.add("not-visible")
                data.forEach(element => {
                    patientInfoBox.innerHTML += `
                    <div class="col-xl-3" id="patient-${element.id}">
                        <div class="card my-1 border border-light rounded-total  bg-element">
                            <div class="card-body">
                                <h6 class="card-title">${element.patient_name}</h6>
                                <h6 class="card-text" style="font-size:16">Age: ${element.age}</h6>
                                <h6 class="card-text" style="font-size:16">Height in cm: ${element.height}</h6>
                                <h6 class="card-text" style="font-size:16">Weight in Kg: ${element.weight}</h6>
                                <hr>
                                <div style="display: flex; justify-content: space-around;">
                                    <div>
                                        <a href="${url_analysis}" class="btn btn-light btn-block background-radial-gradient text-white rounded-total border border-dark">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pie-chart-fill" viewBox="0 0 16 16">
                                                <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z"/>
                                            </svg>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="${url_upload}${element.id}" class="btn btn-light btn-block background-radial-gradient text-white rounded-total border border-dark">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="${url_message}${element.id}" class="btn btn-light btn-block background-radial-gradient text-white rounded-total border border-dark">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
                                                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                });
                patients = data.map(patient => {
                    return {
                        id: patient.id,
                        patient_name: patient.patient_name,
                        age: patient.age,
                        height: patient.height,
                        weight: patient.weight
                    }
                })
                if (response.size === 0){
                    endBox.innerHTML = `
                        <p class="card-text">No patients registered</p>
                        <a class="btn btn-primary btn-block fa-lg background-radial-gradient" href="${url_register}"><i>Register a new patient</i></a>
                    `
                }
                else if (response.size === 1){
                    endBox.innerHTML = `
                        <p class="card-text">There is ${response.size} patient registered</p>
                    `
                }
                else if (response.size > 1){
                    endBox.innerHTML = `
                        <p class="card-text">There are ${response.size} patients registered</p>
                    `
                }
            }, 100)
        },
        error: function(error){
            console.log('error', error)
        }

    })

}

getData()

searchInput.addEventListener("input", (e) => {
    
    const value = e.target.value
    patients.forEach(patient => {
        const patientPage = document.getElementById(`patient-${patient.id}`)
        const isVisible = patient.patient_name.toLowerCase().includes(value.toLowerCase())
        if (!isVisible){
            patientPage.classList.add('not-visible')
        }
        else{
            if (patientPage.className.includes('not-visible')){
                patientPage.classList.remove('not-visible')
            }
        }
        // console.log("Fino a qui tutto bene")
    })

    
})

const messageCountBox = document.getElementById("message-count-box")
const spinnerMessageBox = document.getElementById("spinner-message-box")
const messageInfoBox = document.getElementById("message-info-box")

const loadMessages = () => {

    $.ajax({

        type: "GET",
        url: url + "load_messages_therapist/",
        success: function(response){
            console.log('response', response)
            const data = response.data
            console.log("data", data)
            setTimeout(() => {
                spinnerMessageBox.classList.add("not-visible")
                data.forEach(element => {
                    messageInfoBox.innerHTML += `
                    <div class="col-xl-12 my-1" id="message-${element.id}">
                        <div class="card  border border-light rounded-total bg-element">
                            <div class="card-body">
                                <p class="mx-1" style="font-size: 16;"><b>${element.sender} </b>${element.text}</p>
                                <p style="font-size: 12;">Sent on: ${element.date}</p>
                            </div> 

                        </div>
                    </div>        
                    `
                });
                
                if (response.size === 0){
                    messageCountBox.innerHTML = `
                        <p class="card-text">You have no message left</p>
                    `
                }
                else if (response.size === 1){
                    messageCountBox.innerHTML = `
                        <p class="card-text">There is ${response.size} new message</p>
                    `
                }
                else if (response.size > 1){
                    messageCountBox.innerHTML = `
                        <p class="card-text">There are ${response.size} new messages</p>
                    `
                }
            }, 100)
        },
        error: function(error){
            console.log('error', error)
        }

    })

}

loadMessages()

const sessionCountBox = document.getElementById("session-count-box")
const spinnerSessionBox = document.getElementById("spinner-session-box")
const sessionInfoBox = document.getElementById("session-info-box")

const loadSessions = () => {

    $.ajax({

        type: "GET",
        url: url + "load_session_therapist/",
        success: function(response){
            console.log('response', response)
            const data = response.data
            console.log("data", data)
            setTimeout(() => {
                spinnerSessionBox.classList.add("not-visible")
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
            console.log('error', error)
        }

    })

}

loadSessions()