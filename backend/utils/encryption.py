from cryptography.fernet import Fernet
import os
from dotenv import load_dotenv

load_dotenv()

class AadhaarEncryption:
  def __init__(self):
    encryption_key = os.getenv('AADHAAR_ENCRYPTION_KEY')
    if not encryption_key:
      encryption_key = Fernet.generate_key().decode()
      print(f"Generated new encryption key: {encryption_key}")
      print("Add this to your .env file as AADHAAR_ENCRYPTION_KEY")
    else: encryption_key = encryption_key.encode()
    self.cipher = Fernet(encryption_key)

  def encrypt_aadhaar(self, aadhaar_number):
    if not aadhaar_number: return None
    aadhaar_str = str(aadhaar_number).strip()
    if not self._validate_aadhaar(aadhaar_str): raise ValueError("Invalid Aadhaar number format")
    encrypted = self.cipher.encrypt(aadhaar_str.encode())
    return encrypted.decode()

  def decrypt_aadhaar(self, encrypted_aadhaar):
    if not encrypted_aadhaar: return None
    decrypted = self.cipher.decrypt(encrypted_aadhaar.encode())
    return decrypted.decode()
  
  def _validate_aadhaar(self, aadhaar):
    aadhaar_clean = aadhaar.replace(' ', '').replace('-', '')
    if len(aadhaar_clean) != 12: return False
    if not aadhaar_clean.isdigit(): return False
    return True

aadhaar_encryption = AadhaarEncryption()