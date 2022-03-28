import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

import ModalWrapper from 'components/common/ModalWrapper';
import LoginForm from 'components/user/LoginForm';
import RegistForm from 'components/user/RegistForm';
import { useDispatch, useSelector } from 'react-redux';
import { initializeModal } from 'redux/modules/modal';

const UserModal = () => {
  const dispatch = useDispatch();

  const userModal = useSelector(({ modal }) => {
    return modal.userModal;
  });

  const closeModal = () => {
    dispatch(initializeModal());
  };
  return (
    <ModalWrapper>
      <ModalContentWrapper>
        <CloseOutlined className="close-btn" onClick={closeModal} />
        {userModal.loginModal && (
          <>
            <h2 className="modal-title">로그인</h2>
            <LoginForm />
          </>
        )}

        {userModal.registModal && (
          <>
            <h2 className="modal-title">회원가입</h2>
            <RegistForm />
          </>
        )}
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

const ModalContentWrapper = styled.div`
  width: 400px;
  padding: 2rem;
  border-radius: 0.5rem;

  position: relative;

  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .close-btn {
    font-size: 1.4rem;
    background-color: #fff;
    color: #000;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    * {
      pointer-events: none;
    }
  }

  .modal-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

export default UserModal;
