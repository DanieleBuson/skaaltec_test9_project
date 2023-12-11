import random
import re
import os
import pandas as pd
from datetime import datetime
import numpy as np
from scipy import signal
from fpdf import FPDF
import plotly.graph_objs as go
from plotly.subplots import make_subplots
import datetime
from webapp_test9.settings import BASE_DIR


# code generators # 

def patient_code_generator(length):
    characters = list("abcdefghijklmnopqrstuvwxyz")
    numbers = list('0123456789')
    characters.extend(numbers)

    random_append = "patient_"
    for i in range(length):
        random_append += random.choice(characters)
    
    return random_append

def analysis_code_generator(type_of_data, patient_id, date):
    return str(type_of_data) + "_id_" + str(patient_id) + "_date_" + str(date).replace("-", "") + "-000000"

 
# analysis data preprocessing #

def get_sensor_offsets(data_file = None, calibration_csv = None):
        df = pd.read_csv(data_file)
        df.columns = df.columns.str.strip()
        device_ID = df['Device_Id'].to_numpy()[0]
        
        calib_df = pd.read_csv(calibration_csv)
        calib_df.columns = calib_df.columns.str.strip()
        # calib_df['Date'] = pd.to_datetime(calib_df['Date'], format='%Y%m%d')
        # calib_df['Time'] = pd.to_datetime(calib_df['Time'], format = '%H%M%S').dt.time
        # calib_df['Datetime'] = calib_df.apply(lambda row: datetime.combine(row['Date'], row['Time']), axis=1)

        pattern = r"date(.*?)-"
        match = re.search(pattern, data_file)
        date = match.group(1).split("_")[1]
        pattern = r"-(.*?).csv"
        match = re.search(pattern, data_file)
        time = match.group(1)

        now_date = datetime.datetime.strptime(date, '%Y%m%d').date()
        now_time = datetime.datetime.strptime(time, '%H%M%S').time()
        now = datetime.datetime.combine(now_date, now_time)

        try:
            device_row = calib_df[calib_df['Device_ID'] == device_ID]
            
            
            if not device_row.empty:
                # print(device_row.iloc[device_row['Date']])
                # non funziona ma poco importa
                closest_row = device_row.iloc[(device_row['Datetime']-now).abs().idxmin()]
                offset_acc_x = closest_row['acc_x']
                offset_acc_y = closest_row['acc_y']
                offset_acc_z = closest_row['acc_z']
                offset_gyro_x = closest_row['gyro_x']
                offset_gyro_y = closest_row['gyro_y']
                offset_gyro_z = closest_row['gyro_z']
            else:
                offset_acc_x = 0.
                offset_acc_y = 0.
                offset_acc_z = 0.
                offset_gyro_x = 0.
                offset_gyro_y = 0.
                offset_gyro_z = 0.
        except:
            offset_acc_x = 0.
            offset_acc_y = 0.
            offset_acc_z = 0.
            offset_gyro_x = 0.
            offset_gyro_y = 0.
            offset_gyro_z = 0.
        return offset_acc_x, offset_acc_y, offset_acc_z, offset_gyro_x, offset_gyro_y, offset_gyro_z

