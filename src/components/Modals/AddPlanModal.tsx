import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import Api from "../../Api";
import './AddPlanModal.css';

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlanModal: React.FC<AddPlanModalProps> = ({
  isOpen,
  onClose
}) => {
  const [credits, setCredits] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [months, setMonths] = useState<number>(1);
  const toast = useToast();

  const handleAddPlan = async () => {
    try {
      const newPlan = {
        Credits: parseInt(credits, 10),
        Type: type,
        Months: months,
      };

      await Api.post("/plan", newPlan);

      toast({
        status: "success",
        title: "Plan Added",
        description: "You have successfully added a new plan.",
      });

      onClose();
    } catch (err: any) {
      toast({
        status: "error",
        title: "Error",
        description: err.message,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Plan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Type</FormLabel>
            <Input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Enter plan type"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Credits</FormLabel>
            <InputGroup>
              <Input
                type="number"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                placeholder="Enter credits"
              />
              <InputRightElement pointerEvents="none">
                <span className="credit-suffix">words</span>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Months</FormLabel>
            <Input
              type="number"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value, 10))}
              placeholder="Enter duration in months"
              min={1}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddPlan}>
            Add Plan
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPlanModal;
