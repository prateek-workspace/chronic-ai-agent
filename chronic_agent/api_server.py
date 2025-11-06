from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from dotenv import load_dotenv

# Import your agent app and data loader
from agent.graph import app as agent_app
from agent.utils import load_patient_data
from agent.state import AgentState # We'll use this for the response model

# Initialize FastAPI
app = FastAPI(
    title="Chronic AI Health Agent",
    description="An API for running the agentic health monitor."
)

# Load environment variables (like GOOGLE_API_KEY)
load_dotenv()

# Define the input data model for the API request
class PatientRequest(BaseModel):
    patient_id: str

@app.post("/run_agent", response_model=AgentState)
async def run_agent(request: PatientRequest):
    """
    Run the health agent for a specific patient.
    """
    
    # 1. Load the patient data
    patient_profile, full_data_stream = load_patient_data(request.patient_id)
    
    if not patient_profile or not full_data_stream:
        raise HTTPException(
            status_code=404, 
            detail=f"Patient data not found for ID: {request.patient_id}"
        )

    # 2. Define the agent inputs
    inputs = {
        "patient_profile": patient_profile,
        "full_data_stream": full_data_stream
    }

    print(f"--- API: Running agent for {request.patient_id} ---")
    
    # 3. Run the agent and get the final state
    # We use .invoke() here to get the final result, not .stream()
    try:
        final_state = agent_app.invoke(inputs)
    except Exception as e:
        print(f"Agent run failed: {e}")
        raise HTTPException(status_code=500, detail=f"Agent error: {e}")

    print("--- API: Agent run complete ---")
    
    # 4. Return the final state as JSON
    return final_state

if __name__ == "__main__":
    # This allows you to run the server with: python api_server.py
    uvicorn.run(app, host="0.0.0.0", port=8000)