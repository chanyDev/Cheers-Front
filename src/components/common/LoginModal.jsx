import React from 'react';

import styled from 'styled-components';

import ModalWrapper from './ModalWrapper';

const LoginModal = ({ modalState, handleModal }) => {
  const {
    REACT_APP_KAKAO_API_KEY: KAKAO_API_KEY,
    REACT_APP_REDIRECT_URI: REDIRECT_URI,
  } = process.env;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <ModalWrapper handleModal={handleModal}>
      <ModalContentWrapper modalState={modalState}>
        <button className="close-btn modal">x</button>
        <h2>Lemon Alcohol</h2>
        <LoginForm autoComplete="off">
          <div className="login-info">
            <Input
              id="userId"
              type="text"
              placeholder="아이디를 입력해주세요"
            />
            <Input
              id="userPw"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <div className="btn-box">
            <button type="submit" className="login-btn">
              로그인
            </button>
          </div>
        </LoginForm>
        <a href={`${KAKAO_AUTH_URL}`}>카카오 로그인</a>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

const ModalContentWrapper = styled.div`
  width: 500px;
  padding: 2rem;
  border-radius: 0.5rem;

  position: relative;

  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  .close-btn {
    background-color: #fff;
    color: #000;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  .login-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      font-size: 1.4rem;
    }
  }
`;

const Input = styled.input`
  border: 1px solid black;
  font-size: 1.2rem;
  ::placeholder {
    font-size: 1rem;
  }
`;
export default LoginModal;
