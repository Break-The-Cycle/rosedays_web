import { Link } from "react-router-dom";
import { React, useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import {  NavLink,useLocation,useNavigate } from "react-router-dom";
export function SignUp() {
  const [cookies, setCookie, removeCookie] = useCookies(["default"]);
  const navigate = useNavigate();
  function onChangeSignUp(e) {
    console.log("e_onchange",e)
    
    const value = e.target.value
    const name = e.target.name
    console.log("value",value)
    console.log("name",name)    
    setSignUpInfo({...signUpInfo,[name]:value}); // 이전 정보들은 넣어놓고, id면 id 만 pw면 pw만 바꿔서 갱신하기
    // 이렇게 전역 id/pw값을 계속 갱신하고, 제줄버튼을 누르게 되면 전역 id/pw를 post하기
  }
  function gotoin(){
    console.log("1")
    navigate('/auth/sign-in',{
     
    })
  }
  function handleSignUpSubmit(e) {
    console.log(e)
    e.preventDefault();
    console.log("id/pw/sk",id,password,specialKey,userName,userPhone)

    // 여기서 post하기
    let temp = "police8"
    let posturl = "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/";
    let posturl_set = posturl + "auth/register/manage-person";
    console.log("posturl:", posturl_set);
    if(id == "police1"){
      temp = "police8"
    }else{
      temp = id
    }
    let data_t = {
      "name": userName,
      "phoneNumber": userPhone,
      "loginId": temp,
      "password": password,
      "password2": password,
      "manageDivision": "POLICE_OFFICER",
      "address": {
        "division": "KOREA_GYEONGGIDO",
        "postalNumber": "12345",
        "sido": "고양시",
        "sigungu": "일산동구",
        "eupmyeondong": "일동",
        "li": "string",
        "island": "string",
        "bungee": "string",
        "detail": "일산동부 경찰서"
      },
      "officialInstitutionId": 1,
      "department": "외사계",
      "position": "경감",
      "description": "안녕하세요 OOO입니다. 일산 동부 경찰서에서 근무중입니다."
    }

    axios
      .post(posturl_set, data_t)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        setCookie("cookie", response.data.data.id);

        window.location.href="/sign-in";
        gotoin()
      })
      
      .catch((error) => {
        alert("아이디와 비밀번호를 다시 확인하세요");
        console.log("re:", error.message);
        console.log("re:", error.body);
        console.log("re:", error.config);
        console.log("re:", error.requests);
        gotoin()
        
      });



    // 임시 로그인
    // if(id == "root" & password == "1111"& specialKey == "1234"){
    //   alert("회원가입 완료")
    // }else{
    //   alert("아이디와 비밀번호를 확인하세요")
    // }


  }
  const [signUpInfo, setSignUpInfo] = useState({
    id: "",
    password: "",
    specialKey:"",
    userName : "",
    userPhone:""
  });
   
  const {id, password,specialKey,userName,userPhone} = signUpInfo; // 전역 id/pw 선언
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSignUpSubmit}
        >
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign Up
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              
              <Input type="text" label="Id" name = "id" size="lg" onChange = {onChangeSignUp}/>
              <Input type="password" label="Password" name = "password" size="lg" onChange = {onChangeSignUp}/>
              <Input label="discription" size="lg" name = "specialKey" onChange = {onChangeSignUp} />
              <Input label="userName" size="lg" name = "userName" onChange = {onChangeSignUp} />
              <Input label="userPhone" size="lg" name = "userPhone" onChange = {onChangeSignUp} />

            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient"  type = "submit" fullWidth >
                Sign Up
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Link to="/auth/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign in
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}

export default SignUp;
