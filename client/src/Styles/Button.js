import styled from "styled-components";

export const Button=styled.button`
    width: 100%;
        padding: 12px;
        border: none;
        border-radius: 5px;
        background-color: ${({theme})=>theme.colors.login_btn_background};
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover{
            background-color:${({theme})=>theme.colors.login_btnHover_background};
        }

`