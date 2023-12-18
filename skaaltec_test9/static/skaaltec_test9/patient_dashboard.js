var analysisBox = document.getElementById("analysis")
var chatMessageBox = document.getElementById("chat")
var analysisBoxTablet = document.getElementById("analysis-t")
var chatMessageBoxTablet = document.getElementById("chat-t")
var analysisBoxMobile = document.getElementById("analysis-m")
var chatMessageBoxMobile = document.getElementById("chat-m")
var labelElements = document.querySelectorAll('label[for="id_textMessage"]');
labelElements.forEach(function(labelElement) {
    labelElement.style.display = 'none';
});

url = window.location.href

console.log(document.getElementsByName("csrfmiddlewaretoken"))

const loadInformation = () => {

    $.ajax({

        type: "GET",
        url: url + "load_info/",
        success: function(response){
            //desktop
            var patient_info = response.patient_info
            var personalInfoBox = document.getElementById("personal-info")
            personalInfoBox.innerHTML = `
                <div class="container ml-3">
                    <h1>${patient_info.patient_name}</h1>
                    <hr>
                    <h5>Personal information:</h5>
                    <p class="mx-2">Phone: ${patient_info.patient_phoneNumber}</p>
                    <p class="mx-2">Mail: ${patient_info.patient_email}</p>
                    <h5>Medical Information:</h5>
                    <p class="mx-2">Age: ${patient_info.patient_age}</p>
                    <br>
                    <br>
                </div>
            `

            var personalButtonBox = document.getElementById("personal-buttons")
            personalButtonBox.innerHTML = `
                <div style="text-align:center">
                    <h1>ACTIONS</h1>
                    <hr class="my-2">
                </div>
                <div class="row my-3">
                    <div class="col-xl-3" style="text-align:center">
                        <button class="dashboard-button mx-1 rounded-3" style="text-decoration: none;" id="message-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
                                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15"/>
                            </svg>
                        </button>
                    </div>
                    <div class="col-xl-9" style="text-align:center">
                        <h5 class="my-1">Message</h5>
                    </div>
                </div>
                <div class="row my-3">
                    <div class="col-xl-3" style="text-align:center">
                        <a class="dashboard-button mx-1 rounded-3" style="text-decoration: none;" href='${url}download_report/'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                            </svg>
                        </a>
                    </div>
                    <div class="col-xl-9" style="text-align:center">
                        <h5 class="my-1">Download Report</h5>
                    </div>
                </div>
                <div class="row my-3">
                    <div class="col-xl-3" style="text-align:center">
                        <button class="dashboard-button mx-1 rounded-3" style="text-decoration: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="col-xl-9" style="text-align:center">
                        <h5 class="my-1">Update Information</h5>
                    </div>
                </div>
            `

            document.getElementById("message-link").addEventListener("click", function(event) {
                event.preventDefault()

                if (!analysisBox.classList.contains("not-visible")){
                    analysisBox.classList.add("not-visible")
                }
                if (chatMessageBox.classList.contains("not-visible")){
                    chatMessageBox.classList.remove("not-visible")
                }

                loadMessages()

            })

            document.getElementById("admin-link").addEventListener("click", function(event) {
                event.preventDefault()

                if (!chatMessageBox.classList.contains("not-visible")){
                    chatMessageBox.classList.add("not-visible")
                }
                if (analysisBox.classList.contains("not-visible")){
                    analysisBox.classList.remove("not-visible")
                }

            })

            var calendarSessionBox = document.getElementById("calendar-sessions")
            sessions_list = updateCalendar(response.session_list)
            var calendar = new FullCalendar.Calendar(calendarSessionBox, {
                headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridDay,listMonth',
                },
                initialView:'listMonth',
                height: 650,
                contentHeight: 630,
                aspectRatio: 3,
                nowIndicator: true,
                now: new Date().toISOString(), // Get the current date and time in ISO format
                views: {
                dayGridMonth: { buttonText: 'month' },
                timeGridDay: { buttonText: 'day' },
                },
                themeSystem: 'bootstrap5',
                eventColor: 'rgb(192, 0, 14)',
                eventBackgroundColor: 'rgba(192, 0, 14, 0.5)', // Set event background color to tonalities of rgb(192, 0, 14)
                eventBorderColor: 'rgb(192, 0, 14)', // Set event border color to tonalities of rgb(192, 0, 14)
                events:sessions_list,
            });
            calendar.render();

            //tablet
            var personalInfoBoxTablet = document.getElementById("personal-info-t")
            personalInfoBoxTablet.innerHTML = `
                <div class="container ml-3">
                    <h1>${patient_info.patient_name}</h1>
                    <hr>
                    <h5>Personal information:</h5>
                    <p class="mx-2">Phone: ${patient_info.patient_phoneNumber}</p>
                    <p class="mx-2">Mail: ${patient_info.patient_email}</p>
                    <h5>Medical Information:</h5>
                    <p class="mx-2">Age: ${patient_info.patient_age}</p>
                    <br>
                    <br>
                </div>
            `

            var personalButtonBoxTablet = document.getElementById("personal-buttons-t")
            personalButtonBoxTablet.innerHTML = `
                <div style="text-align:center">
                    <h1>ACTIONS</h1>
                    <hr class="my-2">
                </div>
                <div class="row my-3">
                    <div class="col-md-3" style="text-align:center">
                        <button class="dashboard-button mx-1 rounded-3" style="text-decoration: none;" id="message-link-t">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
                                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15"/>
                            </svg>
                        </button>
                    </div>
                    <div class="col-md-9" style="text-align:center">
                        <h5 class="my-1">Message</h5>
                    </div>
                </div>
                <div class="row my-3">
                    <div class="col-md-3" style="text-align:center">
                        <button class="dashboard-button mx-1 rounded-3" style="text-decoration: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="col-md-9" style="text-align:center">
                        <h5 class="my-1">Download Report</h5>
                    </div>
                </div>
                <div class="row my-3">
                    <div class="col-md-3" style="text-align:center">
                        <button class="dashboard-button mx-1 rounded-3" style="text-decoration: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="col-md-9" style="text-align:center">
                        <h5 class="my-1">Update Information</h5>
                    </div>
                </div>
            `

            document.getElementById("message-link-t").addEventListener("click", function(event) {
                event.preventDefault()

                if (!analysisBoxTablet.classList.contains("not-visible")){
                    analysisBoxTablet.classList.add("not-visible")
                }
                if (chatMessageBoxTablet.classList.contains("not-visible")){
                    chatMessageBoxTablet.classList.remove("not-visible")
                }

                loadMessages()

            })

            document.getElementById("admin-link-t").addEventListener("click", function(event) {
                event.preventDefault()

                if (!chatMessageBoxTablet.classList.contains("not-visible")){
                    chatMessageBoxTablet.classList.add("not-visible")
                }
                if (analysisBoxTablet.classList.contains("not-visible")){
                    analysisBoxTablet.classList.remove("not-visible")
                }

            })

            var calendarSessionBoxTablet = document.getElementById("calendar-sessions-t")
            sessions_list = updateCalendar(response.session_list)
            var calendar = new FullCalendar.Calendar(calendarSessionBoxTablet, {
                headerToolbar: {
                left: 'prev,next today',
                right: 'title'
                },
                initialView:'listMonth',
                height: 550,
                contentHeight: 530,
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

            //Mobile
            var personalInfoBoxMobile = document.getElementById("personal-info-m")
            personalInfoBoxMobile.innerHTML = `
                <div class="container ml-3">
                    <h1>${patient_info.patient_name}</h1>
                    <hr>
                    <h5>Personal information:</h5>
                    <p class="mx-2">Phone: ${patient_info.patient_phoneNumber}</p>
                    <p class="mx-2">Mail: ${patient_info.patient_email}</p>
                    <h5>Medical Information:</h5>
                    <p class="mx-2">Age: ${patient_info.patient_age}</p>
                    <br>
                    <br>
                </div>
            `

            var personalButtonBoxMobile = document.getElementById("personal-buttons-m")
            personalButtonBoxMobile.innerHTML = `
                <div class="container">
                    <h1>ACTIONS</h1>
                    <hr class="my-2">
                
                    <div class="row my-3">
                        <div class="col-12 d-flex">
                            <button class="dashboard-button mx-1 rounded-3" style="text-decoration: none;" id="message-link-m">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
                                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15"/>
                                </svg>
                            </button>
                            <h5 class="mx-5">Message</h5>
                        </div>
                    </div>
                
                    <div class="row my-3">
                        <div class="col-12 d-flex">
                            <button class="dashboard-button mx-1 rounded-3" style="text-decoration: none;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                                    <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                                </svg>
                            </button>
                            <h5 class="mx-5">Download Report</h5>
                        </div>
                    </div>
                
                    <div class="row my-3">
                        <div class="col-12 d-flex">
                            <button class="dashboard-button mx-1 rounded-3" style="text-decoration: none;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                </svg>
                            </button>
                            <h5 class="mx-5">Update Information</h5>
                        </div>
                    </div>
                </div>
            `

            document.getElementById("message-link-m").addEventListener("click", function(event) {
                event.preventDefault()

                if (!analysisBoxMobile.classList.contains("not-visible")){
                    analysisBoxMobile.classList.add("not-visible")
                }
                if (chatMessageBoxMobile.classList.contains("not-visible")){
                    chatMessageBoxMobile.classList.remove("not-visible")
                }

                loadMessages()

            })

            document.getElementById("admin-link-m").addEventListener("click", function(event) {
                event.preventDefault()

                if (!chatMessageBoxMobile.classList.contains("not-visible")){
                    chatMessageBoxMobile.classList.add("not-visible")
                }
                if (analysisBoxMobile.classList.contains("not-visible")){
                    analysisBoxMobile.classList.remove("not-visible")
                }

            })

            var calendarSessionBoxMobile = document.getElementById("calendar-sessions-m")
            sessions_list = updateCalendar(response.session_list)
            var calendar = new FullCalendar.Calendar(calendarSessionBoxMobile, {
                headerToolbar: {
                left: 'prev,next today',
                right: 'title'
                },
                initialView:'listMonth',
                height: 450,
                contentHeight: 430,
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

        },
        error: function(error){
            console.log(error)
        }

    })

}

loadInformation()

const loadAnalysis = (value=300) => {
    drawAnalysisGraphs(value)
}

loadAnalysis()

const loadMessages = () => {

    $.ajax({

        type:"GET",
        url: url + "load_messages/",
        success: function(response){
            var screenWidth = window.innerWidth;
            if (screenWidth <= 769){
                
                var PatientNameChatH1M = document.getElementById("patient-name-chat-m")
                PatientNameChatH1M.innerHTML = `
                    <h1>${response.data.patient_name}</h1>
                `
                var messageChatBoxM = document.getElementById("chat-box-m")
                messageChatBoxM.innerHTML = ""
                response.data.messages.forEach(message => {
                    if (message.sender == `${response.data.therapist_name}`){
                        messageChatBoxM.innerHTML += `
                            <div class="row" style="margin: 5px; width: 95%;">
                                <div class="m-1 rounded-3" style="background-color: rgba(35, 182, 42, 0.45);">
                                    <p style="width: 90%; word-wrap: break-word; text-align: left; margin: 5px;">${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.time}</p>
                                </div>
                            </div>
                        `
                    }
                    else if(message.sender == `${response.data.patient_name}`){
                        messageChatBoxM.innerHTML += `
                            <div class="row" style="margin: 5px; width: 95%; text-align: right;">
                                <div class=" m-2 rounded-3" style=" background-color: rgba(214, 223, 222, 0.555);">
                                    <p style="word-wrap: break-word; text-align: right; margin: 5px;">${message.text}</p>
                                    <p style="color: grey; font-size: 12; word-wrap: break-word; text-align: right; margin: 5px;">Sent on: ${message.time}</p>
                                </div>
                            </div>
                        `
                    }
                    scrollToBottom(messageChatBoxM)
                })
                    
            }
            else if (screenWidth >=1306){
                
                var therapistNameH1 = document.getElementById("therapist-name-chat")
                therapistNameH1.innerHTML = `
                    <h1>${response.data.therapist_name}</h1>
                `
                var messageChatBox = document.getElementById("chat-box")
                messageChatBox.innerHTML = ""
                response.data.messages.forEach(message => {
                    if (message.sender == `${response.data.therapist_name}`){
                        messageChatBox.innerHTML += `
                            <div class="row">
                                <div class="col-xl-1"></div>
                                <div class="col-xl-7 my-2 border border-dark rounded-3 ml-3" style="background-color: rgba(35, 182, 42, 0.45);">
                                    <p style="width: 100%; word-wrap: break-word; display: inline-block;"> ${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.time}</p>
                                </div>
                            </div>
                        `
                    }
                    else if(message.sender == `${response.data.patient_name}`){
                        messageChatBox.innerHTML += `
                            <div class="row">
                                <div class="col-xl-3 my-2"></div>
                                <div class="col-xl-7 my-2 border border-dark rounded-3" style="background-color: rgba(214, 223, 222, 0.555);">
                                    <p style="width: 100%; word-wrap: break-word; display: inline-block;"> ${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.time}</p>
                                </div>
                                <div class="col-xl-1"></div>
                            </div>
                        `
                    }
                    scrollToBottom(messageChatBox)
                })
            }
            else{
                
                var PatientNameChatH1T = document.getElementById("patient-name-chat-t")
                PatientNameChatH1T.innerHTML = `
                    <h1>${response.data.therapist_name}</h1>
                `
                var messageChatBoxT = document.getElementById("chat-box-t")
                messageChatBoxT.innerHTML = ""
                response.data.messages.forEach(message => {
                    if (message.sender == `${response.data.therapist_name}`){
                        messageChatBoxT.innerHTML += `
                            <div class="row">
                                <div class="col-md-1"></div>
                                <div class="col-md-7 my-2 border border-dark rounded-3 ml-3" style="background-color: rgba(35, 182, 42, 0.45);">
                                    <p style="width: 100%; word-wrap: break-word; display: inline-block;"> ${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.time}</p>
                                </div>
                            </div>
                        `
                    }
                    else if(message.sender == `${response.data.patient_name}`){
                        messageChatBoxT.innerHTML += `
                            <div class="row">
                                <div class="col-md-3 my-2"></div>
                                <div class="col-md-7 my-2 border border-dark rounded-3" style="background-color: rgba(214, 223, 222, 0.555);">
                                    <p style="width: 100%; word-wrap: break-word; display: inline-block;"> ${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.time}</p>
                                </div>
                                <div class="col-md-1"></div>
                            </div>
                        `
                    }
                    scrollToBottom(messageChatBoxT)
                })

            }
        }

    })

}

//desktop message
var messageForm = document.getElementById("m-form")
document.getElementById("id_textMessage").setAttribute("id", "id_textMessage_desktop")
var messageDesktop = document.getElementById("id_textMessage_desktop")

var csrfMessage = document.getElementsByName("csrfmiddlewaretoken")[2]
console.log(csrfMessage)

messageForm.addEventListener('submit', e=>{
    e.preventDefault()
    sendMessageForm(csrfMessage, messageDesktop)
})

//desktop booking
var bookAlertBox = document.getElementById('book-alert-box')
var bookForm = document.getElementById("book-form")

document.getElementById("id_date").setAttribute("id", "id_date_desktop")
var dateDesktop = document.getElementById("id_date_desktop")

csrfBook = document.getElementsByName("csrfmiddlewaretoken")[3]

bookForm.addEventListener('submit', e=>{
    e.preventDefault()
    bookSessionForm(csrfBook, dateDesktop, bookAlertBox)
})

//tablet message
var messageFormTablet = document.getElementById("m-form-t")

document.getElementById("id_textMessage").setAttribute("id", "id_textMessage_tablet")
var messageTablet = document.getElementById("id_textMessage_tablet")

var csrfMessageTablet = document.getElementsByName("csrfmiddlewaretoken")[4]

messageFormTablet.addEventListener('submit', e=>{
    e.preventDefault()
    sendMessageForm(csrfMessageTablet, messageTablet)
})

// tablet booking
var bookAlertBoxTablet = document.getElementById('book-alert-box-t')
var bookFormTablet = document.getElementById("book-form-t")

document.getElementById("id_date").setAttribute("id", "id_date_tablet")
var dateTablet = document.getElementById("id_date_tablet")

csrfBookTablet = document.getElementsByName("csrfmiddlewaretoken")[5]

bookFormTablet.addEventListener('submit', e=>{
    e.preventDefault()
    bookSessionForm(csrfBookTablet, dateTablet, bookAlertBoxTablet)
})

// mobile message
var messageFormMobile = document.getElementById("m-form-m")

document.getElementById("id_textMessage").setAttribute("id", "id_textMessage_mobile")
var messageMobile = document.getElementById("id_textMessage_mobile")

var csrfMessageMobile = document.getElementsByName("csrfmiddlewaretoken")[6]

messageFormMobile.addEventListener('submit', e=>{
    e.preventDefault()
    sendMessageForm(csrfMessageMobile, messageMobile)
})

// mobile booking
var bookAlertBoxMobile = document.getElementById('book-alert-box-m')
var bookFormMobile = document.getElementById("book-form-m")

document.getElementById("id_date").setAttribute("id", "id_date_mobile")
var dateMobile = document.getElementById("id_date_mobile")

csrfBookMobile = document.getElementsByName("csrfmiddlewaretoken")[7]

bookFormMobile.addEventListener('submit', e=>{
    e.preventDefault()
    bookSessionForm(csrfBookMobile, dateMobile, bookAlertBoxMobile)
})