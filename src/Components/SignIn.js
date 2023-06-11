import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isbutton, setIsButton] = useState(true);
  const navigate = useNavigate();

  function changeButton() {
    email.includes('@') && password.length >= 1 ? setIsButton(false) : setIsButton(true);
  }

  return (
    <form>
      <InputWrapper>
        <LabelWrapper>
          <input
            type="email"
            placeholder="이메일"
            data-testid="email-input"
            className="email-input"
            onChange={e => {
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
            onChange={e => {
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
            onClick={() => {
              alert(`${email}로 로그인 환영합니다.`);
              navigate('/todo');
            }}
          >로그인</button>
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
