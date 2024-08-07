export interface Plan {
	_id: string;
	Credits: number;
	Users: string[];
	Type: "free" | "gold" | "silver";
	Months: number;
	createdAt: string;
	updatedAt: string;
  }
  