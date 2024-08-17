import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import Api from "../../Api";
import { customStyles } from "../../pages/Users";

interface Plan {
  _id: string;
  Credits: number;
  Type: string;
  Months: number;
}

interface UpdatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onUpdate: () => void;
}

export default function UpdatePlanModal({
  isOpen,
  onClose,
  userId,
  onUpdate,
}: UpdatePlanModalProps) {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await Api.get("/plan");
      setPlans(res.data.data);
    };

    if (isOpen) {
      console.log("Plans", plans);

      fetchPlans();
    }
  }, [isOpen]);

  const handleChoosePlan = async (planId: string) => {
    await Api.put("/user/plan", { PlanId: planId, UserId: userId });
    onUpdate();
    onClose();
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Plan) => row._id,
      sortable: true,
    },
    {
      name: "Credits",
      selector: (row: Plan) => row.Credits,
      sortable: true,
    },
    {
      name: "Months",
      selector: (row: Plan) => row.Months,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: Plan) => row.Type,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Plan) => (
        <Button colorScheme="blue" onClick={() => handleChoosePlan(row._id)}>
          Choose
        </Button>
      ),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent width={"auto"} maxWidth={"80%"}>
        <ModalHeader>Choose a Plan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <DataTable
            columns={columns}
            data={plans}
            pagination
            paginationServer
            customStyles={{
              ...customStyles,
              table: {
                style: {
                  width: "100%",
                },
              },
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
