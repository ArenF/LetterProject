import { Box, Input } from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

type DropzoneArgument = {
    children:ReactNode | null,
    onDrop:(file:File) => void,
};

const Dropzone = ({children, onDrop}:DropzoneArgument):JSX.Element => {
    const inputRef = useRef(null);

    const handleDragEnter = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragOver = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    };

    const handleDrop = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];

        if (file === undefined || file === null)
            return;
        console.log(file);
        onDrop(file);
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const data = event.target.files[0];
        onDrop(data);
    }

    return (
        <Box
            className="drag-drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onClick={() => {
                inputRef.current.click();
            }}
        >
            {children}
            <Input 
                onChange={handleChange}
                type="file"
                hidden={true}
                ref={inputRef}
            />
        </Box>
    )
};

export default Dropzone;