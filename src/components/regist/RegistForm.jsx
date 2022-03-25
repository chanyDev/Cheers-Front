import React, { useState } from 'react';
import styled from 'styled-components';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as userAPI from 'api/user';

import Avatar from 'components/regist/Avatar';
import StyledInput from 'components/common/StyledInput';
import registSchema from 'utils/validation/registSchema';

const RegistForm = () => {
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(registSchema) });

  const handleVisible = () => {
    setVisible(!visible);
  };

  const convertToFormData = (data) => {
    const { userId, userPw, repeatPw, nickname, profileImg } = data;

    const formData = new FormData();

    formData.append('profileImg', profileImg[0]);
    formData.append('userId', userId);
    formData.append('userPw', userPw);
    formData.append('repeatPw', repeatPw);
    formData.append('nickname', nickname);

    return formData;
  };

  const onSubmit = (data) => {
    const formData = convertToFormData(data);
    userAPI.regist(formData);
  };

  return (
    <RegistFormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="regist-form">
        <Avatar register={register} />
        <div className="input-container">
          <label className="over-text" htmlFor="idInput">
            이메일(아이디)
          </label>
          <StyledInput
            {...register('userId')}
            id="idInput"
            className="regist-input"
            name="userId"
            type="text"
            placeholder="이메일"
          />
          <ErrorMessage>
            {errors.userId && '이메일 형식의 아이디를 입력해주세요.'}
          </ErrorMessage>
        </div>
        <div className="input-container">
          <label className="over-text" htmlFor="nickNameInput">
            닉네임
          </label>
          <StyledInput
            {...register('nickname')}
            id="nickNameInput"
            className="regist-input"
            name="nickname"
            type="text"
            placeholder="닉네임"
          />
          <ErrorMessage>
            {errors.nickname && '닉네임은 2~10 글자로 입력해주세요.'}
          </ErrorMessage>
        </div>
        <div className="input-container">
          <label className="over-text" htmlFor="pwInput">
            비밀번호
          </label>
          <div className="password-container">
            <StyledInput
              style={{ position: 'relative' }}
              {...register('userPw')}
              id="pwInput"
              className="regist-input"
              name="userPw"
              type={visible ? 'text' : 'password'}
              placeholder="비밀번호"
            />
            <button onClick={handleVisible} className="toggle-btn">
              {visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          </div>
          <ErrorMessage>
            {errors.userPw &&
              '비밀번호는 숫자, 영문, 특수문자 1자 이상 조합으로 8~20자로 입력해주세요.'}
          </ErrorMessage>
        </div>
        <div className="input-container">
          <label className="over-text" htmlFor="repeatPw">
            비밀번호 확인
          </label>
          <StyledInput
            {...register('repeatPw')}
            id="repeatPw"
            className="regist-input"
            name="repeatPw"
            type="password"
            placeholder="비밀번호 확인"
          />
          <ErrorMessage>
            {errors.repeatPw && '비밀번호를 확인해주세요.'}
          </ErrorMessage>
        </div>
        <button className="regist-btn">회원가입</button>
      </form>
    </RegistFormWrapper>
  );
};

const RegistFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  .input-container {
    margin-top: 1rem;
    position: relative;
  }

  .over-text {
    display: block;
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }

  .password-container {
    position: relative;
  }

  .toggle-btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 1.6rem;
    color: #ccc;
    background-color: inherit;
  }

  .regist-btn {
    width: 100%;
    margin-top: 2rem;
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

export default RegistForm;
