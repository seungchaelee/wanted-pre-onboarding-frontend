import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isbutton, setIsButton] = useState(true);
  const navigate = useNavigate();

  function changeButton() {
    email.includes("@") && password.length >= 1
      ? setIsButton(false)
      : setIsButton(true);
  }
  const onSubmit = e => {
    e.preventDefault();
  };

  async function signInSubmit() {
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post(`https://www.pre-onboarding-selection-task.shop/auth/signin`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }
      if (response.status === 200) {
        navigate('/todo', { replace: true });
      }
    } catch (error) {
      console.error(error);
      alert('존재하지 않는 계정입니다. 회원가입을 진행해주세요.');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/todo', { replace: true });
    }
  }, [navigate]);

  return (
    <form onSubmit={onSubmit}>
      <InputWrapper>
        <LabelWrapper>
          <input
            type="email"
            placeholder="이메일"
            data-testid="email-input"
            className="email-input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyUp={changeButton}
          />
        </LabelWrapper>
        <LabelWrapper>
          <input
            type="password"
            placeholder="비밀번호"
            data-testid="password-input"
            className="password-input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyUp={changeButton}
          />
        </LabelWrapper>
        <LabelWrapper>
          <button
            type="button"
            data-testid="signin-button"
            className="signin-button"
            disabled={isbutton}
            onClick={signInSubmit}
          >
            로그인
          </button>
        </LabelWrapper>
      </InputWrapper>
    </form>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin: 20px auto;
  width: 250px;
`;

const LabelWrapper = styled.label`
  position: relative;
  margin: 10px 30px;
`;
