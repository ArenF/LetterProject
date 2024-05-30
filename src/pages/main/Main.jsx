import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

// const DescriptionCard = ({title, desc, buttonShow, callback}) => {
//   return (
//     <div className="grid place-items-center">
//       <p>{title}</p>
//       <p>{desc}</p>
//       <button onClick={() => { callback(); }}>{buttonShow}</button>
//     </div>
//   );
// };

const Main = () => {
  const navigate = useNavigate();
  const [to, setTo] = useState('');

  // to 가 바뀔 때마다 실행되며 해당 위치로 이동하게 할 것!
  useEffect(() => {
    if (to !== '') {
      navigate(to);
    }
  }, [to]);

  return (
    <Box
      w={"100%"}
      h={"100%"}
      bgColor={"#FEFFD2"}
    >
      <NavBar />

    </Box>
  );
};

export default Main;