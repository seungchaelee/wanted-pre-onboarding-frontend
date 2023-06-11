import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isbutton, setIsButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function changeButton() {
    email.includes("@") && password1.length >= 8 && password2.length >= 8
      ? setIsButton(false)
      : setIsButton(true);
  }

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    if (!isLoading && emailRef.current && passwordRef.current) {
      setIsLoading(true);

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const res = await fetch(`http://localhost:3001/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        if (password1 === password2) {
          alert(`${email}로 회원가입 완료`);
          navigate(`/signin`);
          setIsLoading(false);
        } else {
          alert("비번 확인 바람");
        }
      }
      const data = await res.json();

      return data;
    }
  };

  return (
    <form onSubmit={onSubmitHandle}>
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
            ref={emailRef}
          />
        </LabelWrapper>
        <LabelWrapper>
          <input
            type="password"
            placeholder="비밀번호"
            data-testid="password-input"
            className="lassword-input"
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
            onKeyUp={changeButton}
            ref={passwordRef}
          />
        </LabelWrapper>
        <LabelWrapper>
          <input
            type="password"
            placeholder="비밀번호 확인"
            data-testid="password-input"
            className="lassword-input"
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            onKeyUp={changeButton}
          />
        </LabelWrapper>
        <LabelWrapper>
          <button
            type="submit"
            data-testid="signup-button"
            className="signup-button"
            disabled={isbutton}
          >
            회원가입
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
