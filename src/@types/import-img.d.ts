//
/**
 *  
 typescript 코드의 타입 추론을 돕는 파일이다.
 typescript는 전역 변수로 선언한 변수를 특정 파일에서 import 구문 없이 사용하는 경우 해당 변수를 인식하지 못해 에러가 난다.
 이는 해당 변수를 선언해서 해결할 수 있다.
 *
 */


declare module "*.jpg" {
    const content: string;
    export default content;
}