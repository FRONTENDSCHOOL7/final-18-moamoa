import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset};
:root{
    
}
html{ 
	font-size: 62.5%;
}
body{
	background-color:#fff9e4;
	/* 여기에 color 주는건 별로일까요? */
	font-family: 'Pretendard', sans-serif;
}
a{
	text-decoration:none;
	color:inherit;
}
input,button{
	border:none;
	background-color:inherit;
}
button{
	cursor:pointer;
}
li{
	list-style: none;
}
p{
	color: #000;
}
Link{
	color: inherit;
	&:visited{
		color: inherit;
	}
}
button{
	padding: 0;
	border: none;
	background: transparent;
}

`;
export default GlobalStyle;
