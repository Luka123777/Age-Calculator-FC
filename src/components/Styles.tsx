export const textFieldStyles = {
  width:{
    xs: "90px",
    sm: "145px",
    md: "160px"
  },
  '& .MuiOutlinedInput-root': {
    '& input': {
      fontSize: '25px', // Tamaño del texto que se escribe
      fontWeight: '800', // Grosor del texto
      fontFamily: 'Poppins, sans-serif',
    },
    '& input::placeholder': {
      fontSize: '20px',
      fontWeight: "700",
      fontFamily: 'Poppins, sans-serif',
    },
    '&:hover fieldset': {
      borderColor: 'hsl(259, 100%, 65%)', // Hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'hsl(259, 100%, 65%)', // Focus (al hacer click o usar tab)
    },
  },
};

export const h2Styles = {
   fontSize:{
    xs: "55px",
    sm: "80px",
    md: "85px"
  },
  
}
