// function to draw graphs
const drawAnalysisGraphs = (patient_id, value) => {
    
    $.ajax({

        type:"GET",
        url: url + `load_analysis/${patient_id}`,
        success: function(response){
    
            var patient_sessions = response.sessions
            var patient_info = response.patient_info
            var patientAnalysisInfo = document.getElementById("patient-analysis-info")
            var patientAnalysisInfoTablet = document.getElementById("patient-analysis-info-t")
            var patientAnalysisInfoMobile = document.getElementById("patient-analysis-info-m")
            var numberOfMovementsBox = document.getElementById("numberOfMovement-box")
            var numberOfMovementsBoxTablet = document.getElementById("numberOfMovement-box-t")
            var numberOfMovementsBoxMobile = document.getElementById("numberOfMovement-box-m")
            var otherGraphsBox = document.getElementById("otherGraphs-box")
            var otherGraphsBoxTablet = document.getElementById("otherGraphs-box-t")
            var otherGraphsBoxMobile = document.getElementById("otherGraphs-box-m")
    
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
                expected.push(value)
            }
            
    
            var screenWidth = window.innerWidth;
            //create the calendar
            if (screenWidth <= 769){
                
                //patient information 
                patientAnalysisInfoMobile.innerHTML = `
                    <div class="container ml-3">
                        <h1>${patient_info.name}</h1>
                        <hr>
                        <h5>Contacts:</h5>
                        <p class="mx-2">Phone: ${patient_info.phoneNumber}</p>
                        <p class="mx-2">Mail: ${patient_info.email}</p>
                        <h5>Medical Information:</h5>
                        <p class="mx-2">Age: ${patient_info.age}</p>
                        <p class="mx-2">Weight: ${patient_info.weight} Kg</p>
                        <p class="mx-2">Height: ${patient_info.height} cm</p>
                    </div>
                `
    
                //calendar list per month
                sessions_list = updateCalendar(patient_sessions)
                var calendarEl = document.getElementById('sessions-list-calendar-m');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    right: 'prev,next today',
                    left: 'title',
                    },
                    initialView:'listMonth',
                    height: 350,
                    contentHeight: 330,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    themeSystem: 'bootstrap5',
                    eventColor: 'rgb(192, 0, 14)',
                    eventBackgroundColor: 'rgba(192, 0, 14, 0.5)', // Set event background color to tonalities of rgb(192, 0, 14)
                    eventBorderColor: 'rgb(192, 0, 14)', // Set event border color to tonalities of rgb(192, 0, 14)
                    events:sessions_list,
                });
                calendar.render();
    
                //create graphs
                
                numberOfMovementsBoxMobile.innerHTML = ''
    
                numberOfMovementsBoxMobile.innerHTML = `
                    <div class="chart-area my-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                        <canvas id="numberOfMovementsChart${response.patient_id}-m" style="display: block; width: 1200px; height: 400px;" class="chartjs-render-monitor" width="1200" height="600"></canvas>
                    </div>
                `
    
                otherGraphsBoxMobile.innerHTML = ''
    
                otherGraphsBoxMobile.innerHTML = `
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Duration</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="duration-info-m">
                                    
                                </div>
                                <div class="h5 mb-0" id="duration-trend-info-m">
                                    
                                </div>
                                <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="durationChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Velocity
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="mean-velocity-info-m">
    
                                </div>
                                <div class="h5 mb-0" id="velocity-trend-info-m">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="meanVelocityChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Maximal Velocity</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-velocity-info-m">
    
                                </div>
                                <div class="h5 mb-0" id="max-velocity-trend-info-m">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="maxVelocityChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Zero Crossings</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="zero-crossings-info-m">
    
                                </div>
                                <div class="h5 mb-0" id="zero-crossings-trend-info-m">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="zeroCrossingsChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Distance Traveled</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="distance-traveled-info-m">
    
                                </div>
                                <div class="h5 mb-0" id="distance-traveled-trend-info-m">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="distanceTraveledChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Maximal Acceleration</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-acceleration-info-m">
    
                                </div>
                                <div class="h5 mb-0" id="max-acceleration-trend-info-m">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="maxAccelerationChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                `
    
                var ctx = document.getElementById(`numberOfMovementsChart${response.patient_id}-m`)
                var ctx_duration = document.getElementById(`durationChart${response.patient_id}-m`)
                var ctx_mean_vel = document.getElementById(`meanVelocityChart${response.patient_id}-m`)
                var ctx_max_vel = document.getElementById(`maxVelocityChart${response.patient_id}-m`)
                var ctx_zero_c = document.getElementById(`zeroCrossingsChart${response.patient_id}-m`)
                var ctx_distance_t = document.getElementById(`distanceTraveledChart${response.patient_id}-m`)
                var ctx_max_acc = document.getElementById(`maxAccelerationChart${response.patient_id}-m`)
                var typeGraph = '-m' 
            }
            else if (screenWidth >=1306){
                
                //patient information 
                patientAnalysisInfo.innerHTML = `
                    <div class="container ml-3">
                        <h1>${patient_info.name}</h1>
                        <hr>
                        <h5>Contacts:</h5>
                        <p class="mx-2">Phone: ${patient_info.phoneNumber}</p>
                        <p class="mx-2">Mail: ${patient_info.email}</p>
                        <h5>Medical Information:</h5>
                        <p class="mx-2">Age: ${patient_info.age}</p>
                        <p class="mx-2">Weight: ${patient_info.weight} Kg</p>
                        <p class="mx-2">Height: ${patient_info.height} cm</p>
                    </div>
                `
    
                //calendar list per month
                sessions_list = updateCalendar(patient_sessions)
                var calendarEl = document.getElementById('sessions-list-calendar');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    right: 'prev,next today',
                    left: 'title',
                    },
                    initialView:'listMonth',
                    height: 350,
                    contentHeight: 330,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    themeSystem: 'bootstrap5',
                    eventColor: 'rgb(192, 0, 14)',
                    eventBackgroundColor: 'rgba(192, 0, 14, 0.5)', // Set event background color to tonalities of rgb(192, 0, 14)
                    eventBorderColor: 'rgb(192, 0, 14)', // Set event border color to tonalities of rgb(192, 0, 14)
                    events:sessions_list,
                });
                calendar.render();
    
                //create graphs
                
                numberOfMovementsBox.innerHTML = ''
    
                numberOfMovementsBox.innerHTML = `
                    <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                        <canvas id="numberOfMovementsChart${response.patient_id}" style="display: block; width: 1500px; height: 500px;" class="chartjs-render-monitor" width="999" height="320"></canvas>
                    </div>
                `
    
                otherGraphsBox.innerHTML = ''
    
                otherGraphsBox.innerHTML = `
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Duration
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="duration-info">
                                
                            </div>
                            <div class="h5 mb-0" id="duration-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="durationChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Velocity
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="mean-velocity-info">
    
                            </div>
                            <div class="h5 mb-0" id="velocity-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="meanVelocityChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Maximal Velocity</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-velocity-info">
    
                            </div>
                            <div class="h5 mb-0" id="max-velocity-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="maxVelocityChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Zero Crossings</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="zero-crossings-info">
    
                            </div>
                            <div class="h5 mb-0" id="zero-crossings-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="zeroCrossingsChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Distance Traveled</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="distance-traveled-info">
    
                            </div>
                            <div class="h5 mb-0" id="distance-traveled-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="distanceTraveledChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Maximal Acceleration</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-acceleration-info">
    
                            </div>
                            <div class="h5 mb-0" id="max-acceleration-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="maxAccelerationChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div> 
                    </div>
                `
    
                var ctx = document.getElementById(`numberOfMovementsChart${response.patient_id}`)
                var ctx_duration = document.getElementById(`durationChart${response.patient_id}`)
                var ctx_mean_vel = document.getElementById(`meanVelocityChart${response.patient_id}`)
                var ctx_max_vel = document.getElementById(`maxVelocityChart${response.patient_id}`)
                var ctx_zero_c = document.getElementById(`zeroCrossingsChart${response.patient_id}`)
                var ctx_distance_t = document.getElementById(`distanceTraveledChart${response.patient_id}`)
                var ctx_max_acc = document.getElementById(`maxAccelerationChart${response.patient_id}`)
                var typeGraph = '' 
    
            }
            else{
                
                //patient information 
                patientAnalysisInfoTablet.innerHTML = `
                    <div class="container ml-3">
                        <h1>${patient_info.name}</h1>
                        <hr>
                        <h5>Contacts:</h5>
                        <p class="mx-2">Phone: ${patient_info.phoneNumber}</p>
                        <p class="mx-2">Mail: ${patient_info.email}</p>
                        <h5>Medical Information:</h5>
                        <p class="mx-2">Age: ${patient_info.age}</p>
                        <p class="mx-2">Weight: ${patient_info.weight} Kg</p>
                        <p class="mx-2">Height: ${patient_info.height} cm</p>
                    </div>
                `
    
                //calendar list per month
                sessions_list = updateCalendar(patient_sessions)
                var calendarEl = document.getElementById('sessions-list-calendar-t');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    right: 'prev,next today',
                    left: 'title',
                    },
                    initialView:'listMonth',
                    height: 350,
                    contentHeight: 330,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    themeSystem: 'bootstrap5',
                    eventColor: 'rgb(192, 0, 14)',
                    eventBackgroundColor: 'rgba(192, 0, 14, 0.5)', // Set event background color to tonalities of rgb(192, 0, 14)
                    eventBorderColor: 'rgb(192, 0, 14)', // Set event border color to tonalities of rgb(192, 0, 14)
                    events:sessions_list,
                });
                calendar.render();
    
                //create graphs
                
                numberOfMovementsBoxTablet.innerHTML = ''
    
                numberOfMovementsBoxTablet.innerHTML = `
                    <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                        <canvas id="numberOfMovementsChart${response.patient_id}-t" style="display: block; width: 1000px; height: 330px;" class="chartjs-render-monitor" width="999" height="320"></canvas>
                    </div>
                `
    
                otherGraphsBoxTablet.innerHTML = ''
    
                otherGraphsBoxTablet.innerHTML = `
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Duration</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="duration-info-t">
                                
                            </div>
                            <div class="h5 mb-0" id="duration-trend-info-t">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="durationChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Velocity
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="mean-velocity-info-t">
    
                            </div>
                            <div class="h5 mb-0" id="velocity-trend-info-t">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="meanVelocityChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Maximal Velocity</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-velocity-info-t">
    
                            </div>
                            <div class="h5 mb-0" id="max-velocity-trend-info-t">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="maxVelocityChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div> 
                        </div>       
                    </div>
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Zero Crossings</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="zero-crossings-info-t">
    
                            </div>
                            <div class="h5 mb-0" id="zero-crossings-trend-info-t">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="zeroCrossingsChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div>
                        </div>      
                    </div>
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Distance Traveled</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="distance-traveled-info-t">
    
                            </div>
                            <div class="h5 mb-0" id="distance-traveled-trend-info-t">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="distanceTraveledChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div>
                        </div>          
                    </div>
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Maximal Acceleration</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-acceleration-info-t">
    
                            </div>
                            <div class="h5 mb-0" id="max-acceleration-trend-info-t">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="maxAccelerationChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                `
    
                var ctx = document.getElementById(`numberOfMovementsChart${response.patient_id}-t`)
                var ctx_duration = document.getElementById(`durationChart${response.patient_id}-t`)
                var ctx_mean_vel = document.getElementById(`meanVelocityChart${response.patient_id}-t`)
                var ctx_max_vel = document.getElementById(`maxVelocityChart${response.patient_id}-t`)
                var ctx_zero_c = document.getElementById(`zeroCrossingsChart${response.patient_id}-t`)
                var ctx_distance_t = document.getElementById(`distanceTraveledChart${response.patient_id}-t`)
                var ctx_max_acc = document.getElementById(`maxAccelerationChart${response.patient_id}-t`)
                var typeGraph = '-t' 
    
            }
            
            //Number of Movements
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
    
            //others
    
            //duration
            var durationInfo = document.getElementById(`duration-info${typeGraph}`)
            var durationInfoTrend = document.getElementById(`duration-trend-info${typeGraph}`)
            durationInfo.textContent = `${duration_avg} ± ${duration_std}`
    
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
            const b_duration = (sum(duration_dur)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, duration_dur)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
    
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
            var meanVelocityInfo = document.getElementById(`mean-velocity-info${typeGraph}`)
            var velocityInfoTrend = document.getElementById(`velocity-trend-info${typeGraph}`)
            meanVelocityInfo.textContent = `${mean_velocity_avg} ± ${mean_velocity_std}`
    
            var n = timestamps.length
            const a_velocity = (n*sum(array_mult(mean_velocity_mean_vel, timestamps)) - sum(mean_velocity_mean_vel)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            const b_velocity = (sum(mean_velocity_mean_vel)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, mean_velocity_mean_vel)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            
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
            var maxVelocityInfo = document.getElementById(`max-velocity-info${typeGraph}`)
            var maxVelocityInfoTrend = document.getElementById(`max-velocity-trend-info${typeGraph}`)
            maxVelocityInfo.textContent = `${max_velocity_avg} ± ${max_velocity_std}`
    
            var n = timestamps.length
            const a_max_velocity = (n*sum(array_mult(max_velocity_max_vel, timestamps)) - sum(max_velocity_max_vel)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            const b_max_velocity = (sum(max_velocity_max_vel)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, max_velocity_max_vel)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
    
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
            var zeroCrossingsInfo = document.getElementById(`zero-crossings-info${typeGraph}`)
            var zeroCrossingsInfoTrend = document.getElementById(`zero-crossings-trend-info${typeGraph}`)
            zeroCrossingsInfo.textContent = `${zero_crossings_avg} ± ${zero_crossings_std}`
            
            var n = timestamps.length
            const a_zero_crossings = (n*sum(array_mult(zero_crossings_zero_c, timestamps)) - sum(zero_crossings_zero_c)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            const b_zero_crossings = (sum(zero_crossings_zero_c)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, zero_crossings_zero_c)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            
    
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
            var distaceTraveledInfo = document.getElementById(`distance-traveled-info${typeGraph}`)
            var distanceTraveledInfoTrend = document.getElementById(`distance-traveled-trend-info${typeGraph}`)
            distaceTraveledInfo.textContent = `${distance_traveled_avg} ± ${distance_traveled_std}`
            
            var n = timestamps.length
            const a_distance_traveled = (n*sum(array_mult(distance_traveled_distance_t, timestamps)) - sum(distance_traveled_distance_t)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            const b_distance_traveled = (sum(distance_traveled_distance_t)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, distance_traveled_distance_t)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
    
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
            var maxAccelerationInfo = document.getElementById(`max-acceleration-info${typeGraph}`)
            var maxAccelerationInfoTrend = document.getElementById(`max-acceleration-trend-info${typeGraph}`)
            maxAccelerationInfo.textContent = `${max_acceleration_avg} ± ${max_acceleration_std}`
            
            var n = timestamps.length
            const a_max_acceleration = (n*sum(array_mult(max_acceleration_max_acc, timestamps)) - sum(max_acceleration_max_acc)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
            const b_max_acceleration = (sum(max_acceleration_max_acc)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, max_acceleration_max_acc)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
    
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
            console.log(error)
        }
    
    })
}

// Attach functions to the window object
window.drawAnalysisGraphs = drawAnalysisGraphs; 
