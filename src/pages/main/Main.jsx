import React from "react";
import { Box, Text, VStack, HStack, Heading, Button, UnorderedList, ListItem, Image, SimpleGrid, ListProps } from "@chakra-ui/react";
import { AttachmentIcon, CalendarIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const IconTextBox = ({Icon, subtitle, context}) => (
  <VStack
    padding="10px"
    position="relative"
    w="30rem"
    h="auto"
    spacing={5}
    align="stretch"
  >
    {Icon}
    <Text
      textAlign="left"
      position="relative"
      fontSize="large"
    >
      {subtitle}  
    </Text>
    <Text
      textAlign="left"
      position='relative'
      w="100%"
    >
      {context}
    </Text>
  </VStack>
);

const DividedBox = ({leftContent, rightContent}) => {
  return (
    <HStack
      position="relative"
      w="100%"
      h="auto"
      marginTop="10em"
    >
      <Box
        left="0"
        position="relative"
        w="50%"
        display='flex'
        justifyContent="right"
        alignItems="flex-end"
      >
        {leftContent}
      </Box>
      <Box
          right="0"
          position="relative"
          w="50%"
          display='flex'
          justifyContent="left"
          alignItems="flex-start"
        >
          {rightContent}
        </Box>      
    </HStack>
  );
};

const DescriptionTextFormats = ({title, description, list, Button}) => {
  return (
    <VStack
      spacing="1rem"
      display="flex"
      justifyContent="left"
      alignItems="flex-start"
      w="100vw"
      paddingX="10rem"
    >
      <Heading textAlign="left" size="xl">{title}</Heading>
      <Text
        textAlign="left"
        fontSize="xl"
        color="gray"
      >
        {description}
      </Text>
      <UnorderedList
        spacing="8px"
      >
        {
          list.map((elm, index) => (
            <ListItem
              key={index}
              color="gray"
            >
              {elm}
            </ListItem>
          ))
        }
      </UnorderedList>
      {Button}
    </VStack>
  );
};

const Main = () => {
  const navigate = useNavigate();

  return (
    <Box
      w={"100vw"}
      h={"100vh"}
    >
      <VStack
        position="relative"
        w="100vw" h="auto"
        justifyContent="center"
        alignItems="center"
        spacing="2em"
      >
        <Heading 
          marginTop="4em"
          size="3xl"
          fontWeight="bold"
          letterSpacing="-4px"
        >
          레터 라이크 사이트
        </Heading>
        <Text
          color="gray"
          w="17em"
          textAlign="center"
          fontSize="18px"
        >
          우리 안에 있는 사랑은 표현을 원한다.
          편지는 우정의 지속적인 표현이다.
        </Text>
        <Button
          onClick={() => {
            navigate('/login');
          }}
        >
          바로가기
        </Button>

      </VStack>

      <DividedBox 
        leftContent={
          <DescriptionTextFormats
            title="편지 꾸미기"
            description="이쁜 편지지와 폰트를 고르고 귀여운 스티커로 당신의 마음을 표현하세요!"
            list={[
              "드래그 앤 드롭으로 붙이는 스티커!",
              "직접 선택하는 편지지 색상!",
              "온라인으로 볼 수 있는 모든 폰트들을 사용!"
            ]}
            Button={<Button onClick={() => navigate('/send')}>편지 보내러 가기</Button>}
          />
        }
        rightContent={
          <Image 
            borderRadius="15px"
            src="/images/writing-letter-image.jpeg"
          />
        }
      />
      <DividedBox 
        rightContent={
          <DescriptionTextFormats
            title="내가 정하는 편지 도착 시간"
            description="기다리는 시간만큼 애틋함이 커지듯 서로가 원하는 시간과 날짜에 편지를 도착하게 해보세요!"
            list={[
              "최소 30분, 최대 24시간",
              "원하는 날짜를 선택해 원하는 날과 시간에 도착하게 해보세요!"
            ]}
            Button={<Button onClick={() => navigate('/send')} >편지 보내러 가기</Button>}
          />
        }
        leftContent={
          <Image
            borderRadius="15px"
            src="/images/writing-letter-image.jpeg"
          />
        }
      />
      <HStack
        padding="5em"
        w="auto"
        spacing="10em"
        justifyContent="center"
        alignItems="center"
      >
        <VStack spacing={10} >
          <IconTextBox 
            Icon={
              <EmailIcon/>
            }
            subtitle="이메일로도 간단히 볼 수 있게!"
            context={"가입하지 않은 상대면 이메일로 간단히 보낼 수 있어요!"}
          />
          <IconTextBox 
            Icon={<PhoneIcon/>}
            subtitle="친구 추가"
            context={"친구 추가 기능을 통해 친구를 추가해보세요! 서로서로 교환하는 편지는 친구창을 통해 볼 수 있습니다!"}
          />
        </VStack>
        <VStack spacing={10} >
          <IconTextBox 
            Icon={<CalendarIcon/>}
            subtitle="예약형 메세지"
            context={"편지가 도착할 때까지의 기다림의 시간을 만끽하세요."}
          />
          <IconTextBox 
            Icon={<AttachmentIcon/>}
            subtitle="템플릿"
            context={"다양하고 이쁜 템플릿을 사용해보세요!"}
          />
        </VStack>
      </HStack>
    </Box>
  );
};

export default Main;