class Kinematics:
    def __init__(self):
        NumberofMovements=None
        Avg_Duration = None
        Std_Duration = None
        Avg_Max_Velocity = None
        Std_Max_Velocity = None
        Avg_Mean_Velocity = None
        Std_Mean_Velocity = None
        Avg_Zero_Crossings = None
        Std_Zero_Crossings = None
        Avg_Distance_Traveled = None
        Std_Distance_Traveled = None
        Avg_Max_Acceleration = None
        Std_Max_Acceleration = None
        
    def getNumberofStates(self,state):
        diffstate = np.zeros((len(state),))
        diffstate[1:] = np.diff(state)
        truestate = np.zeros((len(state),))
        truestate[diffstate==1] = 1
        return np.sum(truestate)
    def fix_single_zero(self,arr):
        if len(arr) < 3:
            return arr
        for i in range(1, len(arr) - 1):
            if arr[i-1] == 1 and arr[i] == 0 and arr[i+1] == 1:
                arr[i] = 1
        return arr
    def fix_double_zero(self,arr):
        if len(arr) < 4:
            return arr
        for i in range(2, len(arr) - 1):
            if arr[i-2] == 1 and arr[i-1] == 0 and arr[i]==0 and arr[i+1] == 1:
                arr[i-1]==1
                arr[i] = 1
        return arr
    def getIndexesStartStop(self,state):
        diffstate = np.zeros((len(state),))
        diffstate[1:] = np.diff(state)
        startstate = np.zeros((len(state),))
        startstate[diffstate==1] = 1
        if state[0]==1:
            diffstate[0]=1
        if state[-1]==1:
            diffstate[-1]=-1
        starts = np.squeeze(np.argwhere(diffstate==1))
        stops = np.squeeze(np.argwhere(diffstate==-1))
        #concatenate starts and stops
        starts = np.array(starts, ndmin=1)
        stops = np.array(stops, ndmin=1)
        if len(starts)>len(stops):
            starts = starts[:-1]
        elif len(stops)>len(starts):
            stops = stops[1:]
        indexes_movement = np.zeros((len(starts),2))
        indexes_movement[:,0] = starts
        indexes_movement[:,1] = stops
        return indexes_movement
    def remove_short_intervals(self,intervals, min_length=30):
        lengths = intervals[:, 1] - intervals[:, 0]
        mask = lengths >= min_length
        filtered_intervals = intervals[mask]
        return filtered_intervals
    def filter_data(self,acc, gyro, low_pass_cutoff=10, band_pass_cutoff=[0.01, 8]):
        filtered_gyro = np.zeros((len(gyro),3))
        filtered_acc = np.zeros((len(acc),3))
        B2, A2 = signal.butter(2, np.array([0.01, 8])/(60/2), btype='bandpass')
        filtered_gyro[:,0] = signal.filtfilt(B2, A2, gyro[:,0])
        filtered_gyro[:,1] = signal.filtfilt(B2, A2, gyro[:,1])
        filtered_gyro[:,2] = signal.filtfilt(B2, A2, gyro[:,2])
        B, A = signal.butter(2, 10/(60/2), btype='lowpass')
        filtered_acc[:,0] = signal.filtfilt(B, A, acc[:,0])
        filtered_acc[:,1] = signal.filtfilt(B, A, acc[:,1])
        filtered_acc[:,2] = signal.filtfilt(B, A, acc[:,2])
        return filtered_acc, filtered_gyro
    def distance_traveled(self,positions):
        total_distance = 0
        for i in range(1, len(positions)):
            total_distance += abs(positions[i] - positions[i - 1])
        return total_distance
    def zero_crossings(self,acceleration_data, deadband):
        zero_cross_count = 0
        prev_data = acceleration_data[0]
        lim_reach = False
        for data in acceleration_data[1:]:
            if data > -deadband and data < deadband:
                lim_reach = True
                continue
            if (prev_data >= deadband and data <= -deadband) or (prev_data <= -deadband and data >= deadband):
                zero_cross_count += 1
                lim_reach = False
            # elif lim_reach and ((prev_data >= deadband and data >= deadband) or (prev_data <= -deadband and data <= deadband)):
            #     lim_reach = False
            #     zero_cross_count+=1
            prev_data = data
        return zero_cross_count
    
    def get_variables(self,input_file = str, calibration_file = str, display_vars = False):
        df = pd.read_csv(input_file)
        offset_acc_x, offset_acc_y, offset_acc_z, offset_gyro_x, offset_gyro_y, offset_gyro_z = get_sensor_offsets(input_file, calibration_csv = calibration_file)

        df.columns = df.columns.str.strip()
        t = df['Time'].to_numpy()
        t  = t - t[0]

        predictions = df['Prediction'].to_numpy()
        threshold  = df['Threshold'].to_numpy()
        space_bar = df['Space_Bar'].to_numpy()
        movement_classification = df['Movement_Classification'].to_numpy()
        stimulation_occur = df['Stimulator_State'].to_numpy()

        # print("predictions", predictions, "\n")
        # print("threshold", threshold, "\n")
        # print("space_bar", space_bar, "\n")
        # print("movement_classification", movement_classification, "\n")
        # print("stimulation_occur", stimulation_occur, "\n")
      
        indexes_movement = self.getIndexesStartStop(movement_classification)
        indexes_stimulation = self.getIndexesStartStop(stimulation_occur)
        indexes_space_bar = self.getIndexesStartStop(space_bar)
        # indexes_movement = self.remove_short_intervals(indexes_movement, min_length=30)
        num_stimulations = self.getNumberofStates(stimulation_occur)
        num_movement = self.getNumberofStates(movement_classification)
        num_space_bar = self.getNumberofStates(space_bar)

        # print("indexes_movement", indexes_movement, "\n")
        # print("indexes_stimulation", indexes_stimulation, "\n")
        # print("indexes_space_bar", indexes_space_bar, "\n")
        # print("num movement", num_movement, "\n")
        # print("num stimulations", num_stimulations, "\n")
        # print("num_space_bar", num_space_bar, "\n")
        # qualche problema di vettori vuoti!
        
        acc = np.zeros((len(t),3))
        gyro = np.zeros((len(t),3))
        acc[:,0] = df['acc_x'].to_numpy() - offset_acc_x
        acc[:,1] = df['acc_y'].to_numpy() - offset_acc_y
        acc[:,2] = df['acc_z'].to_numpy() - offset_acc_z
        gyro[:,0] = df['gyro_x'].to_numpy()
        gyro[:,1] = df['gyro_y'].to_numpy()
        gyro[:,2] = df['gyro_z'].to_numpy()
        est_gravity = np.zeros((3,))
        est_gravity[0] = np.mean(acc[:120,0])
        est_gravity[1] = np.mean(acc[:120,1])
        est_gravity[2] = np.mean(acc[:120,2])

        # acc, gyro and est_gravity are okay!

        gravity = np.linalg.norm(est_gravity)
        filtered_acc, filtered_gyro = self.filter_data(acc, gyro, low_pass_cutoff=8, band_pass_cutoff=[0.01, 8])
        mag_acc = np.linalg.norm(acc,axis=1) - 9.81
        B, A = signal.butter(2, np.array([0.1,5])/(60/2), btype='bandpass')
        filtered_mag_acc = signal.filtfilt(B,A, np.abs(np.linalg.norm(acc,axis=1) - 9.81))
        filtered_mag_acc_grav = signal.filtfilt(B,A, (np.linalg.norm(acc,axis=1) - 9.81))
        
        # print("filtered_mag_acc", len(filtered_mag_acc), "\n", filtered_mag_acc)
        #acc, gyro filtered correctly

        look_back_size = 15
        adjusted_movement_indexes = np.zeros((len(indexes_movement),2))
        adjusted_movement_classifcation = np.zeros((len(movement_classification),))

        # print(adjusted_movement_indexes)
        # print(adjusted_movement_classifcation)

        for k in range(len(indexes_movement)):
            if indexes_movement[k,0] < look_back_size:
                # print("inside", filtered_mag_acc[int(0):int(indexes_movement[k,0])])
                index = np.argmin(filtered_mag_acc[int(0):int(indexes_movement[k,0])])
                index_forwards = np.argmin(filtered_mag_acc[int(indexes_movement[k,0]):int(indexes_movement[k,0]+look_back_size)])
            else:
                index = np.argmin(filtered_mag_acc[int(indexes_movement[k,0]-look_back_size):int(indexes_movement[k,0])])
                index_forwards = np.argmin(filtered_mag_acc[int(indexes_movement[k,0]):int(indexes_movement[k,0]+look_back_size)])
            
            adjusted_movement_indexes[k,0] = int(indexes_movement[k,0]-look_back_size+index)
            adjusted_movement_indexes[k,1] = int(indexes_movement[k,1])
            adjusted_movement_classifcation[int(adjusted_movement_indexes[k,0]):int(adjusted_movement_indexes[k,1])] = 1

        # print("adjusted_movement_indexes", adjusted_movement_indexes, "\n")
        # print("adjusted_movement_classification", adjusted_movement_classifcation, "\n")

        max_velocity = np.zeros((len(adjusted_movement_indexes),))
        mean_velocity = np.zeros((len(adjusted_movement_indexes),))
        number_zero_crossings = np.zeros((len(adjusted_movement_indexes),))
        distance_traveled_traj = np.zeros((len(adjusted_movement_indexes),))
        length_trial = np.zeros((len(adjusted_movement_indexes),))
        max_acceleration = np.zeros((len(adjusted_movement_indexes),))
        for k in range(len(adjusted_movement_indexes)):
            if int(adjusted_movement_indexes[k,0]) > int(adjusted_movement_indexes[k,1]):
                temp = [0]
            elif int(adjusted_movement_indexes[k,0])<0:
                temp = filtered_mag_acc_grav[int(0):int(adjusted_movement_indexes[k,1])]
            else:
                temp = filtered_mag_acc_grav[int(adjusted_movement_indexes[k,0]):int(adjusted_movement_indexes[k,1])]
            length_trial[k] = len(temp)*(1/60)
            max_acceleration[k] = np.max(np.abs(temp))
            vel = np.zeros((len(temp)))
            for i in range(1,len(temp)):
                # if temp[i]<0.25 and temp[i]>-0.25:
                #     vel[i] = 0
                # else:
                vel[i] = vel[i-1]+temp[i]*(1/60)
            pos = np.zeros((len(temp)))
            for i in range(1,len(temp)):
                pos[i] = pos[i-1]+vel[i]*(1/60)
            distance_traveled_traj[k] = self.distance_traveled(pos)
            temp_integral = vel
            raw_integral = vel.copy()
            temp_integral = np.abs(temp_integral - temp_integral[0])
            max_velocity[k] = np.max(temp_integral)
            mean_velocity[k] = np.mean(temp_integral)
            number_zero_crossings[k] = self.zero_crossings(temp, 0.1)
            a = 1
        if display_vars:
            print("Number of movement greater than 0.5Sec: ", np.size(indexes_movement,0))
            print("Number of stimulations: ", num_stimulations)
            print("Number of space bar presses: ", num_space_bar)
            print("Mean duration of trial: " + str(np.round(np.mean(length_trial),2))+ "+/-" + str(np.round(np.std(length_trial),2))+ " seconds")
            print("Mean max velocity: " + str(np.round(np.mean(max_velocity),2))+ "+/-" + str(np.round(np.std(max_velocity),2))+ " m/s")
            print("Mean mean velocity: " + str(np.round(np.mean(mean_velocity),2))+ "+/-" + str(np.round(np.std(mean_velocity),2))+ " m/s")
            print("Mean number of zero crossings: " + str(np.round(np.mean(number_zero_crossings),2))+ "+/-" + str(np.round(np.std(number_zero_crossings),2)))
            print("Mean distance traveled: " + str(np.round(np.mean(distance_traveled_traj),2))+ "+/-" + str(np.round(np.std(distance_traveled_traj),2))+ " m")
        
        Session = Kinematics()
        Session.NumberofMovements = np.size(indexes_movement,0)
        Session.Avg_Duration = np.round(np.mean(length_trial),2)
        Session.Std_Duration = np.round(np.std(length_trial),2)
        Session.Avg_Max_Velocity = np.round(np.mean(max_velocity),2)
        Session.Std_Max_Velocity = np.round(np.std(max_velocity),2)
        Session.Avg_Mean_Velocity = np.round(np.mean(mean_velocity),2)
        Session.Std_Mean_Velocity = np.round(np.std(mean_velocity),2)
        Session.Avg_Zero_Crossings = np.round(np.mean(number_zero_crossings),2)
        Session.Std_Zero_Crossings = np.round(np.std(number_zero_crossings),2)
        Session.Avg_Distance_Traveled = np.round(np.mean(distance_traveled_traj),2)
        Session.Std_Distance_Traveled = np.round(np.std(distance_traveled_traj),2)
        Session.Avg_Max_Acceleration = np.round(np.mean(max_acceleration),2)
        Session.Std_Max_Acceleration = np.round(np.std(max_acceleration),2)
        return Session
    
