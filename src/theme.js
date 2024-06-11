import { extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)",
};

const config = {
    initialcolorMode: 'light',
    useSystemColorMode: false,
    colors: {
        primary: '#FEFFD2',
        primaryContainer: '#FFEEA9',
        secondary: '#FFBF78',
        secondaryContainer: '#FF7D29'
    }
};

const theme = extendTheme({ config });

export default theme;