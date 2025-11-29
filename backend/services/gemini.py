import os
import requests
from dotenv import load_dotenv

load_dotenv()

class GeminiAIService:
  def __init__(self):
    self.api_key = os.getenv('GEMINI_API_KEY')
    self.base_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

  def generate_insights(self, prompt, context_data=None):
    if not self.api_key: return {'error': 'Gemini API key not configured'}

    full_prompt = prompt
    if context_data: full_prompt = f"Context: {context_data}\n\nQuery: {prompt}"
    headers = {'Content-Type': 'application/json'}
    payload = {
      'contents': [{
        'parts': [{'text': full_prompt}]
      }]
    }

    try:
      response = requests.post(
        f"{self.base_url}?key={self.api_key}",
        headers=headers,
        json=payload,
        timeout=30
      )
      response.raise_for_status()
      result = response.json()      
      if 'candidates' in result and len(result['candidates']) > 0:
        text_content = result['candidates'][0]['content']['parts'][0]['text']
        return {'success': True, 'insights': text_content}
      else: return {'success': False, 'error': 'No response generated'}
    except requests.exceptions.RequestException as e: return {'success': False, 'error': str(e)}
  
  def analyze_amu_trends(self, regional_data):
    prompt = f"""
    Analyze the following antimicrobial usage data for livestock farming:
    
    Total Farms: {regional_data.get('total_farms', 0)}
    Total Livestock: {regional_data.get('total_livestock', 0)}
    AMU Records: {regional_data.get('amu_usage_count', 0)}
    MRL Violations: {regional_data.get('mrl_violations_count', 0)}
    Compliance Rate: {regional_data.get('compliance_rate', 0)}%
    
    Provide:
    1. Key trends and patterns
    2. Risk assessment
    3. Recommendations for improvement
    4. Compliance concerns if any
    
    Keep the response concise and actionable for government officials.
    """
    return self.generate_insights(prompt)
  
  def farmer_dashboard_insights(self, farmer_data):
    prompt = f"""
    Provide personalized insights for a livestock farmer:
    
    Farm Type: {farmer_data.get('farm_type')}
    Total Livestock: {farmer_data.get('total_livestock', 0)}
    Active Alerts: {farmer_data.get('active_alerts', 0)}
    Recent AMU Records: {farmer_data.get('recent_amu_count', 0)}
    
    Provide:
    1. Health management tips
    2. Drug usage best practices
    3. Immediate action items if alerts are present
    
    Keep it brief and farmer-friendly.
    """
    return self.generate_insights(prompt)
  
  def vet_consultation_summary(self, consultation_data):
    prompt = f"""
    Generate a summary for veterinary consultation:

    Livestock Species: {consultation_data.get('species')}
    Symptoms: {consultation_data.get('symptoms')}
    Health Status: {consultation_data.get('health_status')}
    Recent Medications: {consultation_data.get('recent_medications', [])}

    Provide:
    1. Preliminary assessment
    2. Suggested diagnostic steps
    3. Medication precautions

    This is for veterinary reference only.
    """
    return self.generate_insights(prompt)

gemini_service = GeminiAIService()