list_of_files = os.listdir("media/static/skaaltec_test9/IMU/")
# this function works only in the case of data in the form specified (imu_id_{{ id }}_date_{{ date }}-{{ time }}.csv)
def patient_data(list_of_files, patient_pk):
    list_of_patient_files = []
    for file in list_of_files:
        if not file.startswith("imu"):
            continue
        else:
            patient_id = file.split("id_",2)[1].split("_", 2)[0]
            if int(patient_id) == patient_pk:
                list_of_patient_files.append(file)
            # else: print("no match")
    
    return list_of_patient_files


def extract_dates(list_of_patient_files):
    dict_analysis = {}
    for file in list_of_patient_files:
        if not file.startswith("imu"):
            continue
        else:
            date = file.split("_")[-1].split("-")[0]
            print(date)
            exact_date = datetime.datetime.strptime(date, '%Y%m%d').date()
            dict_analysis[str(exact_date)] = file
    return dict_analysis



def create_pdf(patient, therapist, dates, number_of_movements):
    # Create PDF
    pdf = FPDF()
    pdf.add_page()

    # Add logo
    pdf.image("static/skaaltec.png", 10, 8, 33)

    # Add therapist information
    pdf.set_font("Arial", "B", 12)
    pdf.cell(100)
    pdf.cell(0, 10, "Therapist Information", ln=True)
    pdf.ln(10)
    pdf.cell(100)
    pdf.cell(0, 10, f"Name: {therapist.name} {therapist.surname}", ln=True)
    pdf.cell(100)
    pdf.cell(0, 10, f"Email: {therapist.mail}", ln=True)
    pdf.cell(100)
    pdf.cell(0, 10, f"Phone: {therapist.phoneNumber}", ln=True)

    # Add line to separate sections
    pdf.ln(10)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(10)

    # Add patient information
    pdf.set_font("Arial", "B", 12)
    pdf.cell(100)
    pdf.cell(0, 10, "Patient Information", ln=True)
    pdf.ln(10)
    pdf.cell(100)
    pdf.cell(0, 10, f"Name: {patient.name} {patient.surname}", ln=True)
    pdf.cell(100)
    pdf.cell(0, 10, f"Age: {patient.age}", ln=True)
    pdf.cell(100)
    pdf.cell(0, 10, f"Email contact: {patient.mail}", ln=True)

    # Add line to separate sections
    pdf.ln(10)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(10)

    # Add Plotly graph
    fig = make_subplots(rows=1, cols=1)
    fig.add_trace(go.Scatter(x=dates, y=number_of_movements, mode='lines+markers', name='Number of Movements'))
    fig.update_layout(width=500, height=250)
    graph_filename = "graph.png"
    fig.write_image(graph_filename)

    pdf.image(graph_filename, x=10, y=pdf.get_y(), w=0, h=0)
    pdf.ln(120)  # Adjust as needed

    # Add definition
    pdf.set_font("Arial", "", 12)
    definition = "Number of movements in the context of sensors and healthcare refers to the count of physical actions or changes recorded by sensors. In the context of therapy for stroke patients, it helps monitor and analyze the patient's motor activities and progress."
    pdf.multi_cell(0, 10, definition)

    all_files = os.listdir(BASE_DIR)

    # Iterate through the files and delete those with the specified name
    for file in all_files:
        if file == f"{patient.id}_therapy_report.pdf":
            file_path = os.path.join(BASE_DIR, file)
            os.remove(file_path)
            print(f"Deleted file: {file_path}")

    # Save the PDF
    pdf.output(f"{patient.id}_therapy_report.pdf")