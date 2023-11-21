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

const patientsDropdownBox = document.getElementById("patients-dropdown-box")
const patientButtonsBox = document.getElementById("patient-buttons-box")
const numberOfMovementsBox = document.getElementById("numberOfMovement-box")
const otherGraphsBox = document.getElementById("otherGraphs-box")
const actionsInfoBox = document.getElementById("actions-info-box")

const url = window.location.href
const url_download = window.location.origin + "/main_therapist/analysis_dashboard/download/" // ${url_download}${patients[i].id}
const url_upload = window.location.origin + "/main_therapist/upload/" // ${url_upload}${patients[i].id}
const url_message = window.location.origin + "/main_therapist/messages/" //${url_message}${patients[i].id}
const url_session = window.location.origin + "/main_therapist/sessions/" // ${url_session}${patients[i].id}
var value_to_push = 300
var selectedPatientID = 0


const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", (e) => {
    
    const valueInput = e.target.value
    try{
        document.getElementById("error-input-box").innerHTML = ''
        value_to_push = parseInt(valueInput)
        if (value_to_push<0){
            throw('Negative values are not possible')
        }
        console.log("value to push is ", value_to_push)
        numberOfMovementsBox.innerHTML = `
            <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <canvas id="numberOfMovementsChart${selectedPatientID}" style="display: block; width: 999px; height: 320px;" class="chartjs-render-monitor" width="999" height="320"></canvas>
            </div>
        `
        otherGraphsBox.innerHTML = `
            <div class="col-xl-4">
                <div class="card border-light h-80 m-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Duration</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="duration-info">
                                    
                                </div>
                                <div class="h5 mb-0" id="duration-trend-info">
                                    
                                </div>
                                <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="durationChart${selectedPatientID}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="card border-light h-80 my-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Velocity
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="mean-velocity-info">

                                </div>
                                <div class="h5 mb-0" id="velocity-trend-info">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="meanVelocityChart${selectedPatientID}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="card border-light h-80 my-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Maximal Velocity</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-velocity-info">

                                </div>
                                <div class="h5 mb-0" id="max-velocity-trend-info">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="maxVelocityChart${selectedPatientID}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="card border-light h-80 my-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Zero Crossings</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="zero-crossings-info">

                                </div>
                                <div class="h5 mb-0" id="zero-crossings-trend-info">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="zeroCrossingsChart${selectedPatientID}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="card border-light h-80 my-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Distance Traveled</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="distance-traveled-info">

                                </div>
                                <div class="h5 mb-0" id="distance-traveled-trend-info">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="distanceTraveledChart${selectedPatientID}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="card border-light h-80 my-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Maximal Acceleration</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-acceleration-info">

                                </div>
                                <div class="h5 mb-0" id="max-acceleration-trend-info">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="maxAccelerationChart${selectedPatientID}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        loadGraphs(selectedPatientID)
    }
    catch (err){
        document.getElementById("error-input-box").innerHTML = err.message
    }


})

const loadPatients = () => {

    $.ajax({

        type: "GET",
        url: url + "load_patients_analysis/",
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
                            selectedPatientID = patient_id
                            patientButtonsBox.innerHTML =`
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
                            actionsInfoBox.innerHTML = `
                                <div class="table-responsive">
                                    <table class="table shadow">
                                        <tbody>
                                            <tr>
                                                <td>Upload Data:</td>
                                                <td>
                                                    <a href="" class="btn btn-light btn-block background-radial-gradient text-light rounded-total mx-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                                        </svg>
                                                    </a> 
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Download Report:</td>
                                                <td>
                                                    <a href="" class="btn btn-light btn-block background-radial-gradient text-light rounded-total mx-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                                        </svg>
                                                    </a> 
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Message:</td>
                                                <td>
                                                    <a href="" class="btn btn-light btn-block background-radial-gradient text-light rounded-total mx-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
                                                            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                                                        </svg>
                                                    </a> 
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Book a session:</td>
                                                <td>
                                                    <a href="" class="btn btn-light btn-block background-radial-gradient text-light rounded-total mx-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-plus-fill" viewBox="0 0 16 16">
                                                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM8.5 8.5V10H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V11H6a.5.5 0 0 1 0-1h1.5V8.5a.5.5 0 0 1 1 0z"/>
                                                        </svg>
                                                    </a>                                                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            `
                            numberOfMovementsBox.innerHTML = `
                                <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="numberOfMovementsChart${patient_id}" style="display: block; width: 999px; height: 320px;" class="chartjs-render-monitor" width="999" height="320"></canvas>
                                </div>
                            `
                            otherGraphsBox.innerHTML = `
                                <div class="col-xl-4">
                                    <div class="card border-light h-80 my-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                                        Average Duration</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800" id="duration-info">
                                                        
                                                    </div>
                                                    <div class="h5 mb-0" id="duration-trend-info">
                                                        
                                                    </div>
                                                    <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                                        <canvas id="durationChart${patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4">
                                    <div class="card border-light h-80 my-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                                        Average Velocity
                                                    </div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800" id="mean-velocity-info">

                                                    </div>
                                                    <div class="h5 mb-0" id="velocity-trend-info">
                                                        
                                                    </div>
                                                </div>
                                                <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                                    <canvas id="meanVelocityChart${patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4">
                                    <div class="card border-light h-80 my-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                                        Average Maximal Velocity</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-velocity-info">

                                                    </div>
                                                    <div class="h5 mb-0" id="max-velocity-trend-info">
                                                        
                                                    </div>
                                                </div>
                                                <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                                        <canvas id="maxVelocityChart${patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4">
                                    <div class="card border-light h-80 my-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                                        Average Zero Crossings</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800" id="zero-crossings-info">

                                                    </div>
                                                    <div class="h5 mb-0" id="zero-crossings-trend-info">
                                                        
                                                    </div>
                                                </div>
                                                <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                                        <canvas id="zeroCrossingsChart${patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4">
                                    <div class="card border-light h-80 my-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                                        Average Distance Traveled</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800" id="distance-traveled-info">

                                                    </div>
                                                    <div class="h5 mb-0" id="distance-traveled-trend-info">
                                                        
                                                    </div>
                                                </div>
                                                <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                                        <canvas id="distanceTraveledChart${patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4">
                                    <div class="card border-light h-80 my-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                                        Average Maximal Acceleration</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-acceleration-info">

                                                    </div>
                                                    <div class="h5 mb-0" id="max-acceleration-trend-info">
                                                        
                                                    </div>
                                                </div>
                                                <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                                        <canvas id="maxAccelerationChart${patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
                            console.log("nomBOX", numberOfMovementsBox.innerHTML)
                            loadGraphs(patient_id)
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

const loadGraphs = (patient_id) => {

    $.ajax({

        type: "GET",
        url: url + `load_graphs/${patient_id}`,
        success: function(response){
            var ctx = document.getElementById(`numberOfMovementsChart${patient_id}`)
            var ctx_duration = document.getElementById(`durationChart${patient_id}`)
            var ctx_mean_vel = document.getElementById(`meanVelocityChart${patient_id}`)
            var ctx_max_vel = document.getElementById(`maxVelocityChart${patient_id}`)
            var ctx_zero_c = document.getElementById(`zeroCrossingsChart${patient_id}`)
            var ctx_distance_t = document.getElementById(`distanceTraveledChart${patient_id}`)
            var ctx_max_acc = document.getElementById(`maxAccelerationChart${patient_id}`)
            // number of movements

            const number_of_movements = response.number_of_movements
            const number_of_movements_dates = number_of_movements.dates
            const number_of_movements_nom = number_of_movements.nom

            const timestamps = response.timestamps
            const duration = response.duration
            const duration_dates = duration.dates
            const duration_dur = duration.dur
            const duration_upper = duration.upper
            const duration_lower = duration.lower
            const duration_avg = response.general_data.average_duration
            const duration_std = response.general_data.std_duration

            const mean_velocity = response.mean_velocity
            const mean_velocity_dates = mean_velocity.dates
            const mean_velocity_mean_vel = mean_velocity.mean_vel
            const mean_velocity_upper = mean_velocity.upper
            const mean_velocity_lower = mean_velocity.lower
            const mean_velocity_avg = response.general_data.average_mean_velocity
            const mean_velocity_std = response.general_data.std_mean_velocity

            const max_velocity = response.max_velocity
            const max_velocity_dates = max_velocity.dates
            const max_velocity_max_vel = max_velocity.max_vel
            const max_velocity_upper = max_velocity.upper
            const max_velocity_lower = max_velocity.lower
            const max_velocity_avg = response.general_data.average_max_velocity
            const max_velocity_std = response.general_data.std_max_velocity

            const zero_crossings = response.zero_crossings
            const zero_crossings_dates = zero_crossings.dates
            const zero_crossings_zero_c = zero_crossings.zero_c
            const zero_crossings_upper = zero_crossings.upper
            const zero_crossings_lower = zero_crossings.lower
            const zero_crossings_avg = response.general_data.average_zero_crossings
            const zero_crossings_std = response.general_data.std_zero_crossings

            const distance_traveled = response.distance_traveled
            const distance_traveled_dates = distance_traveled.dates
            const distance_traveled_distance_t = distance_traveled.distance_t
            const distance_traveled_upper = distance_traveled.upper
            const distance_traveled_lower = distance_traveled.lower
            const distance_traveled_avg = response.general_data.average_distance_traveled
            const distance_traveled_std = response.general_data.std_distance_traveled

            const max_acceleration = response.max_acceleration
            const max_acceleration_dates = max_acceleration.dates
            const max_acceleration_max_acc = max_acceleration.max_acc
            const max_acceleration_upper = max_acceleration.upper
            const max_acceleration_lower = max_acceleration.lower
            const max_acceleration_avg = response.general_data.average_max_acceleration
            const max_acceleration_std = response.general_data.std_max_acceleration
            
            var score = []
            var expected = []
            for (i = 0; i < timestamps.length; i++){
                score.push( 10 * max_acceleration_max_acc[i] + 15 * max_velocity_max_vel[i] + 0.01 * number_of_movements_nom[i])
                expected.push(value_to_push)
            }
            console.log(score)

            var data =  {
                labels: number_of_movements_dates,
                datasets: [
                {
                    fill:false,
                    label: 'Ideal number of movements',
                    data: expected,
                    borderWidth: 1,
                    yAxisID: 'y',
                    borderColor: 'rgba(0, 0, 255, 1)',
                    borderDash: [5, 5],
                },
                {
                  fill:true,
                  label: 'Number of Movements',
                  data: number_of_movements_nom,
                  borderWidth: 1,
                  tension: 0.4,
                  yAxisID: 'y',
                  borderColor: 'rgba(26,115,252,1)',
                  backgroundColor: 'rgba(26,115,252,0.4)'
                },
                {
                  fill: true, 
                  label: 'Movement score',
                  data: score,
                  borderWidth:1,
                  tension:0.4,
                  yAxisID: 'y1',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.4)'
                }]
            }

            var config = {
                type: 'line',
                data: data,
                options: {
                  responsive: true,
                  interaction: {
                    mode: 'index',
                    intersect: false,
                  },
                  stacked: false,
                  scales: {
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
              
                      // grid line settings
                      grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                      },
                    },
                  }
                },
              };

            var numberOfMovementsChart = new Chart(
                ctx,
                config
            )

            // average duration
            var durationInfo = document.getElementById("duration-info")
            var durationInfoTrend = document.getElementById("duration-trend-info")
            durationInfo.textContent = `${duration_avg} ± ${duration_std}`
            

            console.log("duration", duration_dur)
            console.log("dates", duration_dates)

            console.log("ts", timestamps)

            function sum(array_elements){
                summation = 0
                for (i = 0; i < array_elements.length; i ++ ){
                    summation += array_elements[i]
                }
                return summation
            }
            function array_mult(array_1, array_2){
                final_array = []
                if (array_1.length === array_2.length){
                    for (i = 0; i < array_1.length; i ++){
                        final_array.push(array_1[i] * array_2[i])
                    }
                    return final_array
                }
                else {
                    return 0
                }
            }

            function squared_element(array_1) {
                final_array = []
                for (i=0; i < array_1.length; i++){
                    final_array.push(array_1[i]**2)
                }
                return final_array
            }

            var n = timestamps.length
            const a_duration = (n*sum(array_mult(duration_dur, timestamps)) - sum(duration_dur)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(a_duration)
            const b_duration = (sum(duration_dur)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, duration_dur)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(b_duration)

            if (a_duration > 0){
                durationInfoTrend.innerHTML = `
                <i style="color: green; font-size: small;">Trending Up</i>
                `
            }
            else if(a_duration < 0){
                durationInfoTrend.innerHTML = `
                <i style="color: red; font-size: small;">Trending Down</i>
                `
            }

            const regression_points_duration = []
            for (i = 0; i < timestamps.length; i ++){
                regression_points_duration.push(a_duration*timestamps[i] + b_duration)
            }
            console.log(regression_points_duration)
            
            var data =  {
                labels: duration_dates,
                datasets: [
                {
                    fill: false, 
                    label: "Average duration",
                    data: duration_dur,
                    borderWidth: 1, 
                    tension: 0.5
                },
                {
                    fill: false, 
                    label: "Duration trend",
                    data: regression_points_duration,
                    borderWidth: 1,
                }]
            } 
            console.log(data)

            const shadingArea_dur = {
                id: "shadingArea_dur",
                beforeDatasetsDraw(chart, args, pluginsOptions) {
                    const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                    const tickHeight = y.height/y.max;

                    ctx.save();
                    const datapointsLength = chart.data.labels.length; 
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(26,115,252,0.4)'
                    // ctx.strokeStyle = 'rgba(0,0,0,1)'
                    ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (duration_dur[0] - duration_lower[0]));

                    for (let i = 1; i < datapointsLength; i++){
                        ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (duration_dur[i] - duration_lower[i]));
                    }

                    for (let z = datapointsLength - 1; z > 0; z--){
                        ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (duration_upper[z] - duration_dur[z]));
                    }
                    
                    ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (duration_upper[0] - duration_dur[0]));

                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
                
            }

            var config = {
                type: 'line',
                data, 
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            grace: .2
                        }
                    }
                },
                plugins: [shadingArea_dur]
            }

            const durationChart = new Chart(
                ctx_duration,
                config
            )
            
            // // average velocity
            var meanVelocityInfo = document.getElementById("mean-velocity-info")
            var velocityInfoTrend = document.getElementById("velocity-trend-info")
            meanVelocityInfo.textContent = `${mean_velocity_avg} ± ${mean_velocity_std}`

            var n = timestamps.length
            const a_velocity = (n*sum(array_mult(mean_velocity_mean_vel, timestamps)) - sum(mean_velocity_mean_vel)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(a_velocity)
            const b_velocity = (sum(mean_velocity_mean_vel)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, mean_velocity_mean_vel)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(b_velocity)

            if (a_velocity > 0){
                velocityInfoTrend.innerHTML = `
                <i style="color: green; font-size: small;">Trending Up</i>
                `
            }
            else if(a_velocity < 0){
                velocityInfoTrend.innerHTML = `
                <i style="color: red; font-size: small;">Trending Down</i>
                `
            }

            const regression_points_velocity = []
            for (i = 0; i < timestamps.length; i ++){
                regression_points_velocity.push(a_velocity*timestamps[i] + b_velocity)
            }
            console.log(regression_points_velocity)
            
            var data =  {
                labels: mean_velocity_dates,
                datasets: [
                {
                    fill: false,
                    label: "Average velocity",
                    data: mean_velocity_mean_vel,
                    borderWidth: 1, 
                    tension: 0.4
                },
                {
                    fill: false,
                    label: "Mean velocity trend",
                    data: regression_points_velocity,
                    borderWidth: 1
                }]
            }
            console.log(data)

            const shadingArea_mean_vel = {
                id: "shadingArea_mean_vel",
                beforeDatasetsDraw(chart, args, pluginsOptions) {
                    const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                    const tickHeight = y.height/y.max;

                    ctx.save();
                    const datapointsLength = chart.data.labels.length; 
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(26,115,252,0.4)'
                    // ctx.strokeStyle = 'rgba(0,0,0,1)'
                    ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (mean_velocity_mean_vel[0] - mean_velocity_lower[0]));

                    for (let i = 1; i < datapointsLength; i++){
                        ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (mean_velocity_mean_vel[i] - mean_velocity_lower[i]));
                    }

                    for (let z = datapointsLength - 1; z > 0; z--){
                        ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (mean_velocity_upper[z] - mean_velocity_mean_vel[z]));
                    }
                    
                    ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (mean_velocity_upper[0] - mean_velocity_mean_vel[0]));

                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
                
            }

            var config = {
                type: 'line',
                data, 
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            grace: 0.2
                        }
                    }
                },
                plugins: [shadingArea_mean_vel]
            }

            const meanVelocityChart = new Chart(
                ctx_mean_vel,
                config
            )

            // // maximal velocity
            var maxVelocityInfo = document.getElementById("max-velocity-info")
            var maxVelocityInfoTrend = document.getElementById("max-velocity-trend-info")
            maxVelocityInfo.textContent = `${max_velocity_avg} ± ${max_velocity_std}`

            var n = timestamps.length
            const a_max_velocity = (n*sum(array_mult(max_velocity_max_vel, timestamps)) - sum(max_velocity_max_vel)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(a_max_velocity)
            const b_max_velocity = (sum(max_velocity_max_vel)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, max_velocity_max_vel)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(b_max_velocity)

            if (a_max_velocity > 0){
                maxVelocityInfoTrend.innerHTML = `
                <i style="color: green; font-size: small;">Trending Up</i>
                `
            }
            else if(a_max_velocity < 0){
                maxVelocityInfoTrend.innerHTML = `
                <i style="color: red; font-size: small;">Trending Down</i>
                `
            }

            const regression_points_max_velocity = []
            for (i = 0; i < timestamps.length; i ++){
                regression_points_max_velocity.push(a_max_velocity*timestamps[i] + b_max_velocity)
            }
            console.log(regression_points_max_velocity)
            
            var data =  {
                labels: max_velocity_dates,
                datasets: [
                {
                    fill:false,
                    label: "Max velocity",
                    data: max_velocity_max_vel,
                    borderWidth: 1,
                    tension: 0.4
                },
                {
                    fill:false,
                    label: "Max velocity trend",
                    data: regression_points_max_velocity,
                    borderWidth: 1,
                }]
            }
            console.log(data)

            const shadingArea_max_vel = {
                id: "shadingArea_max_vel",
                beforeDatasetsDraw(chart, args, pluginsOptions) {
                    const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                    const tickHeight = y.height/y.max;

                    ctx.save();
                    const datapointsLength = chart.data.labels.length; 
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(26,115,252,0.4)'
                    // ctx.strokeStyle = 'rgba(0,0,0,1)'
                    ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (max_velocity_max_vel[0] - max_velocity_lower[0]));

                    for (let i = 1; i < datapointsLength; i++){
                        ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (max_velocity_max_vel[i] - max_velocity_lower[i]));
                    }

                    for (let z = datapointsLength - 1; z > 0; z--){
                        ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (max_velocity_upper[z] - max_velocity_max_vel[z]));
                    }
                    
                    ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (max_velocity_upper[0] - max_velocity_max_vel[0]));

                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
                
            }

            var config = {
                type: 'line',
                data, 
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            grace: 0.5
                        }
                    }
                },
                plugins: [shadingArea_max_vel]
            }

            const maxVelocityChart = new Chart(
                ctx_max_vel,
                config
            )

            // // zero crossings
            var zeroCrossingsInfo = document.getElementById("zero-crossings-info")
            var zeroCrossingsInfoTrend = document.getElementById("zero-crossings-trend-info")
            zeroCrossingsInfo.textContent = `${zero_crossings_avg} ± ${zero_crossings_std}`
            
            var n = timestamps.length
            const a_zero_crossings = (n*sum(array_mult(zero_crossings_zero_c, timestamps)) - sum(zero_crossings_zero_c)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(a_zero_crossings)
            const b_zero_crossings = (sum(zero_crossings_zero_c)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, zero_crossings_zero_c)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(b_zero_crossings)

            if (a_zero_crossings > 0){
                zeroCrossingsInfoTrend.innerHTML = `
                <i style="color: green; font-size: small;">Trending Up</i>
                `
            }
            else if(a_zero_crossings < 0){
                zeroCrossingsInfoTrend.innerHTML = `
                <i style="color: red; font-size: small;">Trending Down</i>
                `
            }

            const regression_points_zero_crossings = []
            for (i = 0; i < timestamps.length; i ++){
                regression_points_zero_crossings.push(a_zero_crossings*timestamps[i] + b_zero_crossings)
            }
            console.log(regression_points_zero_crossings)

            var data =  {
                labels: zero_crossings_dates,
                datasets: [
                {
                    fill: false,
                    label: "Average zero crossings",
                    data: zero_crossings_zero_c,
                    borderWidth: 1,
                    tension: 0.4
                },
                {
                    fill: false, 
                    label: "Zero crossings trend",
                    data: regression_points_zero_crossings,
                    borderWidth: 1,
                }]
            }
            console.log(data)



            const shadingArea_zero_c = {
                id: "shadingArea_zero_c",
                beforeDatasetsDraw(chart, args, pluginsOptions) {
                    const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                    const tickHeight = y.height/y.max;

                    ctx.save();
                    const datapointsLength = chart.data.labels.length; 
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(26,115,252,0.4)'
                    // ctx.strokeStyle = 'rgba(0,0,0,1)'
                    ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (zero_crossings_zero_c[0] - zero_crossings_lower[0]));

                    for (let i = 1; i < datapointsLength; i++){
                        ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (zero_crossings_zero_c[i] - zero_crossings_lower[i]));
                    }

                    for (let z = datapointsLength - 1; z > 0; z--){
                        ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (zero_crossings_upper[z] - zero_crossings_zero_c[z]));
                    }
                    
                    ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (zero_crossings_upper[0] - zero_crossings_zero_c[0]));

                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
                
            }

            var config = {
                type: 'line',
                data, 
                options: {
                    scales: {
                        y: {
                            beginAtZero: false, 
                            grace: 1
                        }
                    }
                },
                plugins: [shadingArea_zero_c]
            }

            const zeroCrossingsChart = new Chart(
                ctx_zero_c,
                config
            )

            // // distance travelled
            var distaceTraveledInfo = document.getElementById("distance-traveled-info")
            var distanceTraveledInfoTrend = document.getElementById("distance-traveled-trend-info")
            distaceTraveledInfo.textContent = `${distance_traveled_avg} ± ${distance_traveled_std}`
            
            var n = timestamps.length
            const a_distance_traveled = (n*sum(array_mult(distance_traveled_distance_t, timestamps)) - sum(distance_traveled_distance_t)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(a_distance_traveled)
            const b_distance_traveled = (sum(distance_traveled_distance_t)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, distance_traveled_distance_t)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(b_distance_traveled)

            if (a_distance_traveled > 0){
                distanceTraveledInfoTrend.innerHTML = `
                <i style="color: green; font-size: small;">Trending Up</i>
                `
            }
            else if(a_distance_traveled < 0){
                distanceTraveledInfoTrend.innerHTML = `
                <i style="color: red; font-size: small;">Trending Down</i>
                `
            }

            const regression_points_distance_traveled = []
            for (i = 0; i < timestamps.length; i ++){
                regression_points_distance_traveled.push(a_distance_traveled*timestamps[i] + b_distance_traveled)
            }
            console.log(regression_points_distance_traveled)

            var data =  {
                labels: distance_traveled_dates,
                datasets: [
                    {
                        fill: false, 
                        label: "Average distance traveled",
                        data: distance_traveled_distance_t,
                        borderWidth: 1,
                        tension: 0.4
                    },
                    {
                        fill: false, 
                        label: "Distance traveled trend",
                        data: regression_points_distance_traveled,
                        borderWidth: 1
                    }]
            }
            console.log(data)

            const shadingArea_distance_t = {
                id: "shadingArea_distance_t",
                beforeDatasetsDraw(chart, args, pluginsOptions) {
                    const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                    const tickHeight = y.height/y.max;

                    ctx.save();
                    const datapointsLength = chart.data.labels.length; 
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(26,115,252,0.4)'
                    // ctx.strokeStyle = 'rgba(0,0,0,1)'
                    ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (distance_traveled_distance_t[0] - distance_traveled_lower[0]));

                    for (let i = 1; i < datapointsLength; i++){
                        ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (distance_traveled_distance_t[i] - distance_traveled_lower[i]));
                    }

                    for (let z = datapointsLength - 1; z > 0; z--){
                        ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (distance_traveled_upper[z] - distance_traveled_distance_t[z]));
                    }
                    
                    ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (distance_traveled_upper[0] - distance_traveled_distance_t[0]));

                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
                
            }

            var config = {
                type: 'line',
                data, 
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            grace: .2,
                        }
                    }
                },
                plugins: [shadingArea_distance_t]
            }

            const distanceTraveledChart = new Chart(
                ctx_distance_t,
                config
            )


            // // max acceleration 
            var maxAccelerationInfo = document.getElementById("max-acceleration-info")
            var maxAccelerationInfoTrend = document.getElementById("max-acceleration-trend-info")
            maxAccelerationInfo.textContent = `${max_acceleration_avg} ± ${max_acceleration_std}`
            
            var n = timestamps.length
            const a_max_acceleration = (n*sum(array_mult(max_acceleration_max_acc, timestamps)) - sum(max_acceleration_max_acc)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(a_max_acceleration)
            const b_max_acceleration = (sum(max_acceleration_max_acc)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, max_acceleration_max_acc)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            console.log(b_max_acceleration)

            if (a_max_acceleration > 0){
                maxAccelerationInfoTrend.innerHTML = `
                <i style="color: green; font-size: small;">Trending Up</i>
                `
            }
            else if(a_max_acceleration < 0){
                maxAccelerationInfoTrend.innerHTML = `
                <i style="color: red; font-size: small;">Trending Down</i>
                `
            }

            const regression_points_max_acceleration = []
            for (i = 0; i < timestamps.length; i ++){
                regression_points_max_acceleration.push(a_max_acceleration*timestamps[i] + b_max_acceleration)
            }
            console.log(regression_points_max_acceleration)

            var data =  {
                labels: max_acceleration_dates,
                datasets: [
                  {
                    fill:false,
                    label: 'Max acceleration',
                    data: max_acceleration_max_acc,
                    borderWidth: 1,
                    tension: 0.4
                  },
                  {
                    fill: false,
                    label: "Max acceleration trend",
                    data: regression_points_max_acceleration,
                    borderWidth: 1,
                  }
                ]
            }
            console.log(data)

            const shadingArea_max_acc = {
                id: "shadingArea_max_acc",
                beforeDatasetsDraw(chart, args, pluginsOptions) {
                    const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                    const tickHeight = y.height/y.max;

                    ctx.save();
                    const datapointsLength = chart.data.labels.length; 
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(26,115,252,0.4)'
                    // ctx.strokeStyle = 'rgba(0,0,0,1)'
                    ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (max_acceleration_max_acc[0] - max_acceleration_lower[0]));

                    for (let i = 1; i < datapointsLength; i++){
                        ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (max_acceleration_max_acc[i] - max_acceleration_lower[i]));
                    }

                    for (let z = datapointsLength - 1; z > 0; z--){
                        ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (max_acceleration_upper[z] - max_acceleration_max_acc[z]));
                    }
                    
                    ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (max_acceleration_upper[0] - max_acceleration_max_acc[0]));

                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
                
            }

            var config = {
                type: 'line',
                data, 
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            grace: 1,
                        }
                    }
                },
                plugins: [shadingArea_max_acc]
            }

            const maxAccelerationChart = new Chart(
                ctx_max_acc,
                config
            )
        },
        error: function(error){
            console.log('error', error)
        }

    })

}

var params = new URLSearchParams(window.location.search);
var patientId = params.get("patientId");
if(patientId!== null){
    console.log(patientId)
    loadPatients()
    loadGraphs(patientId)
}
else{
    loadPatients()
}

