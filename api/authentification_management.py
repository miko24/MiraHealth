from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

SECRET_KEY= "fd756bfafe5a9a8b2194760d0c52642fb3c0f616a4347faf8fda55840400add3"
ALGORITHM = "HS256"
EXPIRATION_TIME = 24
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def get_password_hash(password):
    return pwd_context.hash(password)

def Verify_password(password, hashed_password):
    return pwd_context.verify(password,hashed_password)

def Create_Token(data: dict):
    data_to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=EXPIRATION_TIME)
    data_to_encode.update({"exp": expire})
    encoded_token = jwt.encode(data_to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_token

#print(get_password_hash("Abcd123?"))
#print(get_password_hash("admin"))

