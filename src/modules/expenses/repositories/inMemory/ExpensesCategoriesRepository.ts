import { ExpenseCategory } from "../../infra/typeorm/entities/ExpenseCategory";
import { IExpensesCategoriesRepository } from "../IExpensesCategoriesRepository";

class InMemoryExpensesCategoriesRepository
  implements IExpensesCategoriesRepository
{
  categories: ExpenseCategory[] = [
    {
      id: "c274df6b-e21a-4480-9a8d-b0e389db854d",
      description: "Anything you pay toward keeping a roof over your head.",
      title: "Housing",
    },
    {
      id: "45148b26-79c9-459b-a0f1-e33d3843c84a",
      description: "Anything you pay toward getting from point A to B.",
      title: "Transportation",
    },
    {
      id: "79a72bea-f781-4879-8903-01f9e86719cb",
      description:
        "Anything essential you pay toward keeping yourself (and maybe others) well fed.",
      title: "Food",
    },
    {
      id: "3b51606f-a347-4a5e-ac71-d0c024990fee",
      description:
        "Any service you pay toward having things like water, electricity, heating, ventilation, internet, etc.",
      title: "Utilities",
    },
    {
      id: "719cee9d-5be7-472d-b385-be4c169b0477",
      description: "Anything you pay toward keeping things insured.",
      title: "Insurance",
    },
    {
      id: "c0d73178-653b-41ea-ae10-26a8c98f1889",
      description:
        "Anything you pay toward maintaining your (and maybe others) health and well-being, but excluding food related expenses.",
      title: "Medical & Healthcare",
    },
    {
      id: "6913dfd4-a569-4941-937e-59b78e42b2c9",
      description:
        "Any money you save, invest or use to pay high-interest debts.",
      title: "Saving, Investing, & Debt Payments",
    },
    {
      id: "05a004ad-3051-4d80-9988-87fbff0e75bd",
      description:
        "Anything you pay that could be considered a personal care or “lifestyle” expense.",
      title: "Personal Spending",
    },
    {
      id: "2ef24c21-e82d-4fcb-bcf0-07cb5db290a6",
      description: "Anything you pay toward having fun.",
      title: "Recreation & Entertainment",
    },
    {
      id: "a93e45d5-5525-4470-b221-f2e01f8ddea0",
      description:
        "Anything you pay that isn’t already covered in the basic budget categories.",
      title: "Miscellaneous",
    },
  ];

  async findById(id: string): Promise<ExpenseCategory> {
    const category = this.categories.find((c) => c.id === id);

    return category;
  }
  async getAll(): Promise<ExpenseCategory[]> {
    return this.categories;
  }
}

export { InMemoryExpensesCategoriesRepository };
