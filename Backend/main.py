from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from model import User  # User 모델 (SQLAlchemy 모델 정의 필요)
from database import engine, SessionLocal, Base
from pydantic import BaseModel ## data 검증과 세팅 관리
from fastapi.middleware.cors import CORSMiddleware # 브라우저는 사용자 본인이 아닌 코드들을 파싱함. 브라우저에는 인증정보가 저장됨. 
from datetime import timedelta, datetime
from jose import jwt, JWTError
from passlib.context import CryptContext

# 데이터베이스 테이블 자동 생성 => User 모델이 테이블로 변환되어 DB 반영
Base.metadata.create_all(bind=engine)

# FastAPI 인스턴스
app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 개발 서버 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 비밀번호 해싱 및 검증 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# 해싱: 특정 입력값에 대해 해쉬함수를 거치면서 특정한 데이터를 생성하는 작업.
# 사용자의 비밀번호를 암호화. 해싱된 비밀번호만 DB에 저장

# JWT 설정
SECRET_KEY = "secret_key_example"  # 실제 프로덕션에서는 안전한 키 사용
ALGORITHM = "HS256" # secret_key 사용하여 HS256알고리즘으로 인코딩. 생성된 토큰을 클라이언트에게 전송. 클라이언트 요청 시 JWT를 함께 전송하여 인증 요구
# HS256 : 대칭키 암호화 방식. 같은키를 사용해 암호화,복호화 수행.
ACCESS_TOKEN_EXPIRE_MINUTES = 30
 
# 데이터베이스 연결 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic 요청 모델
class UserRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

# 비밀번호 해싱 함수
def hash_password(password: str):
    return pwd_context.hash(password)

# 비밀번호 검증 함수
def verify_password(plain_password, hashed_password): # 사용자가 입력한 비밀번호와 DB에 해싱되어 저장된 비밀번호를 비교
    return pwd_context.verify(plain_password, hashed_password)

# JWT 토큰 생성 함수
def create_access_token(data: dict, expires_delta: timedelta = None): # 로그인 성공 시, JWT토큰 발급. 토큰에는 사용자 정보와 만료 시간 포함.
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else: 
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# 루트 엔드포인트
@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI server"}

# 로그인 엔드포인트
@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user.username}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}


# 회원가입 엔드포인트
@app.post("/register")
def register(user: UserRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_password = hash_password(user.password)
    new_user = User(username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    return {"message": "User registered successfully"}
# pydantic 으로 요청 데이터를 검증
# DB에서 사용자 조회
# 비밀번호 검증 후, 일치 시 토큰 생성. 불일치 시 400에러 반환
