import httpx
import sys

URL = "http://localhost:8000/api/auth/login"

CREDENTIALS = [
    {"role": "admin", "identifier": "admin", "password": "Admin@123"},
    {"role": "hod", "identifier": "hod", "password": "HOD@123"},
    {"role": "faculty", "identifier": "faculty", "password": "Faculty@123"},
    {"role": "student", "identifier": "student", "password": "Student@123"}
]

def verify():
    all_success = True
    print("Starting Login Credentials Verification...")
    print("-" * 50)
    
    with httpx.Client() as client:
        for cred in CREDENTIALS:
            payload = {
                "identifier": cred["identifier"],
                "password": cred["password"],
                "role": cred["role"]
            }
            try:
                response = client.post(URL, json=payload)
                if response.status_code == 200:
                    data = response.json()
                    print(f"✅ SUCCESS: Role '{cred['role']}' logged in successfully.")
                    print(f"   Name: {data.get('name')}")
                    print(f"   Token Type: {data.get('token_type')}")
                    print(f"   Access Token: {data.get('access_token')[:20]}... [TRUNCATED]")
                else:
                    all_success = False
                    print(f"❌ FAILED: Role '{cred['role']}' login failed with Status Code {response.status_code}.")
                    print(f"   Details: {response.text}")
            except Exception as e:
                all_success = False
                print(f"💥 ERROR: Could not connect to backend server for Role '{cred['role']}'.")
                print(f"   Exception: {e}")
            print("-" * 50)
            
    if all_success:
        print("🎉 Verification Complete: All 4 credentials are 100% valid!")
        sys.exit(0)
    else:
        print("⚠️ Verification Failed: One or more credentials failed validation.")
        sys.exit(1)

if __name__ == "__main__":
    verify()
