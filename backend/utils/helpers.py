import hashlib, json
from datetime import datetime, timedelta, timezone
from flask import request, g
from extensions import db
from ..models.requests import TraceabilityLog
from ..models.amu import WithdrawalPeriod

def calculate_withdrawal_end_date(drug_name, species, start_date, duration_days):
  withdrawal_period = WithdrawalPeriod.query.filter_by(drug_name=drug_name, species=species).first()
  if withdrawal_period:
    end_date = start_date + timedelta(days=duration_days)
    withdrawal_end = end_date + timedelta(days=withdrawal_period.withdrawal_period_days)
    return withdrawal_end, withdrawal_period.withdrawal_period_days
  return None, None

def create_traceability_log(livestock_id, event_type, event_data):
  last_log = TraceabilityLog.query.filter_by(livestock_id=livestock_id).order_by(TraceabilityLog.timestamp.desc()).first()
  previous_hash = last_log.hash_value if last_log else "0"
  hash_data = {
    'livestock_id': livestock_id,
    'event_type': event_type,
    'event_data': event_data,
    'timestamp': datetime.now(timezone.utc).isoformat(),
    'previous_hash': previous_hash
  }
  current_hash = hashlib.sha256(json.dumps(hash_data, sort_keys=True).encode()).hexdigest()
  log = TraceabilityLog(
    livestock_id=livestock_id,
    event_type=event_type,
    event_data=event_data,
    performed_by=g.current_user.id,
    hash_value=current_hash,
    previous_hash=previous_hash,
    ip_address=request.remote_addr
  )
  db.session.add(log)
  return log

def generate_unique_id(prefix, length=10):
  import random, string
  timestamp = datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')
  random_suffix = ''.join(random.choices(string.digits + string.ascii_uppercase, k=length))
  return f"{prefix}{timestamp}{random_suffix}"

def paginate_query(query, page=1, per_page=20):
  return query.paginate(page=page, per_page=per_page, error_out=False)

def format_date(date_obj):
  return date_obj.isoformat() if date_obj else None

def format_datetime(datetime_obj):
  return datetime_obj.isoformat() if datetime_obj else None