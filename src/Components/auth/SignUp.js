import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isbutton, setIsButton] = useState(true);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function changeButton() {
    email.includes("@") &&
    password1.length >= 8 &&
    password2.length >= 8 &&
    password1 === password2
      ? setIsButton(false)
      : setIsButton(true);
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };

  // const signUpSubmit = async () => {
  //   const email = emailRef.current.value;
  //   const password = passwordRef.current.value;
  //   const data = { email, password };

  //   try {
  //     const response = await axios.post(`https://www.pre-onboarding-selection-task.shop/auth/signup`, data, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.status === 201) {
  //       localStorage.setItem('access_token', response.data.access_token);
  //       alert('회원가입이 완료되었습니다.');
  //       navigate('/signin', { replace: true });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert('이미 존재하는 계정입니다.');
  //   }
  // };

  const signUpSubmit = async (e) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const res = await fetch(
        `https://www.pre-onboarding-selection-task.shop/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (res.status === 201) {
        alert("회원가입이 완료되었습니다.");
        navigate("/signin", { replace: true });
      }

      if (res.status === 400) {
        alert("이미 존재하는 계정입니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo", { replace: true });
    }
  }, [navigate]);

  return (
    <form onSubmit={onSubmit}>
      <InputWrapper>
        회원가입
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
            onClick={signUpSubmit}
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
