import pytest
from ...backend.utils.encryption import aadhaar_encryption, AadhaarEncryption

class TestAadhaarEncryption:
  def test_encrypt_valid_aadhaar(self):
    aadhaar = '123456789012'
    encrypted = aadhaar_encryption.encrypt_aadhaar(aadhaar)
    
    assert encrypted is not None
    assert encrypted != aadhaar
    assert len(encrypted) > len(aadhaar)
  
  def test_decrypt_aadhaar(self):
    aadhaar = '123456789012'
    encrypted = aadhaar_encryption.encrypt_aadhaar(aadhaar)
    decrypted = aadhaar_encryption.decrypt_aadhaar(encrypted)
    
    assert decrypted == aadhaar
  
  def test_encrypt_decrypt_roundtrip(self):
    test_aadhaar_numbers = ['123456789012', '987654321098', '111122223333']
    
    for aadhaar in test_aadhaar_numbers:
      encrypted = aadhaar_encryption.encrypt_aadhaar(aadhaar)
      decrypted = aadhaar_encryption.decrypt_aadhaar(encrypted)
      assert decrypted == aadhaar
  
  def test_encrypt_aadhaar_with_spaces(self):
    aadhaar = '1234 5678 9012'
    encrypted = aadhaar_encryption.encrypt_aadhaar(aadhaar)
    decrypted = aadhaar_encryption.decrypt_aadhaar(encrypted)
    
    assert decrypted == '123456789012'
  
  def test_encrypt_aadhaar_with_hyphens(self):
    aadhaar = '1234-5678-9012'
    encrypted = aadhaar_encryption.encrypt_aadhaar(aadhaar)
    decrypted = aadhaar_encryption.decrypt_aadhaar(encrypted)
    
    assert decrypted == '123456789012'
  
  def test_invalid_aadhaar_length(self):
    invalid_aadhaar = '12345'
    
    with pytest.raises(ValueError, match='Invalid Aadhaar number format'):
      aadhaar_encryption.encrypt_aadhaar(invalid_aadhaar)
  
  def test_invalid_aadhaar_non_numeric(self):
    invalid_aadhaar = '12345678901A'
    
    with pytest.raises(ValueError, match='Invalid Aadhaar number format'):
      aadhaar_encryption.encrypt_aadhaar(invalid_aadhaar)
  
  def test_encrypt_none(self):
    result = aadhaar_encryption.encrypt_aadhaar(None)
    assert result is None
  
  def test_decrypt_none(self):
    result = aadhaar_encryption.decrypt_aadhaar(None)
    assert result is None
  
  def test_encrypt_empty_string(self):
    result = aadhaar_encryption.encrypt_aadhaar('')
    assert result is None
  
  def test_validate_aadhaar_correct_length(self):
    assert aadhaar_encryption._validate_aadhaar('123456789012') == True
  
  def test_validate_aadhaar_with_formatting(self):
    assert aadhaar_encryption._validate_aadhaar('1234 5678 9012') == True
    assert aadhaar_encryption._validate_aadhaar('1234-5678-9012') == True
  
  def test_validate_aadhaar_incorrect_length(self):
    assert aadhaar_encryption._validate_aadhaar('12345') == False
    assert aadhaar_encryption._validate_aadhaar('1234567890123') == False
  
  def test_validate_aadhaar_non_numeric(self):
    assert aadhaar_encryption._validate_aadhaar('12345678901A') == False
  
  def test_different_encryptions_same_input(self):
    aadhaar = '123456789012'
    encrypted1 = aadhaar_encryption.encrypt_aadhaar(aadhaar)
    encrypted2 = aadhaar_encryption.encrypt_aadhaar(aadhaar)
    
    assert encrypted1 == encrypted2
  
  def test_encryption_instance(self):
    custom_encryption = AadhaarEncryption()
    aadhaar = '123456789012'
    
    encrypted = custom_encryption.encrypt_aadhaar(aadhaar)
    decrypted = custom_encryption.decrypt_aadhaar(encrypted)
    
    assert decrypted == aadhaar