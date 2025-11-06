import os
from agent.state import AgentState
from datetime import datetime

def save_report_to_file(state: AgentState):
    """
    Node 3.5 (Conditional): Saves the generated report to a text file.
    """
    print("--- Node: save_report_to_file ---")
    
    report_content = state.get("doctor_file_report")
    if not report_content:
        print("No report content to save.")
        return {}

    # This saves the report to the /doctor_reports folder at the project root
    output_dir = "doctor_reports"
    os.makedirs(output_dir, exist_ok=True)
    
    patient_name = state['patient_profile'].get('name', 'patient').split(' ')[0]
    date_str = datetime.now().strftime("%Y_%m_%d")
    filename = f"report_{patient_name}_{date_str}.txt"
    filepath = os.path.join(output_dir, filename)
    
    try:
        with open(filepath, "w") as f:
            f.write(report_content)
        print(f"Successfully saved report to: {filepath}")
    except Exception as e:
        print(f"Error saving report file: {e}")
        
    return {}


def dispatch_notifications(state: AgentState):
    """
    Node 4 (Terminal): "Sends" all generated messages.
    """
    print("--- Node: dispatch_notifications ---")
    
    # 1. Send message to patient
    patient_message = state['message_to_patient']
    print("=" * 30)
    print(f"MESSAGE TO PATIENT ({state['patient_profile']['name']}):")
    print(patient_message)
    print("=" * 30)

    # 2. Send alert to doctor (if it exists)
    if state.get("message_to_doctor"):
        doctor_message = state['message_to_doctor']
        doctor_report = state['summary_report']
        
        print("\n" + "=" * 30)
        print(f"ALERT TO DOCTOR ({state['patient_profile']['doctor_id']}):")
        print(f"Push Notification: {doctor_message}")
        print("\n--- Dashboard Summary ---")
        print(doctor_report)
        print("\n(Detailed .txt report saved to /doctor_reports folder)")
        print("=" * 30)
        
    return {}