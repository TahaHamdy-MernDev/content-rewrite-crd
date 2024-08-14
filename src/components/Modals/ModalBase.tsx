import React, { ReactNode } from 'react';
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

type ModalProps = {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title }) => {
    return (
        <ChakraModal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay className="backdrop-blur-sm" />
            <ModalContent className="bg-white p-4 rounded-lg">
                {title && <ModalHeader>{title}</ModalHeader>}
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </ChakraModal>
    );
};

export default Modal;
