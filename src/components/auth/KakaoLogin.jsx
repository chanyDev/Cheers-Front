import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as userAPI from 'api/user';
import {
  initializeError,
  loginFailure,
  loginSuccess,
} from 'redux/modules/user';

import StyledInput from 'components/common/StyledInput';

const KakaoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(null);

  const errMsg = useSelector(({ user }) => {
    const { errMsg } = user;
    return errMsg;
  });

  const changeNicnkName = (e) => {
    setNickname(e.target.value);
  };

  const handleContinueBtn = async () => {
    const kakaoToken = localStorage.getItem('kakaoToken');

    const payload = {
      kakaoToken,
      nickname,
    };
    const { data } = await userAPI.kakaoLogin(payload);

    try {
      localStorage.removeItem('kakaoToken');
      localStorage.setItem('accessToken', data.accessToken);
      dispatch(loginSuccess(data.accessToken));
      navigate('/');
    } catch (e) {
      const errInfo = {
        errMsg: data.msg,
        e,
      };
      dispatch(loginFailure(errInfo));
    }
  };

  useEffect(() => {
    dispatch(initializeError());
  }, [dispatch]);
  return (
    <KakaoLoginWrapper>
      <h2>카카오 로그인</h2>
      <h3>닉네임을 입력해 주세요</h3>
      <div className="input-container">
        <StyledInput
          id="nickNameInput"
          name="nickname"
          type="text"
          placeholder="닉네임"
          autoComplete="off"
          onChange={changeNicnkName}
        />
        <ErrorMessage>{errMsg}</ErrorMessage>
      </div>
      <button className="continue-btn" onClick={handleContinueBtn}>
        계속하기
      </button>
    </KakaoLoginWrapper>
  );
};

const KakaoLoginWrapper = styled.div`
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  h2 {
    font-size: 3rem;
    font-weight: 600;
  }
  h3 {
    font-size: 2.4rem;
  }
  .continue-btn {
    background-color: #fff47d;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
  }
`;

const ErrorMessage = styled.p`
  display: block;
  height: 2rem;
  padding-top: 0.5rem;
  color: red;
  line-height: 1.1rem;
`;

export default KakaoLogin;
