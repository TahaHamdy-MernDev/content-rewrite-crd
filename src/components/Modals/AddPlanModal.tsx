import React, { useState, useEffect } from "react";
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
  Select,
  useToast,
} from "@chakra-ui/react";
import Api from "../../Api";
import "./AddPlanModal.css";

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlanModal: React.FC<AddPlanModalProps> = ({ isOpen, onClose }) => {
  const [credits, setCredits] = useState<string>("");
  const [type, setType] = useState<string>("free");
  const [months, setMonths] = useState<number>(1);
  const toast = useToast();

  useEffect(() => {
    switch (type) {
      case "free":
        setCredits("1000");
        setMonths(1);
        break;
      case "silver":
        setCredits("100000");
        setMonths(1);
        break;
      case "gold":
        setCredits("1000000");
        setMonths(12);
        break;
      default:
        setCredits("");
        setMonths(1);
    }
  }, [type]);

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
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="free">Free</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Credits</FormLabel>
            <InputGroup>
              <Input
                type="text"
                value={credits}
                readOnly
                placeholder="Credits will be set based on type"
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
              readOnly
              placeholder="Duration will be set based on type"
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
