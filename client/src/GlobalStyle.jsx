import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
body{
    background-color:#e2e5e9;
}

a{
    text-decoration:none;
    color:black
}

.active-link{
    background:${({theme})=>theme.colors.login_btn_background};
    padding:7px 10px;
    border-radius:5px;
}

img{
    height:100px;
    width:100px;
}
input{
    background:none;
}

 




`